class DigitalClock {
  constructor(timezone) {
    this.timezone = timezone;
    this.is24h = true;
    this.showSeconds = true;
    this.showDate = true;
    this.isAnalog = false;
  }

  getTime() {
    const now = new Date();

    if (this.timezone === 'Local') {
      return now;
    }

    if (this.timezone === 'UTC') {
      return new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    }

    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: this.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const parts = formatter.formatToParts(now);
      const values = {};
      parts.forEach(part => {
        if (part.type !== 'literal') {
          values[part.type] = part.value;
        }
      });

      const year = parseInt(values.year);
      const month = parseInt(values.month) - 1;
      const day = parseInt(values.day);
      const hour = parseInt(values.hour);
      const minute = parseInt(values.minute);
      const second = parseInt(values.second);

      return new Date(year, month, day, hour, minute, second);
    } catch (e) {
      console.error(`Invalid timezone: ${this.timezone}`, e);
      return now;
    }
  }

  getFormattedTime() {
    const date = this.getTime();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    let timeString = '';

    if (this.is24h) {
      hours = String(hours).padStart(2, '0');
      timeString = `${hours}:${minutes}`;
    } else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = String((hours % 12) || 12).padStart(2, '0');
      timeString = `${hours}:${minutes} ${ampm}`;
    }

    if (this.showSeconds) {
      timeString += `:${seconds}`;
    }

    return timeString;
  }

  getFormattedDate() {
    const date = this.getTime();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  getUTCOffset() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: this.timezone === 'Local' ? undefined : this.timezone,
      timeZoneName: 'longOffset',
    });

    const parts = formatter.formatToParts(now);
    const offset = parts.find(p => p.type === 'timeZoneName')?.value || '';

    return offset;
  }

  getAnalogClockAngles() {
    const date = this.getTime();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
      hour: ((hours % 12) / 12 * 360) + (minutes / 60 * 30),
      minute: (minutes / 60 * 360) + (seconds / 60 * 6),
      second: (seconds / 60 * 360),
    };
  }
}
