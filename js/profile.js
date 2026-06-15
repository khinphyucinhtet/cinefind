import { t } from "./i18n.js";

const profileKeys = {
  name: "cinefind_profile_name",
  email: "cinefind_profile_email",
  image: "cinefind_profile_image",
};

const profileElements = {
  form: document.querySelector("[data-profile-form]"),
  nameInput: document.querySelector("[data-profile-name]"),
  emailInput: document.querySelector("[data-profile-email]"),
  avatarImage: document.querySelector("[data-avatar-image]"),
  avatarPlaceholder: document.querySelector("[data-avatar-placeholder]"),
  avatarInput: document.querySelector("[data-avatar-input]"),
  editAvatarButton: document.querySelector("[data-edit-avatar]"),
  resetButton: document.querySelector("[data-reset-profile]"),
  successMessage: document.querySelector("[data-profile-success]"),
  successText: document.querySelector("[data-profile-success-text]"),
  errorMessage: document.querySelector("[data-profile-error]"),
};

const toggleAvatarDisplay = (imageValue = "") => {
  const hasImage = Boolean(imageValue);
  profileElements.avatarImage.hidden = !hasImage;
  profileElements.avatarPlaceholder.hidden = hasImage;

  if (hasImage) {
    profileElements.avatarImage.src = imageValue;
  } else {
    profileElements.avatarImage.removeAttribute("src");
  }
};

const showMessage = (type, text = "") => {
  const isSuccess = type === "success";
  profileElements.successMessage.classList.toggle("is-visible", isSuccess);
  profileElements.errorMessage.classList.toggle("is-visible", !isSuccess && Boolean(text));

  if (!isSuccess) {
    profileElements.errorMessage.textContent = text;
    return;
  }

  profileElements.successText.textContent = text || t("profileSaved");
};

const loadSavedProfile = () => {
  const savedName = localStorage.getItem(profileKeys.name) || "";
  const savedEmail = localStorage.getItem(profileKeys.email) || "";
  const savedImage = localStorage.getItem(profileKeys.image) || "";

  profileElements.nameInput.value = savedName;
  profileElements.emailInput.value = savedEmail;
  toggleAvatarDisplay(savedImage);
};

const validateProfile = (name, email) => {
  if (!name.trim()) {
    return t("nameRequired");
  }

  if (!email.includes("@") || !email.includes(".")) {
    return t("invalidEmail");
  }

  return "";
};

const handleProfileSubmit = (event) => {
  event.preventDefault();

  const name = profileElements.nameInput.value.trim();
  const email = profileElements.emailInput.value.trim();
  const validationMessage = validateProfile(name, email);

  if (validationMessage) {
    showMessage("error", validationMessage);
    return;
  }

  localStorage.setItem(profileKeys.name, name);
  localStorage.setItem(profileKeys.email, email);

  showMessage("success", t("profileSaved"));
};

const handleAvatarSelect = (event) => {
  const [file] = event.target.files || [];

  if (!file) {
    return;
  }

  // FileReader converts the uploaded image to Base64 so it can be saved locally.
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const result = typeof reader.result === "string" ? reader.result : "";
    localStorage.setItem(profileKeys.image, result);
    toggleAvatarDisplay(result);
    showMessage("success", t("profileSaved"));
  });

  reader.readAsDataURL(file);
};

const resetProfile = () => {
  localStorage.removeItem(profileKeys.name);
  localStorage.removeItem(profileKeys.email);
  localStorage.removeItem(profileKeys.image);

  profileElements.form.reset();
  profileElements.avatarInput.value = "";
  toggleAvatarDisplay("");
  showMessage("success", t("profileReset"));
};

const initProfile = () => {
  loadSavedProfile();

  profileElements.form.addEventListener("submit", handleProfileSubmit);
  profileElements.avatarInput.addEventListener("change", handleAvatarSelect);
  profileElements.editAvatarButton.addEventListener("click", () => profileElements.avatarInput.click());
  profileElements.resetButton.addEventListener("click", resetProfile);
};

document.addEventListener("DOMContentLoaded", initProfile);
