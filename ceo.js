document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.quote-section');
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let isScrolling;

  function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionRect = section.getBoundingClientRect();
    const isInView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

    if (isInView) {
      // Detect scroll direction
      const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
      
      // Reset animations
      section.classList.add('reset');
      
      // Remove reset and trigger animation after a short delay
      setTimeout(() => {
        section.classList.remove('reset');
        section.querySelectorAll('.quoteCard').forEach(card => {
          card.classList.add('animate');
        });
      }, 100); // Small delay to ensure reset is applied
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    isScrolling = undefined;
  }

  // Throttle scroll event
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        handleScroll();
      });
    }
  });
});




 const letters = document.querySelectorAll('.animated-text span');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });