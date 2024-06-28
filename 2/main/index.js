window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bank = urlParams.get('bank');
    const crypto = urlParams.get('crypto');
    
    document.getElementById('exchange-info-bank').value = bank;
    document.getElementById('exchange-info-crypto').value = crypto;
};

const input = document.getElementById('yugive');
const button = document.querySelector('.submit-btn');

input.addEventListener('input', function() {
    button.classList.add('loading');
});

