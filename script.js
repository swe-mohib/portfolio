function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const btn = dropdown.querySelector(".project-btn");

  btn.addEventListener("click", () => {
    // Close all dropdowns first
    dropdowns.forEach((d) => {
      if (d !== dropdown) {
        d.classList.remove("show");
        d.querySelector(".project-btn").classList.remove("active");
      }
    });

    // Toggle current one
    dropdown.classList.toggle("show");
    btn.classList.toggle("active");
  });
});

// Optional: Close when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    dropdowns.forEach((d) => {
      d.classList.remove("show");
      d.querySelector(".project-btn").classList.remove("active");
    });
  }
});
