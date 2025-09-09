// Add "window-scroll" class to <nav> when scrolling (with debounce)
const debounce = (func, wait = 20) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

window.addEventListener(
  "scroll",
  debounce(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.classList.toggle("window-scroll", window.scrollY > 0);
    }
  })
);

// Handle FAQ toggle functionality
document.querySelectorAll(".faq").forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");
    const icon = faq.querySelector(".faq__icon i");
    if (icon) {
      icon.className = icon.className.includes("uil-plus")
        ? "uil uil-minus"
        : "uil uil-plus";
    }
  });
});

// Navigation menu toggle functionality
const menu = document.querySelector(".nav__menu");
const menuBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

// Function to close the navigation menu
const closeNav = () => {
  if (menu) menu.style.display = "none";
  if (closeBtn) closeBtn.style.display = "none";
  if (menuBtn) menuBtn.style.display = "inline-block";
};

// Open menu when the menu button is clicked
menuBtn?.addEventListener("click", () => {
  if (menu) menu.style.display = "flex";
  if (closeBtn) closeBtn.style.display = "inline-block";
  if (menuBtn) menuBtn.style.display = "none";
});

// Close menu when the close button is clicked
closeBtn?.addEventListener("click", closeNav);

// Close menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (
    menu &&
    menuBtn &&
    !menu.contains(event.target) &&
    !menuBtn.contains(event.target) &&
    closeBtn?.style.display === "inline-block" // Ensure menu is open before trying to close it
  ) {
    closeNav();
  }
});
