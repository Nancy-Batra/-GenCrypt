// dashboard access from URL
if (window.location.hash === '#dashboard') {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    showDashboard();
}

// Page loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 300);
    }, 1500);
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        alert('Please fill in both fields');
        return;
    }
    
    if (password !== 'admin123') {
        alert('Wrong password! Try: admin123');
        return;
    }
    
    showDashboard(username);
});

function showDashboard(username = 'User') {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('welcomeTitle').textContent = `Welcome back, ${username}!`;
}

// sign up registration
document.getElementById('registerLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Registration coming soon!');
});

// Theme toggle
document.getElementById('themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const btn = document.getElementById('themeBtn');
    btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.reload();
});

// Nav
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    
        const targetId = link.getAttribute('href').replace('#', '');
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
        
        if (targetId === 'vault') {
            loadVault();
        }
    });
});

// generator buttons
document.getElementById('genPassword').addEventListener('click', generatePassword);
document.getElementById('genUsername').addEventListener('click', generateUsername);
document.getElementById('genEmail').addEventListener('click', generateEmail);


// Caesar cipher encryption
function caesarShift(str, amount) {
  if (amount < 0) return caesarShift(str, amount + 26);
  let output = "";
  for (let i = 0; i < str.length; i++) {
    let c = str[i];
    if (c.match(/[a-z]/i)) {
      let code = str.charCodeAt(i);
      let base = (code >= 65 && code <= 90) ? 65 : 97;
      c = String.fromCharCode(((code - base + amount) % 26) + base);
    }
    output += c;
  }
  return output;
}

const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const plainTextEl = document.getElementById('plainText');
const encryptedResultEl = document.getElementById('encryptedResult');
const saveBtn = document.getElementById('saveEncrypted');

let lastEncryptedText = '';
const shift = 3;

encryptBtn.addEventListener('click', () => {
  const text = plainTextEl.value.trim();
  if (!text) {
    alert('Please enter some text to encrypt');
    return;
  }

  const encrypted = caesarShift(text, shift);
  encryptedResultEl.textContent = encrypted;
  lastEncryptedText = encrypted;

  saveBtn.classList.remove('hidden');
  decryptBtn.classList.remove('hidden');
});

decryptBtn.addEventListener('click', () => {
  if (!lastEncryptedText) return;

  const decrypted = caesarShift(lastEncryptedText, -shift);
  encryptedResultEl.textContent = decrypted;

  decryptBtn.classList.add('hidden');
});

// saving encrypted text to vault
saveBtn.addEventListener('click', () => {
  if (!lastEncryptedText) return alert('No encrypted text to save!');

  const label = prompt('Save this text as:');
  if (label === null || label.trim() === '') return;

  const vaultData = JSON.parse(localStorage.getItem('gencryptVault') || '[]');

  const newItem = {
    id: Date.now(),  
    label: label.trim(),
    type: 'encrypted',
    value: lastEncryptedText,
    created: new Date().toLocaleString()
  };

  vaultData.push(newItem);

  localStorage.setItem('gencryptVault', JSON.stringify(vaultData));

  alert('Saved to vault! ✅');
  saveBtn.classList.add('hidden');
});
