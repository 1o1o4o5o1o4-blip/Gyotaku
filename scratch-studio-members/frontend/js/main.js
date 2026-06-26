// Main page script

document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('registerBtn');
  const studioInput = document.getElementById('studioInput');
  const studioName = document.getElementById('studioName');

  if (registerBtn) {
    registerBtn.addEventListener('click', handleRegister);
    studioInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleRegister();
    });
  }

  loadStudios();
});

async function handleRegister() {
  const studioIdInput = document.getElementById('studioInput');
  const studioNameInput = document.getElementById('studioName');
  const studioId = studioIdInput.value.trim();
  const name = studioNameInput.value.trim() || null;

  if (!studioId) {
    alert('スタジオIDを入力してください');
    return;
  }

  const registerBtn = document.getElementById('registerBtn');
  registerBtn.disabled = true;
  registerBtn.textContent = '登録中...';

  try {
    await registerStudio(studioId, name);
    studioIdInput.value = '';
    studioNameInput.value = '';
    alert('スタジオを登録しました！');
    loadStudios();
  } catch (error) {
    if (error.message.includes('409')) {
      alert('このスタジオは既に登録されています');
    } else {
      alert(`登録に失敗しました: ${error.message}`);
    }
  } finally {
    registerBtn.disabled = false;
    registerBtn.textContent = '🔗 登録';
  }
}

async function loadStudios() {
  const studiosList = document.getElementById('studiosList');
  if (!studiosList) return;

  try {
    const studios = await getStudios();

    if (studios.length === 0) {
      studiosList.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
          <p style="font-size: 1.1rem; margin-bottom: 12px;">📭 まだスタジオが登録されていません</p>
          <p style="font-size: 0.9rem;">上記のフォームからスタジオを登録してください</p>
        </div>
      `;
      return;
    }

    studiosList.innerHTML = studios.map(studio => `
      <div class="studio-card">
        <h3>${studio.name || `スタジオ ${studio.studio_id}`}</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">ID: ${studio.studio_id}</p>
        <p style="font-size: 0.85rem;">登録日: ${new Date(studio.created_at).toLocaleDateString('ja-JP')}</p>
        <div class="studio-card-stats">
          <div class="stat">
            <span class="stat-number">-</span>
            <span class="stat-label">更新中...</span>
          </div>
        </div>
        <div class="studio-actions">
          <button onclick="viewMembers('${studio.studio_id}')" title="メンバーを表示">👥 表示</button>
          <button onclick="deleteStudioHandler('${studio.studio_id}')" class="btn-danger" title="削除">🗑️</button>
        </div>
      </div>
    `).join('');

    // Load member counts for each studio
    studios.forEach(studio => loadMemberCount(studio.studio_id));
  } catch (error) {
    console.error('Error loading studios:', error);
    studiosList.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 20px; background: #fff5f5; border-radius: 8px; color: var(--danger-color);">
        <p>❌ スタジオ一覧の読み込みに失敗しました</p>
      </div>
    `;
  }
}

async function loadMemberCount(studioId) {
  try {
    const data = await getMembers(studioId);
    const card = document.querySelector(`[data-studio-id="${studioId}"]`);
    if (card) {
      const stats = card.querySelector('.studio-card-stats');
      stats.innerHTML = `
        <div class="stat">
          <span class="stat-number">${data.total}</span>
          <span class="stat-label">合計</span>
        </div>
        <div class="stat">
          <span class="stat-number">${data.managers}</span>
          <span class="stat-label">マネージャー</span>
        </div>
        <div class="stat">
          <span class="stat-number">${data.curators}</span>
          <span class="stat-label">キュレーター</span>
        </div>
      `;
    }
  } catch (error) {
    console.warn(`Could not load member count for studio ${studioId}:`, error);
  }
}

function viewMembers(studioId) {
  window.location.href = `/members?studio=${studioId}`;
}

async function deleteStudioHandler(studioId) {
  if (!confirm('このスタジオを削除してもよろしいですか？')) {
    return;
  }

  try {
    await deleteStudio(studioId);
    alert('スタジオを削除しました');
    loadStudios();
  } catch (error) {
    alert(`削除に失敗しました: ${error.message}`);
  }
}
