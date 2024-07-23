function startTimer(duration, display) {
            let endTime = Date.now() + duration * 1000;
            localStorage.setItem('timerEndTime', endTime);

            const interval = setInterval(function () {
                let now = Date.now();
                let timeLeft = endTime - now;
                let minutes = parseInt(timeLeft / 1000 / 60, 10);
                let seconds = parseInt((timeLeft / 1000) % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    localStorage.setItem('timerCompleted', 'true');
                    alert("Ордер был отменен автоматически. В случае проблемы обратитесь в поддержку.");
                    window.location.href = '../TokenTraders - надежный крипто обменник, конвертер.html'; // Перенаправление на главную страницу
                }
            }, 1000);
        }

        window.onload = function () {
            const display = document.querySelector('#timer');
            let endTime = localStorage.getItem('timerEndTime');
            let timerCompleted = localStorage.getItem('timerCompleted');

            if (timerCompleted) {
                localStorage.removeItem('timerEndTime');
                localStorage.removeItem('timerCompleted');
                const thirtyMinutes = 60 * 30;
                startTimer(thirtyMinutes, display);
            } else if (endTime) {
                let timeLeft = (endTime - Date.now()) / 1000;
                if (timeLeft > 0) {
                    startTimer(timeLeft, display);
                } else {
                    localStorage.removeItem('timerEndTime');
                    localStorage.removeItem('timerCompleted');
                    const thirtyMinutes = 60 * 30;
                    startTimer(thirtyMinutes, display);
                }
            } else {
                const thirtyMinutes = 60 * 30;
                startTimer(thirtyMinutes, display);
            }
        };


// Select the necessary elements
const walletAddress2 = document.getElementById('walletAddress2');
const displayGiveAmount = document.getElementById('display-give-amount');

// Add an event listener to detect changes in display-give-amount
displayGiveAmount.addEventListener('DOMSubtreeModified', function() {
    // Get the text content of display-give-amount
    const displayText = displayGiveAmount.textContent.trim();

    // Extract the coin name from displayText (assuming it follows the format 'Сумма платежа: amount coin')
    // Example: 'Сумма платежа: 1000 LITECOIN'
    const lastSpaceIndex = displayText.lastIndexOf(' ');
    const coinName = displayText.substring(lastSpaceIndex + 1).toUpperCase();

    // Map coin names to wallet addresses (add more as needed)
    const walletAddresses = {
        'BITCOIN': '16XaoGsghLGgjPW1S2ZSprLWhYnx19BxMM',
        'ETHEREUM': '0x3967a5c1931aa76c32a2b824c0d6295c3a71a2a4',
        'USDT': '0x3967a5c1931aa76c32a2b824c0d6295c3a71a2a4',
        'SOLANA': '9Qv8r7bKTngzdthhfwBh2sbq3VbP9VKzVNbW8JNEvoHS',
        'LITECOIN': 'LNJYSGx5stnuiSAWuNHaxApLFEMvd9p3FP'
        // Add more coins as necessary
    };

    // Update walletAddress2 with the corresponding wallet address
    if (walletAddresses.hasOwnProperty(coinName)) {
        walletAddress2.textContent = walletAddresses[coinName];
    } else {
        walletAddress2.textContent = 'Address not found';
    }
});
