import { applyTranslations, getLanguage, setLanguage, t } from "./i18n.js";

const languageButtons = [...document.querySelectorAll("[data-language]")];
const languageSuccess = document.querySelector("[data-language-success]");

const updateLanguageSelection = (selectedLanguage) => {
  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
};

const showLanguageMessage = () => {
  languageSuccess.querySelector("span:last-child").textContent = t("Language preference saved");
  languageSuccess.classList.add("is-visible");

  window.setTimeout(() => {
    languageSuccess.classList.remove("is-visible");
  }, 1800);
};

const initLanguage = () => {
  const savedLanguage = getLanguage();
  updateLanguageSelection(savedLanguage);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.dataset.language;
      const savedLanguage = setLanguage(selectedLanguage);
      applyTranslations();
      updateLanguageSelection(savedLanguage);
      showLanguageMessage();
    });
  });
};

document.addEventListener("DOMContentLoaded", initLanguage);
