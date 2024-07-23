document.addEventListener('DOMContentLoaded', () => {
    // Функция для генерации реферального кода
    function generateCode76() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = 8;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

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
            }, 5000);
        }
    }

    // Обработчик кнопки "Сгенерировать новый код"
    document.getElementById('generate-btn76').addEventListener('click', () => {
        const newCode = generateCode76();
        document.getElementById('code-box76').innerText = newCode;
    });

    // Обработчик кнопки "Подтвердить код"
    document.getElementById('confirm-btn76').addEventListener('click', () => {
        const confirmedCode = document.getElementById('code-box76').innerText;
        if (confirmedCode && confirmedCode !== 'Ваш код появится здесь') {
            showNotification(`Код подтвержден: ${confirmedCode}`);
            // Здесь можно добавить логику для сохранения подтвержденного кода на сервере
        } else {
            showNotification('Сначала сгенерируйте код.');
        }
    });
});