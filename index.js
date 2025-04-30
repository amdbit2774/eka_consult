// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Обработчик события готовности
tg.ready();

// Получаем данные пользователя
const user = tg.initDataUnsafe.user;

// Выводим информацию о пользователе в консоль
console.log('User:', user);

// Функция для отправки данных в Telegram
function sendData(data) {
    tg.sendData(JSON.stringify(data));
}

// Пример обработки нажатия кнопки
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('tg-button')) {
        sendData({ action: 'button_click' });
    }
}); 