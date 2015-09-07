export default function startCountdown({ initialCountdown, countdownDecrementedCallback, turnTimeoutCallback }) {

    let countdown = initialCountdown;

    return setInterval(() => {
        countdown--;

        countdownDecrementedCallback(countdown);

        if (countdown === 0) {
            turnTimeoutCallback(initialCountdown);
        }
    }, 1000);
}