// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(targetTab).classList.add('active');
    });
});

function generateAdvancedPassword() {
    const base = document.getElementById('passBase').value || '';
    const length = parseInt(document.getElementById('passLength').value) || 12;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const includeMixedCase = document.getElementById('includeMixedCase').checked;
    
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeMixedCase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = base;
    const remainingLength = Math.max(0, length - base.length);
    
    for (let i = 0; i < remainingLength; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // password shuffling
    if (base) {
        password = password.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    document.getElementById('passwordResult').textContent = password;
    document.getElementById('savePassword').classList.remove('hidden');
}

function generateAdvancedUsername() {
    const base = document.getElementById('userBase').value || '';
    const style = document.getElementById('userStyle').value;
    const addNumbers = document.getElementById('addNumbers').checked;
    const addUnderscore = document.getElementById('addUnderscore').checked;
    
    let username = base;
    
    if (style === 'cool') {
        const coolWords = ['pro', 'max', 'elite', 'legend', 'master', 'king', 'boss'];
        const coolWord = coolWords[Math.floor(Math.random() * coolWords.length)];
        username = Math.random() > 0.5 ? coolWord + username : username + coolWord;
    } else if (style === 'professional') {
        const profWords = ['dev', 'tech', 'solutions', 'systems', 'digital'];
        const profWord = profWords[Math.floor(Math.random() * profWords.length)];
        username = username + profWord;
    }
    
    if (addUnderscore && username.length > 0) {
        username = username.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    
    if (addNumbers) {
        username += Math.floor(Math.random() * 9999) + 1;
    }
    
    if (!username) {
        const randomWords = ['user', 'player', 'member', 'guest'];
        username = randomWords[Math.floor(Math.random() * randomWords.length)] + Math.floor(Math.random() * 1000);
    }
    
    document.getElementById('usernameResult').textContent = username;
    document.getElementById('saveUsername').classList.remove('hidden');
}

function generateAdvancedEmail() {
    const base = document.getElementById('emailBase').value || '';
    const domain = document.getElementById('emailDomain').value;
    const includeNumbers = document.getElementById('emailNumbers').checked;
    
    let emailName = base;
    
    if (!emailName) {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 6; i++) {
            emailName += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    
    if (includeNumbers) {
        emailName += Math.floor(Math.random() * 999) + 1;
    }
    
    const email = `${emailName}@${domain}`;
    document.getElementById('emailResult').textContent = email;
    document.getElementById('saveEmail').classList.remove('hidden');
}

function saveItem(type) {
    let value = '';
    if (type === 'password') {
        value = document.getElementById('passwordResult').textContent;
    } else if (type === 'username') {
        value = document.getElementById('usernameResult').textContent;
    } else if (type === 'email') {
        value = document.getElementById('emailResult').textContent;
    }
    
    const label = prompt(`Save this ${type} as:`);
    if (!label || !value) return;
    
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
    document.getElementById(`save${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('hidden');
}