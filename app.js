const MEDICAL_KEYWORDS = ['cough', 'fever', 'sore throat', 'runny nose', 'headache', 'body ache', 'fatigue', 'chills', 'nausea', 'vomiting', 'diarrhea'];

const translations = {
  en: {
    welcome_title: 'Welcome to MediFlow',
    welcome_text: 'This quick screening helps us gather your details safely and efficiently',
    start: 'Start',
    tap_hint: 'Tap anywhere on the screen to continue',
    name_title: 'Enter Your Name',
    name_label: 'Name',
    nric_title: 'Enter Your NRIC',
    nric_label: 'NRIC',
    overseas_title: 'Overseas Travel',
    overseas_label: 'Have you been overseas in the past few days?',
    symptoms_title: 'Do you have any of these symptoms?',
    symptom_cough: 'Cough',
    symptom_fever: 'Fever',
    symptom_sore_throat: 'Sore Throat',
    symptom_runny_nose: 'Runny Nose',
    fever_title: 'Fever Temperature',
    fever_label: 'Do you have a fever above 38°C?',
    other_symptoms_title: 'Other Symptoms',
    other_symptoms_label: 'Do you have any other symptoms you want to include?',
    additional_symptoms_title: 'Describe Your Symptoms',
    additional_symptoms_label: 'Please describe any additional symptoms',
    confirmation_title: 'Confirm Your Information',
    yes: 'Yes',
    no: 'No',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    lang_en: 'English',
    lang_zh: '中文',
    lang_ms: 'Malay',
    lang_ta: 'தமிழ்'
  },
  zh: {
    welcome_title: '欢迎使用 MediFlow',
    welcome_text: '这个快速筛查可以安全高效地帮助我们收集您的详细信息',
    start: '开始',
    tap_hint: '点击屏幕上的任何位置继续',
    name_title: '输入您的姓名',
    name_label: '姓名',
    nric_title: '输入您的身份证号码',
    nric_label: '身份证号码',
    overseas_title: '海外旅行',
    overseas_label: '您在过去几天内是否到过海外？',
    symptoms_title: '您是否有以下任何症状？',
    symptom_cough: '咳嗽',
    symptom_fever: '发热',
    symptom_sore_throat: '喉咙痛',
    symptom_runny_nose: '流鼻涕',
    fever_title: '发热温度',
    fever_label: '您的发热是否超过38°C？',
    other_symptoms_title: '其他症状',
    other_symptoms_label: '您是否有其他想要包括的症状？',
    additional_symptoms_title: '描述您的症状',
    additional_symptoms_label: '请描述任何其他症状',
    confirmation_title: '确认您的信息',
    yes: '是',
    no: '否',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    lang_en: 'English',
    lang_zh: '中文',
    lang_ms: 'Malay',
    lang_ta: 'தமிழ்'
  },
  ms: {
    welcome_title: 'Selamat Datang ke MediFlow',
    welcome_text: 'Saringan pantas ini membantu kami mengumpul butiran anda dengan selamat dan cekap',
    start: 'Mula',
    tap_hint: 'Ketik mana-mana tempat pada skrin untuk teruskan',
    name_title: 'Masukkan Nama Anda',
    name_label: 'Nama',
    nric_title: 'Masukkan No. NRIC Anda',
    nric_label: 'NRIC',
    overseas_title: 'Perjalanan Luar Negeri',
    overseas_label: 'Adakah anda telah ke luar negeri dalam beberapa hari yang lalu?',
    symptoms_title: 'Adakah anda mempunyai salah satu gejala berikut?',
    symptom_cough: 'Batuk',
    symptom_fever: 'Demam',
    symptom_sore_throat: 'Sakit Tekak',
    symptom_runny_nose: 'Hidung Berair',
    fever_title: 'Suhu Demam',
    fever_label: 'Adakah anda demam lebih tinggi daripada 38°C?',
    other_symptoms_title: 'Gejala Lain',
    other_symptoms_label: 'Adakah anda mempunyai gejala lain yang ingin anda sertakan?',
    additional_symptoms_title: 'Huraikan Gejala Anda',
    additional_symptoms_label: 'Sila huraikan sebarang gejala tambahan',
    confirmation_title: 'Sahkan Maklumat Anda',
    yes: 'Ya',
    no: 'Tidak',
    next: 'Seterusnya',
    previous: 'Sebelumnya',
    submit: 'Hantar',
    lang_en: 'English',
    lang_zh: '中文',
    lang_ms: 'Malay',
    lang_ta: 'தமிழ்'
  },
  ta: {
    welcome_title: 'MediFlow-க்கு வரவேற்கிறோம்',
    welcome_text: 'இந்த விரைவு மதிப்பீடு உங்கள் விவரங்களை பாதுகாப்பாகவும் திறமையாகவும் சேகரிக்க உதவுகிறது',
    start: 'தொடங்கு',
    tap_hint: 'தொடர ச screens-ல் எங்கு வேண்டுமானாலும் தட்டவும்',
    name_title: 'உங்கள் பெயரை உள்ளிடவும்',
    name_label: 'பெயர்',
    nric_title: 'உங்கள் NRIC ஐ உள்ளிடவும்',
    nric_label: 'NRIC',
    overseas_title: 'வெளிநாட்டு பயணம்',
    overseas_label: 'நீங்கள் கடந்த சில நாட்களில் வெளிநாட்டுக்குச் சென்றிருக்கிறீர்களா?',
    symptoms_title: 'உங்களுக்கு இந்த அறிகுறிகளில் ஏதேனும் உள்ளதா?',
    symptom_cough: 'இருமல்',
    symptom_fever: 'காய்ச்சல்',
    symptom_sore_throat: 'தொண்டை வலி',
    symptom_runny_nose: 'மூக்கு ஒழுகுதல்',
    fever_title: 'காய்ச்சல் வெப்பநிலை',
    fever_label: 'உங்களுக்கு 38°C க்கு மேல் காய்ச்சல் உள்ளதா?',
    other_symptoms_title: 'பிற அறிகுறிகள்',
    other_symptoms_label: 'நீங்கள் சேர்க்க விரும்பும் வேறு ஏதேனும் அறிகுறிகள் உள்ளனவா?',
    additional_symptoms_title: 'உங்கள் அறிகுறிகளை விவரிக்கவும்',
    additional_symptoms_label: 'எந்தவொரு கூடுதல் அறிகுறிகளையும் வர்ணிக்கவும்',
    confirmation_title: 'உங்கள் தகவலை உறுதிப்படுத்தவும்',
    yes: 'ஆம்',
    no: 'இல்லை',
    next: 'அடுத்து',
    previous: 'முந்தைய',
    submit: 'சமர்ப்பிக்கவும்',
    lang_en: 'English',
    lang_zh: '中文',
    lang_ms: 'Malay',
    lang_ta: 'தமிழ்'
  }
};

let pageState = {
  currentPage: 0,
  currentLanguage: 'en',
  formData: {}
};

window.submissions = [];
window.keywords = [];

const N8N_CONFIG = {
  baseUrl: 'https://n8ngc.codeblazar.org',
  webhookPath: 'webhook/fa1-screening-form',
  getPath: ''
};

function setupLogoutButton() {
  const logoutBtn = document.createElement('button');
  logoutBtn.id = 'logout-btn';
  logoutBtn.textContent = 'Logout';
  logoutBtn.classList.add('logout-btn');
  document.body.appendChild(logoutBtn);

  logoutBtn.addEventListener('click', () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      pageState.formData = {};
      pageState.currentPage = 0;
      showPage(0);
      logoutBtn.style.display = 'none'; // hide again on welcome page
    }
  });
}

function toggleLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn) return;

  // Show logout button only if past page 0 and not on confirmation page (page 8)
  if (pageState.currentPage > 0 && pageState.currentPage !== 8) {
    logoutBtn.style.display = 'block';
  } else {
    logoutBtn.style.display = 'none';
  }
}

// Update showPage to also toggle logout button
const originalShowPage = showPage;
showPage = function(pageNum) {
  originalShowPage(pageNum);
  toggleLogoutButton();
};

document.addEventListener('DOMContentLoaded', () => {
  setLanguage('en');
  setupNricInput();
  showPage(0);

  setupLogoutButton(); // add logout button

  if (N8N_CONFIG.baseUrl && N8N_CONFIG.getPath) {
    loadFromN8n().then(result => {
      if (result && result.ok) {
        showStatusMessage('Connected to n8n data endpoint.', 'success');
      }
    });
  }
});

function buildN8nUrl(path) {
  if (!N8N_CONFIG.baseUrl) return null;

  const normalizedBase = N8N_CONFIG.baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}/${normalizedPath}`;
}

async function n8nRequest(method = 'GET', path = '', body = null) {
  const url = buildN8nUrl(path);
  if (!url) {
    return { ok: false, status: 0, data: null, error: 'N8N endpoint not configured' };
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 0, data: null, error: error.message };
  }
}

async function postSubmissionToN8n(submission) {
  return n8nRequest('POST', N8N_CONFIG.webhookPath, submission);
}

async function loadFromN8n() {
  if (!N8N_CONFIG.getPath) return null;
  return n8nRequest('GET', N8N_CONFIG.getPath);
}

function showStatusMessage(message, type = 'info') {
  let statusBox = document.getElementById('n8n-status');

  if (!statusBox) {
    statusBox = document.createElement('div');
    statusBox.id = 'n8n-status';
    statusBox.style.marginTop = '16px';
    statusBox.style.padding = '12px 14px';
    statusBox.style.borderRadius = '12px';
    statusBox.style.fontWeight = '600';
    document.querySelector('.card')?.appendChild(statusBox);
  }

  statusBox.textContent = message;
  statusBox.style.background = type === 'error' ? '#fee2e2' : type === 'success' ? '#dcfce7' : '#eff6ff';
  statusBox.style.color = type === 'error' ? '#b91c1c' : type === 'success' ? '#166534' : '#1d4ed8';
}

function extractKeywords(text) {
  const lowerText = text.toLowerCase();
  const found = [];
  MEDICAL_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword) && !found.includes(keyword)) {
      found.push(keyword);
    }
  });
  return found;
}

function updatePageTranslations() {
  const langData = translations[pageState.currentLanguage];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.textContent = langData[key];
    }
  });
}

function setLanguage(lang) {
  pageState.currentLanguage = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.style.fontWeight = btn.getAttribute('data-lang') === lang ? 'bold' : 'normal';
  });
  updatePageTranslations();
}

function showPage(pageNum) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const page = document.querySelector(`[data-page="${pageNum}"]`);
  if (page) page.style.display = 'block';
  updatePageTranslations();
  window.scrollTo(0, 0);
}

function getFormValue(formId, fieldName) {
  const form = document.getElementById(formId);
  if (!form) return null;
  
  const checkboxes = form.querySelectorAll(`input[type="checkbox"][name="${fieldName}"]`);
  if (checkboxes.length > 0) {
    const checked = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    return checked.length > 1 ? checked : (checked.length === 1 ? checked[0] : null);
  }
  
  const radio = form.querySelector(`input[type="radio"][name="${fieldName}"]:checked`);
  if (radio) return radio.value;
  
  const textarea = form.querySelector(`textarea[name="${fieldName}"]`);
  if (textarea) return textarea.value;
  
  const input = form.querySelector(`input[name="${fieldName}"]`);
  if (input) return input.value;
  
  return null;
}

function validatePage() {
  const form = document.getElementById(`page-${pageState.currentPage}-form`);
  if (!form) return true;
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  for (let input of inputs) {
    if (input.type === 'radio' || input.type === 'checkbox') {
      const groupName = input.name;
      const checked = form.querySelector(`input[name="${groupName}"]:checked`);
      if (!checked) return false;
    } else if (input.name === 'nric') {
      const value = input.value.trim();
      if (value.length !== 4 || !/^[A-Za-z0-9]{4}$/.test(value)) {
        input.focus();
        return false;
      }
    } else if (!input.value.trim()) {
      return false;
    }
  }
  return true;
}

function savePage() {
  const form = document.getElementById(`page-${pageState.currentPage}-form`);
  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      const checked = Array.from(form.querySelectorAll(`input[name="${input.name}"]:checked`))
                           .map(cb => cb.value);
      if (checked.length > 0) {
        pageState.formData[input.name] = checked;
      }
    } else if (input.type === 'radio') {
      if (input.checked) {
        pageState.formData[input.name] = input.value;
      }
    } else if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
      const value = input.name === 'nric' ? input.value.trim().toUpperCase() : input.value.trim();
      if (value) {
        pageState.formData[input.name] = value;
      }
    }
  });
}

function restorePageValues() {
  const form = document.getElementById(`page-${pageState.currentPage}-form`);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') {
      input.checked = pageState.formData[input.name] === input.value;
    } else if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
      input.value = pageState.formData[input.name] || '';
    }
  });
}

function setupNricInput() {
  const nricInput = document.getElementById('nric');
  if (!nricInput) return;

  nricInput.addEventListener('input', () => {
    nricInput.value = nricInput.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();
  });
}

function nextPage() {
  if (!validatePage()) return;
  
  savePage();
  
  if (pageState.currentPage === 6) {
    const otherSymptoms = pageState.formData.other_symptoms;
    pageState.currentPage = otherSymptoms === 'yes' ? 7 : 8;
  } else {
    pageState.currentPage += 1;
  }
  
  showPage(pageState.currentPage);
  if (pageState.currentPage === 8) {
    displayConfirmation();
  }
  restorePageValues();
}

function prevPage() {
  savePage();
  
  if (pageState.currentPage === 8) {
    pageState.currentPage = pageState.formData.other_symptoms === 'no' ? 6 : 7;
  } else if (pageState.currentPage === 7) {
    pageState.currentPage = 6;
  } else {
    pageState.currentPage -= 1;
  }
  
  showPage(pageState.currentPage);
  restorePageValues();
}

function displayConfirmation() {
  const summary = document.getElementById('confirmation-summary');
  const langData = translations[pageState.currentLanguage];
  
  const data = pageState.formData;
  const sections = [
    `<div class="summary-section"><strong>NRIC:</strong> ${data.nric || ''}</div>`,
    `<div class="summary-section"><strong>${langData.name_label}:</strong> ${data.name || ''}</div>`,
    `<div class="summary-section"><strong>${langData.overseas_label}:</strong> ${langData[data.overseas === 'yes' ? 'yes' : 'no'] || ''}</div>`,
    `<div class="summary-section"><strong>${langData.symptoms_title}:</strong> ${Array.isArray(data.symptoms) ? data.symptoms.join(', ') : data.symptoms || 'None'}</div>`,
    `<div class="summary-section"><strong>${langData.fever_label}:</strong> ${langData[data.high_fever === 'yes' ? 'yes' : 'no'] || ''}</div>`,
    data.other_symptoms === 'yes' ? `<div class="summary-section"><strong>${langData.additional_symptoms_label}:</strong> ${data.additional_symptoms || ''}</div>` : ''
  ];
  
  summary.innerHTML = sections.filter(s => s).join('');
}

async function submitForm() {
  savePage();

  if (pageState.formData.additional_symptoms) {
    const extracted = extractKeywords(pageState.formData.additional_symptoms);
    window.keywords.push(...extracted);
  }

  const submission = { ...pageState.formData, submittedAt: new Date().toISOString() };
  window.submissions.push(submission);

  // Reset UI immediately
  alert('Thank you for your submission!');
  pageState.formData = {};
  pageState.currentPage = 0;
  showPage(0);

  // Fire off n8n request in background
  postSubmissionToN8n(submission).then(n8nResult => {
    if (n8nResult.ok) {
      showStatusMessage('Submission sent to n8n successfully.', 'success');
    } else {
      showStatusMessage('Submission saved locally. Configure the n8n endpoint to send it to n8n.', 'error');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', nextPage);
  });
  
  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', prevPage);
  });

  document.querySelectorAll('.page').forEach(page => {
    page.addEventListener('click', (event) => {
      const isInteractive = event.target.closest('button, input, textarea, select, a, label');
      if (isInteractive) return;
      if (pageState.currentPage === 0 || pageState.currentPage === 1) {
        nextPage();
      }
    });
  });
  
  document.getElementById('btn-submit').addEventListener('click', submitForm);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
  
  setLanguage('en');
  setupNricInput();
  showPage(0);

  if (N8N_CONFIG.baseUrl && N8N_CONFIG.getPath) {
    loadFromN8n().then(result => {
      if (result && result.ok) {
        showStatusMessage('Connected to n8n data endpoint.', 'success');
      }
    });
  }
});
