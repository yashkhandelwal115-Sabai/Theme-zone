class Wishlist {
  constructor() {
    this.storageKey = 'themezone_wishlist';
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.initButtons();
    this.updateCount();
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateCount();
  }

  add(handle) {
    if (!this.items.includes(handle)) {
      this.items.push(handle);
      this.save();
    }
  }

  remove(handle) {
    this.items = this.items.filter(item => item !== handle);
    this.save();
  }

  toggle(handle, btn) {
    if (this.items.includes(handle)) {
      this.remove(handle);
      btn.classList.remove('is-active');
      if (btn.querySelector('svg')) {
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
    } else {
      this.add(handle);
      btn.classList.add('is-active');
      if (btn.querySelector('svg')) {
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
      }
    }
  }

  updateCount() {
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = this.items.length;
      if (this.items.length > 0) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  }

  initButtons() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      const handle = btn.dataset.productHandle;
      if (this.items.includes(handle)) {
        btn.classList.add('is-active');
        if (btn.querySelector('svg')) {
          btn.querySelector('svg').setAttribute('fill', 'currentColor');
        }
      }
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle(handle, btn);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ThemeZoneWishlist = new Wishlist();
});
