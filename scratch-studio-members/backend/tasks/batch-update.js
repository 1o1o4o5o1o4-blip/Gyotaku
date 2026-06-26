const cron = require('node-cron');
const fetch = require('node-fetch');
const db = require('../db');

const SCRATCH_API_BASE = process.env.SCRATCH_API_BASE || 'https://api.scratch.mit.edu';
const BATCH_CRON = process.env.BATCH_CRON || '0 0 * * *'; // 毎日0時
const REQUEST_DELAY = 500; // API呼び出し間隔 (ms)

let isRunning = false;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchMembers = async (studioId, role) => {
  const members = [];
  let offset = 0;
  const limit = 40;

  try {
    while (true) {
      const url = `${SCRATCH_API_BASE}/studios/${studioId}/${role}?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        break;
      }

      members.push(...data);

      if (data.length < limit) {
        break;
      }

      offset += limit;
      await delay(REQUEST_DELAY);
    }
  } catch (error) {
    console.error(`Error fetching ${role} for studio ${studioId}:`, error);
    throw error;
  }

  return members;
};

const updateStudioMembers = async (studioId) => {
  try {
    console.log(`Updating members for studio: ${studioId}`);

    // Fetch managers and curators
    const [managers, curators] = await Promise.all([
      fetchMembers(studioId, 'managers'),
      fetchMembers(studioId, 'curators'),
    ]);

    // Clear existing members
    db.clearMembers(studioId);

    // Add new members
    if (managers.length > 0) {
      db.addMembers(studioId, managers, 'manager');
    }
    if (curators.length > 0) {
      db.addMembers(studioId, curators, 'curator');
    }

    db.addFetchLog(studioId, 'success');
    console.log(`✓ Updated studio ${studioId}: ${managers.length} managers, ${curators.length} curators`);

    return { success: true, managers: managers.length, curators: curators.length };
  } catch (error) {
    console.error(`✗ Failed to update studio ${studioId}:`, error.message);
    db.addFetchLog(studioId, 'error', error.message);
    return { success: false, error: error.message };
  }
};

const batchUpdate = async () => {
  if (isRunning) {
    console.log('Batch update already running, skipping...');
    return;
  }

  isRunning = true;
  console.log(`[${new Date().toISOString()}] Starting batch update...`);

  try {
    const studios = db.getAllStudios();
    console.log(`Found ${studios.length} studios to update`);

    for (const studio of studios) {
      await updateStudioMembers(studio.studio_id);
      await delay(REQUEST_DELAY);
    }

    console.log(`[${new Date().toISOString()}] Batch update completed`);
  } catch (error) {
    console.error('Batch update error:', error);
  } finally {
    isRunning = false;
  }
};

const start = () => {
  console.log(`Batch update scheduler started with cron: ${BATCH_CRON}`);
  cron.schedule(BATCH_CRON, batchUpdate);

  // Run immediately on startup (optional)
  // batchUpdate();
};

module.exports = {
  start,
  batchUpdate,
  updateStudioMembers,
};
