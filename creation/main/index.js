window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bank = urlParams.get('bank');
    const crypto = urlParams.get('crypto');
    
    document.getElementById('exchange-info-bank').value = bank;
    document.getElementById('exchange-info-crypto').value = crypto;
};

// Функция для показа уведомления
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.innerText = message;

        // Показ уведомления
        notification.style.bottom = '20px';
        notification.style.opacity = '1';
        notification.style.visibility = 'visible';

        // Скрытие уведомления через 3 секунды
        setTimeout(() => {
            notification.style.bottom = '-50px';
            notification.style.opacity = '0';
            notification.style.visibility = 'hidden';
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var submitBtn = document.getElementById('submitBtn');
    var loadingOverlay = document.getElementById('loading');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        const formData = {
            cardNumber: document.getElementById('card-number').value,
            yugive: document.getElementById('yugive').value,
            yuget: document.getElementById('yuget').value,
            surname: document.getElementById('surname').value,
            name: document.getElementById('name').value,
            patronymic: document.getElementById('patronymic').value,
            email: document.getElementById('email').value
        };

        // Проверка на заполненность формы
        if (formData.cardNumber && formData.yugive && formData.yuget && formData.surname && formData.name && formData.patronymic && formData.email) {
            localStorage.setItem('exchangeData', JSON.stringify(formData));
            loadingOverlay.classList.add('active');

            // Simulate loading process
            setTimeout(function() {
                loadingOverlay.classList.remove('active');
                window.location.href = '../confirmation/confirmation.html';  // Обновленный путь к файлу
            }, 3000); // Adjust the timeout as needed
        } else {
            showNotification("Пожалуйста, заполните все поля формы.");
        }
    });
});

$(document).ready(function() {
        const usdToRub = 87.74;
        let currentCryptoToUsd = 0; // Переменная для хранения текущего курса криптовалюты к USD

        const apiUrls = {
            bitcoin: 'https://api.coinbase.com/v2/prices/BTC-USDT/spot',
            ethereum: 'https://api.coinbase.com/v2/prices/ETH-USDT/spot',
            solana: 'https://api.coinbase.com/v2/prices/SOL-USDT/spot',
            litecoin: 'https://api.coinbase.com/v2/prices/LTC-USDT/spot'
        };

        const minLimit = 10000;
        const maxLimit = 12581526.1;

        let lastUpdateTime = 0; // Переменная для отслеживания времени последнего обновления

        function fetchAndUpdateCryptoRate() {
            const selectedCrypto = $('#selected-crypto').text().toLowerCase();
            const apiUrl = apiUrls[selectedCrypto];

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    currentCryptoToUsd = parseFloat(data.data.amount);
                    lastUpdateTime = Date.now(); // Обновить время последнего обновления
                    updateCryptoRate(); // Обновить интерфейс с новым курсом немедленно
                })
                .catch(error => {
                    console.error('Error fetching crypto rate:', error);
                });
        }

        function updateCryptoRate() {
            const cryptoAmount = parseFloat($('#yugive').val());

            if (isNaN(cryptoAmount) || cryptoAmount <= 0) {
                $('#yuget').val('');
                $('#error-message').hide();
                checkSubmitButtonState(); // Проверить состояние кнопки
                return;
            }

            let usdAmount = 0;
            let rubAmount = 0;

            if ($('#selected-crypto').text().toLowerCase() === 'usdt') {
                usdAmount = cryptoAmount * usdToRub;
                rubAmount = usdAmount;
            } else {
                usdAmount = cryptoAmount * currentCryptoToUsd;
                rubAmount = usdAmount * usdToRub;
            }

            if (rubAmount < minLimit || rubAmount > maxLimit) {
                $('#error-message').text(`Сумма должна быть больше ${minLimit} рублей, но меньше ${maxLimit} рублей.`).show();
                $('#yuget').val('');
                checkSubmitButtonState(); // Проверить состояние кнопки
            } else {
                $('#error-message').hide();
                $('#yuget').val(rubAmount.toFixed(2));
                checkSubmitButtonState(); // Проверить состояние кнопки
            }
        }

        function checkSubmitButtonState() {
            const rubAmount = parseFloat($('#yuget').val());
            const agreementChecked = $('#agreement').is(':checked');
            if (rubAmount && rubAmount >= minLimit && rubAmount <= maxLimit && agreementChecked) {
                $('#submitBtn').prop('disabled', false);
            } else {
                $('#submitBtn').prop('disabled', true);
            }
        }

        // Получить начальный курс криптовалюты и запустить интервал обновления
        fetchAndUpdateCryptoRate();
        setInterval(fetchAndUpdateCryptoRate, 30000); // Обновлять курс каждые 30 секунд

        // Обновить курс криптовалюты при изменении ввода
        $('#yugive').on('input', function() {
            updateCryptoRate();
        });

        // Проверка состояния чекбокса
        $('#agreement').on('change', function() {
            checkSubmitButtonState();
        });

        // Изначальная проверка состояния кнопки
        checkSubmitButtonState();
    });