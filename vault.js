function loadVault() {
    const container = document.getElementById('vaultItems');
    const vaultData = JSON.parse(localStorage.getItem('gencryptVault') || '[]');
    
    container.innerHTML = '';
    
    if (vaultData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 40px;">No items in vault yet. Generate something first!</p>';
        return;
    }
    
    vaultData.forEach(item => {
        const itemElement = createVaultItem(item);
        container.appendChild(itemElement);
    });
}

function createVaultItem(item) {
    const div = document.createElement('div');
    div.className = 'vault-item';
    
    const isPassword = item.type === 'password';
    const displayValue = isPassword ? maskValue(item.value) : item.value;
    
    div.innerHTML = `
        <h3>${item.label}</h3>
        <span class="vault-type">${item.type}</span>
        <div class="vault-value" id="value-${item.id}" data-original="${item.value}" data-masked="${maskValue(item.value)}">
            ${displayValue}
        </div>
        <small style="color: #64748b;">Created: ${item.created || 'Unknown'}</small>
        <div class="vault-actions">
            ${isPassword ? `<button onclick="toggleVisibility(${item.id})" title="Toggle visibility">👁️</button>` : ''}
            <button onclick="copyValue('${item.value}')" title="Copy">📋</button>
            <button onclick="deleteItem(${item.id})" title="Delete">🗑️</button>
        </div>
    `;
    
    return div;
}

function maskValue(value) {
    return '•'.repeat(Math.min(value.length, 12));
}

function toggleVisibility(itemId) {
    const element = document.getElementById(`value-${itemId}`);
    const isCurrentlyMasked = element.textContent.includes('•');
    
    if (isCurrentlyMasked) {
        element.textContent = element.dataset.original;
    } else {
        element.textContent = element.dataset.masked;
    }
}

function copyValue(value) {
    navigator.clipboard.writeText(value).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!');
    });
}

function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    let vaultData = JSON.parse(localStorage.getItem('gencryptVault') || '[]');
    vaultData = vaultData.filter(item => item.id !== itemId);
    localStorage.setItem('gencryptVault', JSON.stringify(vaultData));
    
    loadVault(); 
    showToast('Item deleted');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// for search functionality
document.getElementById('vaultSearch').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.vault-item');
    
    items.forEach(item => {
        const label = item.querySelector('h3').textContent.toLowerCase();
        const type = item.querySelector('.vault-type').textContent.toLowerCase();
        const matches = label.includes(searchTerm) || type.includes(searchTerm);
        item.style.display = matches ? 'block' : 'none';
    });
});

// CSS 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);