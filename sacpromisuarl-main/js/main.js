// Main JavaScript file for SACPROMI website

// DOM Elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const backToTop = document.querySelector('.back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Change header background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
  
  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Product filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(filterBtn => {
      filterBtn.classList.remove('active');
    });
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    // Filter products
    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Testimonial slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentTestimonial = 0;

// Show testimonial based on index
function showTestimonial(index) {
  testimonialCards.forEach(card => {
    card.classList.remove('active');
  });
  
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  testimonialCards[index].classList.add('active');
  dots[index].classList.add('active');
}

// Next testimonial
nextBtn.addEventListener('click', () => {
  currentTestimonial++;
  if (currentTestimonial >= testimonialCards.length) {
    currentTestimonial = 0;
  }
  showTestimonial(currentTestimonial);
});

// Previous testimonial
prevBtn.addEventListener('click', () => {
  currentTestimonial--;
  if (currentTestimonial < 0) {
    currentTestimonial = testimonialCards.length - 1;
  }
  showTestimonial(currentTestimonial);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto slide testimonials
let testimonialInterval = setInterval(() => {
  currentTestimonial++;
  if (currentTestimonial >= testimonialCards.length) {
    currentTestimonial = 0;
  }
  showTestimonial(currentTestimonial);
}, 5000);

// Stop auto slide on user interaction
const testimonialControls = document.querySelector('.testimonial-controls');
testimonialControls.addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

testimonialControls.addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(() => {
    currentTestimonial++;
    if (currentTestimonial >= testimonialCards.length) {
      currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
  }, 5000);
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Here you would typically send this data to a server
  // For demo purposes, we'll just log it and show a success message
  console.log('Form submitted:', { name, email, subject, message });
  
  // Reset form
  contactForm.reset();
  
  // Show success message (you would implement this)
  alert('Merci pour votre message! Nous vous contacterons bientôt.');
});

// Newsletter form submission
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = newsletterForm.querySelector('input').value;
  
  // Here you would typically send this to a server
  console.log('Newsletter signup:', email);
  
  // Reset form
  newsletterForm.reset();
  
  // Show success message
  alert('Merci de vous être inscrit à notre newsletter!');
});

// Initialize the page
window.addEventListener('load', () => {
  // Show first testimonial
  showTestimonial(0);
  
  // Update active nav link on page load
  updateActiveNavLink();
});