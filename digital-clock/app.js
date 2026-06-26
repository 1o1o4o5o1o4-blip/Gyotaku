class ClockApp {
  constructor() {
    this.clocks = new Map();
    this.settings = {
      is24h: true,
      showSeconds: true,
      showDate: true,
      isAnalog: false,
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.populateTimezoneSelect();
    this.loadSettings();
    this.loadClocks();
    this.startUpdateLoop();
  }

  setupEventListeners() {
    document.getElementById('addBtn').addEventListener('click', () => this.addClock());
    document.getElementById('resetBtn').addEventListener('click', () => this.resetToDefault());
    document.getElementById('format24h').addEventListener('change', (e) => {
      this.settings.is24h = e.target.checked;
      this.saveSettings();
      this.update();
    });
    document.getElementById('showSeconds').addEventListener('change', (e) => {
      this.settings.showSeconds = e.target.checked;
      this.saveSettings();
      this.update();
    });
    document.getElementById('showDate').addEventListener('change', (e) => {
      this.settings.showDate = e.target.checked;
      this.saveSettings();
      this.update();
    });
    document.getElementById('analogClock').addEventListener('change', (e) => {
      this.settings.isAnalog = e.target.checked;
      this.saveSettings();
      this.update();
    });
  }

  populateTimezoneSelect() {
    const select = document.getElementById('timezoneSelect');
    TIMEZONES.forEach(tz => {
      const option = document.createElement('option');
      option.value = tz.value;
      option.textContent = tz.name;
      if (tz.disabled) {
        option.disabled = true;
        option.style.fontWeight = 'bold';
      }
      select.appendChild(option);
    });
  }

  addClock() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;

    if (!timezone) {
      alert('Please select a timezone');
      return;
    }

    if (this.clocks.has(timezone)) {
      alert('This timezone is already added');
      return;
    }

    const tzName = TIMEZONES.find(tz => tz.value === timezone)?.name || timezone;
    this.clocks.set(timezone, tzName);
    this.saveClocks();
    this.update();
    select.value = '';
  }

  removeClock(timezone) {
    this.clocks.delete(timezone);
    this.saveClocks();
    this.update();
  }

  resetToDefault() {
    if (!confirm('Are you sure you want to reset to default timezones?')) {
      return;
    }
    this.clocks.clear();
    DEFAULT_TIMEZONES.forEach(tz => {
      const tzName = TIMEZONES.find(t => t.value === tz)?.name || tz;
      this.clocks.set(tz, tzName);
    });
    this.saveClocks();
    this.update();
  }

  update() {
    this.renderClocks();
  }

  renderClocks() {
    const container = document.getElementById('clocksContainer');

    if (this.clocks.size === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🕐</div>
          <p>No timezones added yet</p>
          <p style="font-size: 0.9rem;">Select a timezone from the dropdown and click "+ Add"</p>
        </div>
      `;
      return;
    }

    container.innerHTML = Array.from(this.clocks.entries())
      .map(([timezone, name]) => this.createClockCard(timezone, name))
      .join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const timezone = e.target.dataset.timezone;
        this.removeClock(timezone);
      });
    });
  }

  createClockCard(timezone, name) {
    const clock = new DigitalClock(timezone);
    clock.is24h = this.settings.is24h;
    clock.showSeconds = this.settings.showSeconds;
    clock.showDate = this.settings.showDate;
    clock.isAnalog = this.settings.isAnalog;

    const timeString = clock.getFormattedTime();
    const dateString = clock.getFormattedDate();
    const offset = clock.getUTCOffset();

    if (this.settings.isAnalog) {
      const angles = clock.getAnalogClockAngles();
      return `
        <div class="clock-card" data-timezone="${timezone}">
          <div class="clock-card-header">
            <div class="timezone-name">${name}</div>
            <button class="remove-btn" data-timezone="${timezone}" title="Remove">
              ✕
            </button>
          </div>
          <div class="analog-clock">
            <div class="clock-number">
              <span style="transform: rotate(0deg) translateY(-75px);">12</span>
              <span style="transform: rotate(90deg) translateY(-75px);">3</span>
              <span style="transform: rotate(180deg) translateY(-75px);">6</span>
              <span style="transform: rotate(270deg) translateY(-75px);">9</span>
            </div>
            <div class="hand hour-hand" style="transform: rotate(${angles.hour}deg);"></div>
            <div class="hand minute-hand" style="transform: rotate(${angles.minute}deg);"></div>
            <div class="hand second-hand" style="transform: rotate(${angles.second}deg);"></div>
          </div>
          <div class="digital-clock">${timeString}</div>
          ${this.settings.showDate ? `<div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 8px;">${dateString}</div>` : ''}
          <div class="clock-info">
            <div class="info-item">
              <div class="info-label">UTC Offset</div>
              <div class="info-value">${offset}</div>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="clock-card" data-timezone="${timezone}">
          <div class="clock-card-header">
            <div class="timezone-name">${name}</div>
            <button class="remove-btn" data-timezone="${timezone}" title="Remove">
              ✕
            </button>
          </div>
          <div class="digital-clock">${timeString}</div>
          ${this.settings.showDate ? `<div style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 12px;">${dateString}</div>` : ''}
          <div class="clock-info">
            <div class="info-item">
              <div class="info-label">UTC Offset</div>
              <div class="info-value">${offset}</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  startUpdateLoop() {
    setInterval(() => this.update(), 500);
  }

  saveSettings() {
    localStorage.setItem('clockSettings', JSON.stringify(this.settings));
  }

  loadSettings() {
    const saved = localStorage.getItem('clockSettings');
    if (saved) {
      this.settings = JSON.parse(saved);
      document.getElementById('format24h').checked = this.settings.is24h;
      document.getElementById('showSeconds').checked = this.settings.showSeconds;
      document.getElementById('showDate').checked = this.settings.showDate;
      document.getElementById('analogClock').checked = this.settings.isAnalog;
    }
  }

  saveClocks() {
    const data = Array.from(this.clocks.entries());
    localStorage.setItem('clocks', JSON.stringify(data));
  }

  loadClocks() {
    const saved = localStorage.getItem('clocks');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        this.clocks = new Map(data);
      } catch (e) {
        console.error('Failed to load clocks', e);
        this.setDefaultClocks();
      }
    } else {
      this.setDefaultClocks();
    }
    this.update();
  }

  setDefaultClocks() {
    DEFAULT_TIMEZONES.forEach(tz => {
      const tzName = TIMEZONES.find(t => t.value === tz)?.name || tz;
      this.clocks.set(tz, tzName);
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ClockApp();
});
