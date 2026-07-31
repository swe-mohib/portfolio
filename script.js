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
