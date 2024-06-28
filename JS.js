let timer;
let timerInterval;
let rateTimer;
let timeLeft = 30;

const limitMax = 12581526.1;
const limitMin = 30000;
const staticUsdtToRub = 93.83;
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
  updateBtcRate(); // Вызываем функцию обновления курса BTC-RUB сразу при загрузке
  rateTimer = setInterval(updateBtcRate, 5000); // Запускаем таймер для обновления курса BTC каждые 5 секунд
}

async function updateBtcRate() {
  try {
    const responseBTC = await fetch('https://api.coinbase.com/v2/prices/BTC-USDT/spot');
    const dataBTC = await responseBTC.json();
    staticBtcToRubRate = parseFloat(dataBTC.data.amount) * staticUsdtToRub;
    document.getElementById("rate").innerText = `Курс BTC-RUB: ${Math.round(staticBtcToRubRate * 100) / 100} RUB`;
    calculateExchangeRate(); // Вызов функции после обновления курса
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
    calculateExchangeRate(); // Вызов функции для обновления значения yuget
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

  try {
    const responseBTC = await fetch('https://api.coinbase.com/v2/prices/BTC-USDT/spot');
    const dataBTC = await responseBTC.json();
    staticBtcToRubRate = parseFloat(dataBTC.data.amount);
    staticBtcToRubRate = staticBtcToRubRate * staticUsdtToRub;
    document.getElementById("rate").innerText = `Курс BTC-RUB: ${Math.round(staticBtcToRubRate * 100) / 100} RUB`;
  } catch (error) {
    console.error("Failed to fetch BTC to RUB rate:", error);
    document.getElementById("rate").innerText = "Ошибка загрузки курса";
  }
}

function calculateExchangeRate() {
  var crypto = document.getElementById('crypto-select').value;
  var amountInput = document.getElementById("yugive").value;
  var errorDiv = document.getElementById("error-message");
  var totalInRub;

  if (!amountInput) {
    document.getElementById("yuget").value = "";
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
  } else if (totalInRub < limitMin) {
    errorDiv.innerText = "Ошибка! Нарушен нижний лимит!";
    document.getElementById("yuget").value = "";
  } else {
    errorDiv.innerText = "";
    document.getElementById("yuget").value = Math.round(totalInRub * 100) / 100;
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
  header.addEventListener('click', function() {
    const ul = this.nextElementSibling;
    ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
  });
});


document.getElementById('exchange-form').addEventListener('submit', function() {
    document.getElementById('hidden-crypto').value = document.getElementById('crypto-select').value;
    document.getElementById('hidden-bank').value = document.getElementById('bank-select').value;
});
















