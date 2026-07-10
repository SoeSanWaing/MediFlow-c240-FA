const DATA_URL = 'https://n8ngc.codeblazar.org/webhook/get-queue-data';
const STATUS_UPDATE_URL = 'https://n8ngc.codeblazar.org/webhook/update-status';
const REFRESH_INTERVAL_MS = 45000;

let patientRecords = [];
let removedPatientIds = new Set();
let refreshTimer = null;

const pageTitle = document.getElementById('page-title');
const gridContainer = document.getElementById('dashboard-grid');
const toast = document.getElementById('toast');
const refreshStatus = document.getElementById('refresh-status');
const refreshButton = document.getElementById('refresh-button');
const searchInput = document.getElementById('search-input');
const dateFilter = document.getElementById('date-filter');
let searchQuery = '';
let filterDate = new Date().toISOString().slice(0, 10); // default to today

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatWaitTime(arrivalTime) {
  const arrival = new Date(arrivalTime);
  const diffMinutes = Math.max(0, Math.floor((Date.now() - arrival.getTime()) / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} min`;
  }
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function getSeverityClass(severity) {
  const normalized = String(severity || '').toLowerCase();
  if (normalized === 'critical' || normalized === 'high') return 'high';
  if (normalized === 'urgent' || normalized === 'medium') return 'medium';
  if (normalized === 'standard' || normalized === 'low') return 'low';
  return 'low';
}

function normalizeSeverity(severity) {
  const normalized = String(severity || '').toLowerCase();
  if (normalized === 'critical' || normalized === 'high') return 'high';
  if (normalized === 'urgent' || normalized === 'medium') return 'medium';
  if (normalized === 'standard' || normalized === 'low') return 'low';
  return 'low';
}

function formatStatus(status) {
  return String(status || 'Waiting').replace(/-/g, ' ');
}

function normalizePatientRecords(payload) {
  let rawRecords = [];

  // n8n "First Incoming Item" may wrap data in { json: { ... } }
  if (payload && typeof payload === 'object' && !Array.isArray(payload) && payload.json && typeof payload.json === 'object') {
    payload = payload.json;
  }

  // If payload is an array with one element that is a grouped object, unwrap it
  if (Array.isArray(payload) && payload.length === 1 && payload[0] && typeof payload[0] === 'object' && !Array.isArray(payload[0])) {
    const inner = payload[0].json ? payload[0].json : payload[0];
    const innerValues = Object.values(inner);
    if (innerValues.length > 0 && innerValues.every((v) => Array.isArray(v))) {
      payload = inner;
    }
  }

  if (Array.isArray(payload)) {
    // n8n may return [{ json: {...} }, { json: {...} }] format
    rawRecords = payload.map((item) => {
      if (item && typeof item === 'object' && item.json && typeof item.json === 'object') {
        return item.json;
      }
      return item;
    });
  } else if (payload && typeof payload === 'object') {
    // Check if it's a grouped object: { "categoryName": [ ...patients ], ... }
    const values = Object.values(payload);
    const isGroupedByCategory = values.length > 0 && values.every((v) => Array.isArray(v));

    if (isGroupedByCategory) {
      // Flatten all grouped arrays into a single list
      Object.entries(payload).forEach(([categoryKey, patients]) => {
        patients.forEach((p) => {
          if (p && typeof p === 'object') {
            if (!p.category || p.category === '') {
              p.category = categoryKey;
            }
          }
          rawRecords.push(p);
        });
      });
    } else if (Array.isArray(payload.records)) rawRecords = payload.records;
    else if (Array.isArray(payload.patients)) rawRecords = payload.patients;
    else if (Array.isArray(payload.data)) rawRecords = payload.data;
    else if (Array.isArray(payload.queue)) rawRecords = payload.queue;
    else if (Array.isArray(payload.items)) rawRecords = payload.items;
    else if (Array.isArray(payload.result)) rawRecords = payload.result;
    else if (Array.isArray(payload.rows)) rawRecords = payload.rows;
    else if (payload.patient) rawRecords = [payload.patient];
    else {
      rawRecords = [payload];
    }
  }

  console.log('Parsed records count:', rawRecords.length);
  if (rawRecords.length > 0) {
    console.log('First parsed patient:', rawRecords[0].patient_name || rawRecords[0].name || 'unknown');
  }

  return rawRecords.map((record) => {
    const patient = record && typeof record === 'object' ? record : {};
    const arrivalTime = patient.timestamp || patient.arrivalTime || patient.arrived_at || '';
    const waitMinutesValue = patient.estimated_wait_time_mins ?? patient.waitTimeMins ?? patient.wait_time_mins ?? patient.estimatedWaitTimeMins;

    return {
      id: String(patient.patient_id ?? patient.id ?? patient.patientId ?? patient.row_number ?? ''),
      name: patient.patient_name || patient.name || patient.patientName || 'Unnamed patient',
      complaint: patient.symptoms || patient.complaint || patient.reason || '',
      category: patient.category || patient.symptoms || patient.complaint || 'Uncategorized',
      severity: normalizeSeverity(patient.severity),
      status: formatStatus(patient.status),
      assignedDoctor: patient.doctor_assigned || patient.assigned_doctor || patient.assignedDoctor || 'Unassigned',
      arrivalTime,
      sheetRowId: patient.row_number || patient.sheetRowId || patient.rowNumber || '',
      waitTimeMinutes: waitMinutesValue !== undefined && waitMinutesValue !== null && waitMinutesValue !== '' ? Number(waitMinutesValue) : null,
      aiReason: patient.ai_reason || patient.aiReason || '',
      estimatedConsultMins: patient.estimated_consult_time_mins ?? null,
      assignedDateTime: patient.assigned_date_time || '',
      dischargeSummary: patient.discharge_summary || '',
    };
  });
}

function formatWaitDisplay(patient) {
  if (patient.waitTimeMinutes !== null && patient.waitTimeMinutes !== undefined && patient.waitTimeMinutes !== '') {
    // Only countdown for Waiting patients
    const status = String(patient.status || '').toLowerCase();
    if (status === 'in progress' || status === 'in-progress') {
      return 'In consultation';
    }
    if (status === 'emergency') {
      return 'Emergency - awaiting ambulance';
    }
    const assignedTime = patient.assignedDateTime || patient.arrivalTime;
    if (assignedTime) {
      const assigned = new Date(assignedTime);
      const elapsedMins = Math.floor((Date.now() - assigned.getTime()) / 60000);
      const remaining = Math.max(0, patient.waitTimeMinutes - elapsedMins);
      return remaining === 0 ? 'Due now' : `${remaining} min wait`;
    }
    return `${patient.waitTimeMinutes} min wait`;
  }
  return formatWaitTime(patient.arrivalTime) + ' wait';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  window.clearTimeout(toast.hideTimeout);
  toast.hideTimeout = window.setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

// Helper: send status update to backend webhook (POST)
async function postUpdateStatus(patientId, newStatus, sheetRowId) {
  if (!STATUS_UPDATE_URL) {
    console.debug('STATUS_UPDATE_URL not configured, skipping backend call');
    return null;
  }
  try {
    const payload = { patient_id: patientId, status: newStatus };
    console.log('Sending status update:', JSON.stringify(payload));
    const res = await fetch(STATUS_UPDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server response:', errorText);
      throw new Error(`HTTP ${res.status}`);
    }
    const text = await res.text();
    return text ? JSON.parse(text) : { success: true };
  } catch (err) {
    console.error('postUpdateStatus error', err);
    throw err;
  }
}

function buildPatientLink(patient) {
  const link = document.createElement('a');
  link.href = `details.html?id=${encodeURIComponent(patient.id)}`;
  link.textContent = patient.name;
  link.className = 'patient-link';
  link.addEventListener('click', () => {
    // Store patient data so details page can display it without re-fetching
    localStorage.setItem('patientRecords', JSON.stringify(patientRecords));
  });
  return link;
}

function groupByCategory(records) {
  return records.reduce((groups, record) => {
    const key = record.category || record.complaint || 'Uncategorized';
    if (!groups[key]) groups[key] = [];
    groups[key].push(record);
    return groups;
  }, {});
}

function renderDashboard(records) {
  gridContainer.innerHTML = '';
  const filteredRecords = records.filter((record) => {
    if (removedPatientIds.has(record.id)) return false;
    // Filter by selected date
    const recordDate = record.arrivalTime || record.assignedDateTime || '';
    if (recordDate) {
      const dateStr = recordDate.slice(0, 10);
      if (dateStr !== filterDate) return false;
    }
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = record.name.toLowerCase().includes(q);
      const matchesId = record.id.toLowerCase().includes(q);
      if (!matchesName && !matchesId) return false;
    }
    return true;
  });
    const groups = groupByCategory(filteredRecords);
    const categoryNames = Object.keys(groups).sort();

    if (categoryNames.length === 0) {
    gridContainer.innerHTML = '<p class="empty-state">No patients found yet.</p>';
    return;
  }

    categoryNames.forEach((category) => {
    const card = document.createElement('article');
    card.className = 'category-card';

    const heading = document.createElement('h2');
    heading.className = 'category-card__title';
      heading.textContent = category;
    card.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'patient-list';

      // Sort patients: In Progress first, then by remaining wait time ascending
      groups[category].sort((a, b) => {
        const statusOrder = (p) => {
          const s = String(p.status || '').toLowerCase();
          if (s === 'emergency') return 0;
          if (s === 'in progress' || s === 'in-progress') return 1;
          return 2;
        };
        const orderA = statusOrder(a);
        const orderB = statusOrder(b);
        if (orderA !== orderB) return orderA - orderB;

        const getRemaining = (p) => {
          const wait = p.waitTimeMinutes || 0;
          const assignedTime = p.assignedDateTime || p.arrivalTime;
          if (assignedTime) {
            const elapsed = Math.floor((Date.now() - new Date(assignedTime).getTime()) / 60000);
            return Math.max(0, wait - elapsed);
          }
          return wait;
        };
        return getRemaining(a) - getRemaining(b);
      });

      groups[category].forEach((patient) => {
      const item = document.createElement('li');
      item.className = 'patient-card';

      const main = document.createElement('div');
      main.className = 'patient-card__main';
      main.appendChild(buildPatientLink(patient));

      const meta = document.createElement('div');
      meta.className = 'patient-card__meta';
      meta.innerHTML = `
        <span class="badge ${getSeverityClass(patient.severity)}">${patient.severity}</span>
        <span class="status-pill">${patient.status}</span>
        <span>${formatWaitDisplay(patient)}</span>
        <span>${patient.assignedDoctor || 'Unassigned'}</span>
      `;
      main.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'patient-actions';

      const progressButton = document.createElement('button');
      progressButton.className = 'secondary-button';
      progressButton.textContent = 'In Progress';
      progressButton.onclick = () => updatePatientStatus(patient.id, 'In Progress');

      const doneButton = document.createElement('button');
      doneButton.className = 'primary-button';
      doneButton.textContent = 'Done';
      doneButton.onclick = () => removePatient(patient.id);

      const emergencyButton = document.createElement('button');
      emergencyButton.className = 'override-button';
      emergencyButton.textContent = 'Emergency';
      emergencyButton.onclick = () => markEmergency(patient.id);

      actions.appendChild(emergencyButton);
      actions.appendChild(progressButton);
      actions.appendChild(doneButton);

      item.appendChild(main);
      item.appendChild(actions);
      list.appendChild(item);
    });

    card.appendChild(list);
    gridContainer.appendChild(card);
  });
}

async function updatePatientStatus(patientId, newStatus) {
  const patient = patientRecords.find((p) => p.id === patientId);
  if (!patient) return;

  // optimistic update
  patientRecords = patientRecords.map((p) => (p.id === patientId ? { ...p, status: newStatus } : p));
  renderDashboard(patientRecords);

  if (STATUS_UPDATE_URL) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const payload = { patient_id: patientId, status: newStatus };
      console.log('Sending status update:', JSON.stringify(payload));
      const res = await fetch(STATUS_UPDATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server response:', errorText);
        showToast(`✗ Backend error: HTTP ${res.status}`);
        console.log('TOAST SHOWN: backend error');
      } else {
        showToast(`✓ Status updated to "${newStatus}" successfully.`);
        console.log('TOAST SHOWN: success');
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        showToast(`✗ Backend timed out after 10s`);
        console.log('TOAST SHOWN: timeout');
      } else {
        showToast(`✗ Failed to update backend: ${err.message}`);
        console.log('TOAST SHOWN: error', err.message);
      }
      console.error('Status update failed', err);
    }
  } else {
    showToast(`Status set to "${newStatus}" (backend not configured)`);
    console.log('TOAST SHOWN: no backend');
  }
}

async function removePatient(patientId) {
  const patient = patientRecords.find((p) => p.id === patientId);
  if (!patient) return;

  // optimistic removal
  removedPatientIds.add(patientId);
  renderDashboard(patientRecords);

  if (STATUS_UPDATE_URL) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const payload = { patient_id: patientId, status: 'Completed' };
      const res = await fetch(STATUS_UPDATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        showToast(`✗ Backend error: HTTP ${res.status}`);
      } else {
        showToast(`✓ Patient marked as completed successfully.`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        showToast(`✗ Backend timed out after 10s`);
      } else {
        showToast(`✗ Failed to update backend: ${err.message}`);
      }
      console.error('Failed to notify backend of Done status', err);
    }
  } else {
    showToast('Patient removed from dashboard (backend not configured)');
  }
}

async function markEmergency(patientId) {
  const patient = patientRecords.find((p) => p.id === patientId);
  if (!patient) return;

  if (!confirm(`Mark ${patient.name} as EMERGENCY? This will alert for ambulance dispatch.`)) return;

  // optimistic update
  patientRecords = patientRecords.map((p) => (p.id === patientId ? { ...p, status: 'Emergency', waitTimeMinutes: 0 } : p));
  renderDashboard(patientRecords);

  if (STATUS_UPDATE_URL) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const payload = { patient_id: patientId, status: 'Emergency', alert_sent: true, estimated_wait_time_mins: 0, estimated_consult_time_mins: 0 };
      console.log('Sending emergency:', JSON.stringify(payload));
      const res = await fetch(STATUS_UPDATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        showToast(`✗ Backend error: HTTP ${res.status}`);
      } else {
        showToast(`✓ Emergency alert sent for ${patient.name}.`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        showToast(`✗ Backend timed out after 10s`);
      } else {
        showToast(`✗ Failed to send emergency alert: ${err.message}`);
      }
      console.error('Emergency update failed', err);
    }
  } else {
    showToast(`Emergency status set (backend not configured)`);
  }
}

async function fetchPatientData() {
  refreshStatus.textContent = 'Refreshing…';

  if (!DATA_URL) {
    refreshStatus.textContent = 'No data endpoint configured';
    patientRecords = [];
    renderDashboard(patientRecords);
    return;
  }

  try {
    const response = await fetch(DATA_URL, { method: 'GET', cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    patientRecords = normalizePatientRecords(data);
    renderDashboard(patientRecords);
    refreshStatus.textContent = `Last refresh: ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    refreshStatus.textContent = 'Unable to refresh data';
    showToast('Could not load live data. Please check n8n endpoint.');
    patientRecords = [];
    renderDashboard(patientRecords);
  }
}

function startAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
  refreshTimer = setInterval(fetchPatientData, REFRESH_INTERVAL_MS);
}

// Re-render every 60s to update the countdown timers without fetching new data
let countdownTimer = null;
function startCountdownTick() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    if (patientRecords.length > 0) {
      renderDashboard(patientRecords);
    }
  }, 60000);
}

function initializeDashboard() {
  pageTitle.textContent = `Patients for ${formatDate(new Date())}`;
  dateFilter.value = filterDate; // set default to today
  refreshButton.addEventListener('click', fetchPatientData);
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderDashboard(patientRecords);
  });
  dateFilter.addEventListener('change', (e) => {
    filterDate = e.target.value;
    pageTitle.textContent = `Patients for ${formatDate(new Date(filterDate + 'T00:00:00'))}`;
    renderDashboard(patientRecords);
  });
  fetchPatientData();
  startAutoRefresh();
  startCountdownTick();
}

initializeDashboard();
