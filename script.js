// script.js — рабочая версия (mailto fallback), без внешних зависимостей
const EMAIL = "supesupeowo@gmail.com"; // <- поменяй, если нужно

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  const copyBtn = document.getElementById("copyTemplate");

  // Если формы нет — просто не ломаемся
  if (!form) {
    console.warn("contactForm не найден — форма отключена.");
    return;
  }

  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const showMsg = (text, timeout = 4000) => {
    if (!msg) return;
    msg.textContent = text;
    if (timeout > 0) {
      clearTimeout(showMsg._t);
      showMsg._t = setTimeout(() => { msg.textContent = ""; }, timeout);
    }
  };

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
    const body = [
      `Имя: ${name}`,
      `Почта: ${email}`,
      "",
      "Сообщение:",
      message
    ].join("\n");

    // mailto fallback (откроет почтовый клиент пользователя)
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    showMsg("Открывается почтовый клиент...");
  });

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