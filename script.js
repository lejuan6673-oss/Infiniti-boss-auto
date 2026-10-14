const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const header = document.querySelector(".site-header");
const year = document.querySelector("[data-current-year]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function closeNavigation() {
  if (!menuToggle || !primaryNavigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNavigation.classList.remove("is-open");
}

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNavigation.classList.toggle("is-open", !isOpen);
  });

  primaryNavigation.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.addEventListener("click", (event) => {
    if (!primaryNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
      closeNavigation();
    }
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
