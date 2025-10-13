document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const barsIcon = menuIcon.querySelector(".fa-bars");
  const timesIcon = menuIcon.querySelector(".fa-times");

  if (!menuIcon || !navLinks || !barsIcon || !timesIcon) {
    console.error("Menu elements not found. Check selectors.");
    return;
  }

  menuIcon.addEventListener("click", () => {
    const isExpanded = navLinks.classList.toggle("active");
    barsIcon.style.display = isExpanded ? "none" : "block";
    timesIcon.style.display = isExpanded ? "block" : "none";
    menuIcon.setAttribute("aria-expanded", isExpanded);
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      barsIcon.style.display = "block";
      timesIcon.style.display = "none";
      menuIcon.setAttribute("aria-expanded", "false");
    }
  });

  // Scroll Spy
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
      threshold: 0.3,
      rootMargin: "-100px 0px 0px 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));

  // Smooth Scroll
  navItems.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      navLinks.classList.remove("active");
      barsIcon.style.display = "block";
      timesIcon.style.display = "none";
      menuIcon.setAttribute("aria-expanded", "false");
    });
  });
});