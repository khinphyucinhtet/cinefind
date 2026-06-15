const redirectToHome = () => {
  window.setTimeout(() => {
    window.location.href = "home.html";
  }, 4000);
};

document.addEventListener("DOMContentLoaded", redirectToHome);
