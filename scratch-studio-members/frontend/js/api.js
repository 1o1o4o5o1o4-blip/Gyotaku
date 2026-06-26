// API Helper Functions

const API_BASE_URL = window.location.origin;

function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
}

// Studios API
function getStudios() {
  return fetchAPI('/api/studios');
}

function registerStudio(studioId, name) {
  return fetchAPI('/api/studios', {
    method: 'POST',
    body: JSON.stringify({ studioId, name }),
  });
}

function deleteStudio(studioId) {
  return fetchAPI(`/api/studios/${studioId}`, {
    method: 'DELETE',
  });
}

// Members API
function getMembers(studioId) {
  return fetchAPI(`/api/members/${studioId}`);
}

// Share API
function getShareLink(studioId) {
  return fetchAPI(`/api/share/${studioId}`);
}
