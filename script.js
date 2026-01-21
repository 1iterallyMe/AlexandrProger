// Полный script.js — вставь как есть (mailto версия, без сервера)
const EMAIL = "supesupeowo@gmail.com"; // <-- сюда твоя почта

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  const copyBtn = document.getElementById("copyTemplate");

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

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (form.name?.value || "").trim();
      const email = (form.email?.value || "").trim();
      const message = (form.message?.value || "").trim();

      if (!name || !email || !message) {
        showMsg("Пожалуйста, заполните все поля.");
        return;
      }

      if (!isValidEmail(email)) {
        showMsg("Проверьте правильность email.");
        return;
      }

      const subject = `Заказ сайта — ${name}`;
      const bodyLines = [
        `Имя: ${name}`,
        `Почта: ${email}`,
        "",
        "Сообщение:",
        message
      ];
      const body = bodyLines.join("\n");

      // Открываем почтовый клиент пользователя
      const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      showMsg("Открывается почтовый клиент...");
    });
  }

  // Кнопка: копировать шаблон ТЗ
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const tpl = [
        "Коротко о проекте: (цель, целевая аудитория)",
        "Страницы: (например, Главная, О продукте, Контакты)",
        "Примеры/референсы (ссылки):",
        "Контент: (тексты, изображения — если нет, укажите это)",
        "Функции: (форма, авторизация, каталог, оплата и т.д.)",
        "Сроки и бюджет:"
      ].join("\n");

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(tpl);
        } else {
          // fallback
          const ta = document.createElement("textarea");
          ta.value = tpl;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        showMsg("Шаблон ТЗ скопирован в буфер обмена.", 2500);
      } catch {
        showMsg("Не удалось скопировать шаблон. Скопируй вручную.", 3000);
      }
    });
  }
});
