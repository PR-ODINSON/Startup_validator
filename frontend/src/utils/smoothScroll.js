// Ultra-smooth scrolling utility with custom easing
export const smoothScrollTo = (targetId, duration = 1000, offset = 100) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const startPosition = window.pageYOffset;
  const targetPosition = target.offsetTop - offset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function for ultra-smooth animation
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Enhanced smooth scroll for anchor links
export const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  smoothScrollTo(targetId.replace('#', ''), 800, 100);
};

// Auto-detect and enhance all anchor links
export const initSmoothScrolling = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        handleSmoothScroll(e, targetId);
      }
    });
  });
};

// Smooth scroll to top
export const scrollToTop = (duration = 600) => {
  const startPosition = window.pageYOffset;
  let startTime = null;

  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    
    window.scrollTo(0, startPosition * (1 - easedProgress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
}; 