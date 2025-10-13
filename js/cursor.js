// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    const corners = document.querySelectorAll('.cursor-corner');
    let activeTarget = null;
  
    // Hide default cursor
    document.body.style.cursor = 'none';
  
    // Add cursor-target class to interactive elements
    const interactiveSelectors = [
      'a',
      'button',
      'input',
      'textarea',
      '.btn',
      '.nav-links li',
      '.menu-icon',
      '.service-card',
      '.portfolio-card',
      '.skill-card',
      '.socials a',
      '.scroll-down a'
    ];
    interactiveSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.classList.add('cursor-target'));
    });
  
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    });
  
    // Mouse over handler for interactive elements
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.cursor-target');
      if (!target || target === activeTarget) return;
  
      activeTarget = target;
  
      // Get target bounds
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      // Move cursor to center of target
      gsap.to(cursor, {
        x: centerX,
        y: centerY,
        duration: 0.3,
        ease: 'power3.out'
      });
  
      // Show and animate corners
      corners.forEach(corner => {
        gsap.to(corner, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
  
      // Position corners around target
      const cornerPositions = [
        { x: -rect.width / 2 - 5, y: -rect.height / 2 - 5 }, // top-left
        { x: rect.width / 2 - 5, y: -rect.height / 2 - 5 },   // top-right
        { x: rect.width / 2 - 5, y: rect.height / 2 - 5 },    // bottom-right
        { x: -rect.width / 2 - 5, y: rect.height / 2 - 5 }    // bottom-left
      ];
  
      corners.forEach((corner, index) => {
        gsap.to(corner, {
          x: cornerPositions[index].x,
          y: cornerPositions[index].y,
          duration: 0.3,
          ease: 'power3.out'
        });
      });
  
      // Hide dot when over target
      gsap.to(dot, { opacity: 0, duration: 0.2 });
  
      // Move cursor with mouse within target
      const moveHandler = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      };
  
      // Leave handler
      const leaveHandler = () => {
        activeTarget = null;
  
        // Hide corners
        corners.forEach(corner => {
          gsap.to(corner, {
            opacity: 0,
            x: 0,
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
  
        // Show dot
        gsap.to(dot, { opacity: 1, duration: 0.2 });
  
        target.removeEventListener('mousemove', moveHandler);
        target.removeEventListener('mouseleave', leaveHandler);
      };
  
      target.addEventListener('mousemove', moveHandler);
      target.addEventListener('mouseleave', leaveHandler);
    });
  
    // Clean up on scroll to prevent stuck cursor
    document.addEventListener('scroll', () => {
      if (activeTarget) {
        corners.forEach(corner => {
          gsap.to(corner, {
            opacity: 0,
            x: 0,
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        activeTarget = null;
      }
    });
  });