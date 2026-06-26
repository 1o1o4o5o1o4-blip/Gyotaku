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
    if (!timezone || this.clocks.has(timezone)) return;
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
      container.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><p>No timezones added</p></div>';
      return;
    }

    container.innerHTML = Array.from(this.clocks.entries())
      .map(([timezone, name]) => this.createClockCard(timezone, name))
      .join('');

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.removeClock(e.target.dataset.timezone));
    });
  }

  createClockCard(timezone, name) {
    const clock = new DigitalClock(timezone);
    clock.is24h = this.settings.is24h;
    clock.showSeconds = this.settings.showSeconds;
    clock.showDate = this.settings.showDate;
    const timeString = clock.getFormattedTime();
    const dateString = clock.getFormattedDate();
    const offset = clock.getUTCOffset();

    return `
      <div class="clock-card">
        <div class="clock-card-header">
          <div class="timezone-name">${name}</div>
          <button class="remove-btn" data-timezone="${timezone}">×</button>
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
    }
  }

  saveClocks() {
    localStorage.setItem('clocks', JSON.stringify(Array.from(this.clocks.entries())));
  }

  loadClocks() {
    const saved = localStorage.getItem('clocks');
    if (saved) {
      try {
        this.clocks = new Map(JSON.parse(saved));
      } catch (e) {
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

document.addEventListener('DOMContentLoaded', () => new ClockApp());