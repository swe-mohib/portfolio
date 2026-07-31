const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) root.dataset.theme = savedTheme;

document.querySelectorAll("[data-theme]").forEach((button) => {
  button.addEventListener("click", () => {
    const { theme } = button.dataset;
    const menu = button.closest("details");

    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }

    menu.open = false;
  });
});

document.querySelectorAll(".carousel").forEach((carousel) => {
  const dots = [...carousel.nextElementSibling.querySelectorAll("button")];
  const slides = [...carousel.querySelectorAll("img")];
  const desktop = window.matchMedia("(min-width: 701px)");
  let activeIndex = 0;
  let timer;

  const setActive = (index) => {
    activeIndex = index;
    dots.forEach((dot, dotIndex) => dot.toggleAttribute("aria-current", dotIndex === index));
    slides.forEach((slide, slideIndex) => slide.toggleAttribute("data-active", slideIndex === index));
  };
  const showSlide = (index) => {
    setActive(index);
    if (!desktop.matches) carousel.scrollTo({ left: index * carousel.clientWidth, behavior: "smooth" });
  };

  carousel.dataset.ready = "";
  showSlide(0);
  carousel.addEventListener("scroll", () => {
    if (!desktop.matches) setActive(Math.round(carousel.scrollLeft / carousel.clientWidth));
  }, { passive: true });
  carousel.addEventListener("mouseenter", () => {
    if (desktop.matches) timer = setInterval(() => showSlide((activeIndex + 1) % slides.length), 2000);
  });
  carousel.addEventListener("mouseleave", () => clearInterval(timer));
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
});
