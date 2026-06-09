class Compare {
  constructor() {
    this.storageKey = 'themezone_compare';
    this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    this.maxItems = 4;
    this.initButtons();
    this.updateCount();
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateCount();
  }

  add(handle) {
    if (!this.items.includes(handle)) {
      if (this.items.length >= this.maxItems) {
        alert('You can only compare up to 4 products.');
        return false;
      }
      this.items.push(handle);
      this.save();
      return true;
    }
    return true;
  }

  remove(handle) {
    this.items = this.items.filter(item => item !== handle);
    this.save();
  }

  toggle(handle, btn) {
    if (this.items.includes(handle)) {
      this.remove(handle);
      btn.classList.remove('is-active');
    } else {
      if(this.add(handle)) {
        btn.classList.add('is-active');
      }
    }
  }

  updateCount() {
    document.querySelectorAll('.compare-count').forEach(el => {
      el.textContent = this.items.length;
      if (this.items.length > 0) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  }

  initButtons() {
    document.querySelectorAll('[data-compare-btn]').forEach(btn => {
      const handle = btn.dataset.productHandle;
      if (this.items.includes(handle)) {
        btn.classList.add('is-active');
      }
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle(handle, btn);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ThemeZoneCompare = new Compare();
});
