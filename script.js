// script.js — небольшая логика формы и шаблон ТЗ
// EmailJS инициализация (замени на свои ключи)
(function(){
  emailjs.init("scLegEVZgN_JOhmF9"); // <-- твой public key из EmailJS
})();

document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  // Простая валидация email
  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  // Удобная функция показа сообщения пользователю
  const showMsg = (text, timeout = 4000) => {
    if (!msg) return;
    msg.textContent = text;
    if (timeout > 0) {
      clearTimeout(showMsg._t);
      showMsg._t = setTimeout(() => { msg.textContent = ""; }, timeout);
    }
  };

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      showMsg('Пожалуйста, заполните все поля.');
      return;
    }
    if (!isValidEmail(email)) {
      showMsg('Проверьте правильность email.');
      return;
    }

    // Отправка через EmailJS
    emailjs.send("service_ibpx9zf", "template_ky6mr1a", {
      from_name: name,
      from_email: email,
      message: message,
      to_name: "Александр", // или твой name
    })
    .then(() => {
      showMsg('Сообщение отправлено! Я отвечу в ближайшее время.');
      form.reset();
    })
    .catch((error) => {
      console.error('Ошибка отправки:', error);
      showMsg('Ошибка отправки. Попробуйте mailto: supesupeowo@gmail.com');
      // Fallback to mailto
      const subject = encodeURIComponent('Заказ с портфолио: ' + name);
      const body = encodeURIComponent('Имя: ' + name + '\nПочта: ' + email + '\n\n' + message);
      window.location.href = 'mailto:supesupeowo@gmail.com?subject=' + subject + '&body=' + body;
    });
  });

  document.getElementById('copyTemplate').addEventListener('click', ()=>{
    const tpl = [
      'Коротко о проекте: (цель, целевая аудитория)',
      'Страницы: (например, Главная, О продукте, Контакты)',
      'Примеры/референсы (ссылки):',
      'Контент: (тексты, изображения — если нет, укажите это)',
      'Функции: (форма, авторизация, каталог, оплата и т.д.)',
      'Сроки и бюджет:'
    ].join('\n');
    navigator.clipboard && navigator.clipboard.writeText(tpl);
    const fm = document.getElementById('formMsg');
    fm.textContent = 'Шаблон ТЗ скопирован в буфер обмена.';
  });
});
