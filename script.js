// script.js — небольшая логика формы и шаблон ТЗ
document.addEventListener('DOMContentLoaded', ()=> {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      msg.textContent = 'Пожалуйста, заполните все поля.';
      return;
    }
    // Здесь можно заменить на fetch() к вашему API. Пока — mailto fallback.
    const subject = encodeURIComponent('Заказ с портфолио: ' + (name || 'Новый клиент'));
    const body = encodeURIComponent('Имя: ' + name + '\nПочта: ' + email + '\n\n' + message);
    window.location.href = 'mailto:you@example.com?subject=' + subject + '&body=' + body;
    msg.textContent = 'Открывается почтовый клиент...';
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
