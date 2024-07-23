let timer;
let timerInterval;
let rateTimer;
let timeLeft = 30;

const limitMax = 12581526.1;
const limitMin = 10000;
const staticUsdtToRub = 87.74;
let staticBtcToRubRate;

function updateRatesWithTimer() {
    getCryptoRates();
    clearInterval(timer);
    timer = setInterval(getCryptoRates, 30000);

    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            timeLeft = 30;
            updateRatesWithTimer();
        }
    }, 1000);

    clearInterval(rateTimer);
    updateBtcRate();
    rateTimer = setInterval(updateBtcRate, 5000);
}

async function updateBtcRate() {
    try {
        const responseBTC = await fetch('https://api.coinbase.com/v2/prices/BTC-USDT/spot');
        const dataBTC = await responseBTC.json();
        staticBtcToRubRate = parseFloat(dataBTC.data.amount) * staticUsdtToRub;
        document.getElementById("rate").innerText = `Курс BTC-RUB: ${Math.round(staticBtcToRubRate * 100) / 100} RUB`;
    } catch (error) {
        console.error("Failed to fetch BTC to RUB rate:", error);
        document.getElementById("rate").innerText = "Ошибка загрузки курса";
    }
}

async function getCryptoRates() {
    var crypto = document.getElementById('crypto-select').value;
    var apiUrl;
    var rateElement = document.getElementById("crypto-rate");

    if (crypto === 'usdt') {
        rateElement.innerText = `Курс USDT к RUB: ${staticUsdtToRub} RUB`;
        calculateExchangeRate();
    } else {
        switch (crypto) {
            case 'bitcoin':
                apiUrl = 'https://api.coinbase.com/v2/prices/BTC-USDT/spot';
                break;
            case 'ethereum':
                apiUrl = 'https://api.coinbase.com/v2/prices/ETH-USDT/spot';
                break;
            case 'solana':
                apiUrl = 'https://api.coinbase.com/v2/prices/SOL-USDT/spot';
                break;
            case 'litecoin':
                apiUrl = 'https://api.coinbase.com/v2/prices/LTC-USDT/spot';
                break;
            default:
                apiUrl = '';
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rateUSD = parseFloat(data.data.amount);
            rateElement.innerText = `Курс криптовалюты к USDT: ${Math.round(rateUSD * 100) / 100} USDT`;
        } catch (error) {
            console.error("Failed to fetch rate:", error);
            rateElement.innerText = "Ошибка загрузки курса";
        }
    }
    calculateExchangeRate();
}

function calculateExchangeRate() {
    var crypto = document.getElementById('crypto-select').value;
    var amountInput = document.getElementById("yugive").value;
    var errorDiv = document.getElementById("error-message");
    var totalInRub;
    var exchangeButton = document.getElementById("exchange-button");

    if (!amountInput) {
        document.getElementById("yuget").value = "";
        exchangeButton.classList.add("disabled");
        exchangeButton.disabled = true;
        return;
    }

    var amount = parseFloat(amountInput);
    var rateText = document.getElementById("crypto-rate").textContent;
    var rateUSD = parseFloat(rateText.split(':')[1]);

    if (crypto === 'usdt') {
        rateUSD = 1;
    }

    var totalInUsdt = amount * rateUSD;
    totalInRub = totalInUsdt * staticUsdtToRub;

    if (totalInRub > limitMax) {
        errorDiv.innerText = "Ошибка! Превышен лимит!";
        document.getElementById("yuget").value = "";
        exchangeButton.classList.add("disabled");
        exchangeButton.disabled = true;
    } else if (totalInRub < limitMin) {
        errorDiv.innerText = "Ошибка! Нарушен нижний лимит!";
        document.getElementById("yuget").value = "";
        exchangeButton.classList.add("disabled");
        exchangeButton.disabled = true;
    } else {
        errorDiv.innerText = "";
        document.getElementById("yuget").value = Math.round(totalInRub * 100) / 100;
        exchangeButton.classList.remove("disabled");
        exchangeButton.disabled = false;
    }
}

function handleExchange() {
    var errorDiv = document.getElementById("error-message");
    if (!document.getElementById("exchange-button").disabled) {
        window.location.href = 'creation/order_creation.html';
    } else {
        errorDiv.innerText = "Ошибка! Невозможно выполнить обмен.";
    }
}

document.getElementById("yugive").addEventListener("input", calculateExchangeRate);
document.getElementById("crypto-select").addEventListener("change", getCryptoRates);

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        return false;
    }
    return true;
}

window.onload = updateRatesWithTimer;

document.querySelectorAll('.footer-section h3').forEach(header => {
    header.addEventListener('click', function () {
        const ul = this.nextElementSibling;
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
    });
});

document.getElementById('exchange-form').addEventListener('submit', function () {
    document.getElementById('hidden-crypto').value = document.getElementById('crypto-select').value;
    document.getElementById('hidden-bank').value = document.getElementById('bank-select').value;
});


document.addEventListener("DOMContentLoaded", function() {
      const loadingOverlay = document.getElementById('loading');

      function showLoading() {
        loadingOverlay.classList.add('active');
      }

      function hideLoading() {
        loadingOverlay.classList.remove('active');
      }

      // Показать анимацию загрузки при клике на ссылку
      document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          showLoading();
          setTimeout(() => {
            window.location.href = href;
          }, 1000); // Имитация загрузки (1 секунда в данном случае)
        });
      });
    });



function toggleMenu() {
    var menu = document.getElementById('dropdownMenu');
    var menuToggle = document.getElementById('menuToggle');
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        menuToggle.classList.remove('change');
    } else {
        menu.style.display = 'block';
        menu.style.maxHeight = menu.scrollHeight + "px";
        menuToggle.classList.add('change');
    }
}



 // Функция для проверки наличия сообщения об ошибке
    function checkErrorMessage() {
        var errorMessage = document.getElementById('error-message').innerText;
        var exchangeButton = document.getElementById('exchange-button');

        // Если сообщение об ошибке не пустое, отключаем кнопку
        if (errorMessage.trim() !== "") {
            exchangeButton.style.pointerEvents = 'none';
            exchangeButton.style.opacity = '0.5'; // Для визуальной индикации
        } else {
            exchangeButton.style.pointerEvents = 'auto';
            exchangeButton.style.opacity = '1'; // Восстанавливаем первоначальный вид
        }
    }

    // Создаем MutationObserver для отслеживания изменений в errorMessage
    var observer = new MutationObserver(checkErrorMessage);

    // Конфигурация observer (отслеживание изменения текста)
    var config = { childList: true, subtree: true, characterData: true };

    // Элемент для наблюдения
    var targetNode = document.getElementById('error-message');

    // Начало наблюдения
    observer.observe(targetNode, config);

    // Проверка на наличие сообщения об ошибке при загрузке страницы
    window.onload = checkErrorMessage;

document.getElementById('exchange-button').addEventListener('click', function() {
        const selectedCrypto = document.getElementById('crypto-select').value;
        const selectedBank = document.getElementById('bank-select').value;

        localStorage.setItem('selectedCrypto', selectedCrypto);
        localStorage.setItem('selectedBank', selectedBank);
    });






