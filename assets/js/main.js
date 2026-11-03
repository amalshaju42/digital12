/**
 * Main JavaScript for Amal Shaju Portfolio
 * Freelance Digital Marketer | Kannur, Kerala
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky Navbar Effect on Scroll
  const navbar = document.getElementById('main-nav');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('shadow-xl', 'bg-opacity-95');
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      navbar?.classList.remove('shadow-xl', 'bg-opacity-95');
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Highlight active nav item on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-indigo-400', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-indigo-400', 'font-semibold');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // Portfolio / Case Studies Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active styling
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'border-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });

  // Contact Form & WhatsApp Integration
  const contactForm = document.getElementById('lead-contact-form');
  const formSuccess = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const phone = document.getElementById('form-phone')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const service = document.getElementById('form-service')?.value;
      const budget = document.getElementById('form-budget')?.value;
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number so Amal can reach you.');
        return;
      }

      // Format WhatsApp message
      const myPhoneNumber = "918138801271"; // Amal Shaju WhatsApp format
      const waText = `Hi Amal, I'm reaching out through your portfolio website:%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `✉️ *Email:* ${encodeURIComponent(email || 'Not provided')}%0A` +
        `🎯 *Service Interested:* ${encodeURIComponent(service || 'General Consultation')}%0A` +
        `💰 *Estimated Budget:* ${encodeURIComponent(budget || 'To discuss')}%0A` +
        `💬 *Message:* ${encodeURIComponent(message || 'I would like to discuss digital marketing strategies for my business.')}`;

      // Show instant success banner
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 8000);
      }

      // Prompt to open WhatsApp directly for immediate response
      const openWhatsApp = confirm("Thank you! Would you like to send this inquiry directly to Amal Shaju's WhatsApp for an instant reply?");
      if (openWhatsApp) {
        window.open(`https://wa.me/${myPhoneNumber}?text=${waText}`, '_blank');
      }
    });
  }
});

