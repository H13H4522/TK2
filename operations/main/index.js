window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bank = urlParams.get('bank');
    const crypto = urlParams.get('crypto');
    
    document.getElementById('exchange-info-bank').value = bank;
    document.getElementById('exchange-info-crypto').value = crypto;
};

