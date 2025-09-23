const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

// Toggle mobile menu
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuIcon.querySelector("i").classList.toggle("fa-bars");
  menuIcon.querySelector("i").classList.toggle("fa-times");
});

// ===== Scroll Spy (active link highlight) =====
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => link.classList.remove("active"));
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0.5, // 50% in view = active
  }
);

sections.forEach((section) => observer.observe(section));

// ===== Smooth Scroll FIXED =====
navItems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // Close mobile menu after click
    navLinks.classList.remove("active");
    menuIcon.querySelector("i").classList.add("fa-bars");
    menuIcon.querySelector("i").classList.remove("fa-times");
  });
});
