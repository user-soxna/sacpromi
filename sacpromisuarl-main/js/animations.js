// Animations JavaScript file for SACPROMI website

// Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve after animation to improve performance
      fadeInObserver.unobserve(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.1,  // Trigger when at least 10% of the item is visible
  rootMargin: '0px 0px -50px 0px'  // Trigger a bit before the element enters the viewport
});

// Observe all elements with fade-in classes
document.addEventListener('DOMContentLoaded', () => {
  // Get all elements with animation classes
  const fadeElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
  
  // Observe each element
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
  
  // Add floating animation to specific elements
  const floatElements = document.querySelectorAll('.about-stats i, .social-icon i');
  floatElements.forEach(element => {
    element.classList.add('float');
  });
  
  // Add pulse animation to CTA buttons
  const ctaButtons = document.querySelectorAll('.hero-buttons .btn-primary');
  ctaButtons.forEach(button => {
    button.classList.add('pulse');
  });
  
  // Animate the logo with color change on hover
  const logo = document.querySelector('.logo h1');
  logo.addEventListener('mouseenter', () => {
    logo.classList.add('animate-logo');
  });
  
  logo.addEventListener('mouseleave', () => {
    logo.classList.remove('animate-logo');
  });
  
  // Parallax effect for hero section
  const heroSection = document.getElementById('hero');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Apply parallax effect to hero background
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
  });
  
  // Add number counter animation for stats
  animateNumbers();
});

// Function to animate numbers in statistics
function animateNumbers() {
  // This would be implemented when we have actual statistics with numbers
  // For example:
  /*
  const numberElements = document.querySelectorAll('.stat-number');
  
  numberElements.forEach(element => {
    const finalNumber = parseInt(element.getAttribute('data-number'));
    const duration = 2000; // Animation duration in milliseconds
    const startTime = Date.now();
    
    const updateNumber = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        const percentage = elapsedTime / duration;
        const currentNumber = Math.floor(percentage * finalNumber);
        element.textContent = currentNumber;
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = finalNumber;
      }
    };
    
    updateNumber();
  });
  */
}

// Product card hover animations - Using productCards from main.js
productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Add more hover animations if needed
    card.querySelector('.product-info').classList.add('scale-in', 'visible');
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate header height for accurate scrolling
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// More sophisticated animations for specific elements
const enhanceElementAnimations = () => {
  // Title animations
  const sectionTitles = document.querySelectorAll('.section-header h2');
  
  sectionTitles.forEach(title => {
    title.innerHTML = title.textContent.split('').map(char => {
      if (char === ' ') {
        return ' ';
      }
      return `<span>${char}</span>`;
    }).join('');
    
    const titleSpans = title.querySelectorAll('span');
    
    titleSpans.forEach((span, index) => {
      span.style.display = 'inline-block';
      span.style.transition = 'transform 0.5s ease';
      span.style.transitionDelay = `${index * 0.05}s`;
      
      title.addEventListener('mouseenter', () => {
        span.style.transform = 'translateY(-10px)';
      });
      
      title.addEventListener('mouseleave', () => {
        span.style.transform = 'translateY(0)';
      });
    });
  });
  
  // Button hover animations
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-5px)';
      button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
};

// Initialize enhanced animations after page loads
window.addEventListener('load', enhanceElementAnimations);