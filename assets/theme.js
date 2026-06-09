/* ThemeZone Core JS */

class ThemeCore {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initAccordions();
    this.initQuantitySelectors();
  }

  initMobileMenu() {
    const menuToggle = document.querySelector('.js-mobile-menu-toggle');
    const mobileMenu = document.querySelector('.js-mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('is-open');
        document.body.classList.toggle('overflow-hidden');
      });
    }
  }

  initAccordions() {
    const accordions = document.querySelectorAll('.js-accordion');
    accordions.forEach(accordion => {
      const header = accordion.querySelector('.js-accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = accordion.classList.contains('is-open');
          // Close all others
          accordions.forEach(acc => {
            acc.classList.remove('is-open');
            const h = acc.querySelector('.js-accordion-header');
            if (h) h.setAttribute('aria-expanded', 'false');
          });
          
          if (!isOpen) {
            accordion.classList.add('is-open');
            header.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  initQuantitySelectors() {
    const selectors = document.querySelectorAll('.js-quantity-selector');
    selectors.forEach(selector => {
      const input = selector.querySelector('input');
      const minus = selector.querySelector('.js-qty-minus');
      const plus = selector.querySelector('.js-qty-plus');

      if (input && minus && plus) {
        minus.addEventListener('click', () => {
          let val = parseInt(input.value);
          if (val > 1) {
            input.value = val - 1;
            input.dispatchEvent(new Event('change'));
          }
        });
        plus.addEventListener('click', () => {
          let val = parseInt(input.value);
          input.value = val + 1;
          input.dispatchEvent(new Event('change'));
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeCore = new ThemeCore();
});
