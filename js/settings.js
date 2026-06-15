import "./i18n.js";

const settingButtons = [...document.querySelectorAll("[data-setting-key]")];

const getStoredSetting = (key) => localStorage.getItem(key) !== "false";

const updateSettingButton = (button, isOn) => {
  button.classList.toggle("is-on", isOn);
  button.setAttribute("aria-pressed", String(isOn));
};

const initSettings = () => {
  settingButtons.forEach((button) => {
    const key = button.dataset.settingKey;
    updateSettingButton(button, getStoredSetting(key));

    button.addEventListener("click", () => {
      const nextValue = !button.classList.contains("is-on");
      localStorage.setItem(key, String(nextValue));
      updateSettingButton(button, nextValue);
    });
  });
};

document.addEventListener("DOMContentLoaded", initSettings);
