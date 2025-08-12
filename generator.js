function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const length = 12;
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    displayResult(password, 'password');
}

function generateUsername() {
    const adjectives = ['cool', 'swift', 'bright', 'clever', 'quiet', 'bold'];
    const nouns = ['fox', 'wolf', 'eagle', 'tiger', 'bear', 'hawk'];
    const number = Math.floor(Math.random() * 999) + 1;
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const username = `${adjective}_${noun}${number}`;
    
    displayResult(username, 'username');
}

function generateEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let emailName = '';
    
    for (let i = 0; i < 8; i++) {
        emailName += chars[Math.floor(Math.random() * chars.length)];
    }
    
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${emailName}@${domain}`;
    
    displayResult(email, 'email');
}

function displayResult(value, type) {
    document.getElementById('generatorResult').textContent = value;
    const saveBtn = document.getElementById('saveGenerated');
    saveBtn.classList.remove('hidden');
    saveBtn.setAttribute('data-type', type);
    saveBtn.setAttribute('data-value', value);
}

document.getElementById('saveGenerated').addEventListener('click', (e) => {
    const type = e.target.getAttribute('data-type');
    const value = e.target.getAttribute('data-value');
    saveToVault(type, value);
});

function saveToVault(type, value) {
    const label = prompt(`Save this ${type} as:`);
    if (!label) return;
    
    const vaultData = JSON.parse(localStorage.getItem('gencryptVault') || '[]');
    const newItem = {
        id: Date.now(),
        type: type,
        label: label.trim(),
        value: value,
        created: new Date().toLocaleDateString()
    };
    
    vaultData.push(newItem);
    localStorage.setItem('gencryptVault', JSON.stringify(vaultData));
    
    alert('Saved to vault! ✅');
    document.getElementById('saveGenerated').classList.add('hidden');
    if (document.getElementById('saveEncrypted')) {
        document.getElementById('saveEncrypted').classList.add('hidden');
    }
}