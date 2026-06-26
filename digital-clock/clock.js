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
    if (this.timezone === 'Local') return now;
    if (this.timezone === 'UTC') return new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
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
        if (part.type !== 'literal') values[part.type] = part.value;
      });

      return new Date(parseInt(values.year), parseInt(values.month) - 1, parseInt(values.day), parseInt(values.hour), parseInt(values.minute), parseInt(values.second));
    } catch (e) {
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

    if (this.showSeconds) timeString += `:${seconds}`;
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
    return parts.find(p => p.type === 'timeZoneName')?.value || '';
  }
}