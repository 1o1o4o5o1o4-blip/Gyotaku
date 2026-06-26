// Comprehensive list of timezones
const TIMEZONES = [
  { name: 'Local', value: 'Local' },
  { name: '--- UTC ---', value: '', disabled: true },
  { name: 'UTC', value: 'UTC' },
  { name: 'UTC+1', value: 'Europe/London' },
  { name: 'UTC+2', value: 'Europe/Paris' },
  
  { name: '--- Americas ---', value: '', disabled: true },
  { name: 'Pacific (PST/PDT)', value: 'America/Los_Angeles' },
  { name: 'Mountain (MST/MDT)', value: 'America/Denver' },
  { name: 'Central (CST/CDT)', value: 'America/Chicago' },
  { name: 'Eastern (EST/EDT)', value: 'America/New_York' },
  { name: 'Atlantic', value: 'America/Halifax' },
  { name: 'São Paulo', value: 'America/Sao_Paulo' },
  { name: 'Argentina', value: 'America/Argentina/Buenos_Aires' },
  
  { name: '--- Europe ---', value: '', disabled: true },
  { name: 'London', value: 'Europe/London' },
  { name: 'Dublin', value: 'Europe/Dublin' },
  { name: 'Paris', value: 'Europe/Paris' },
  { name: 'Berlin', value: 'Europe/Berlin' },
  { name: 'Amsterdam', value: 'Europe/Amsterdam' },
  { name: 'Rome', value: 'Europe/Rome' },
  { name: 'Madrid', value: 'Europe/Madrid' },
  { name: 'Stockholm', value: 'Europe/Stockholm' },
  { name: 'Istanbul', value: 'Europe/Istanbul' },
  { name: 'Moscow', value: 'Europe/Moscow' },
  
  { name: '--- Africa ---', value: '', disabled: true },
  { name: 'Cairo', value: 'Africa/Cairo' },
  { name: 'Lagos', value: 'Africa/Lagos' },
  { name: 'Johannesburg', value: 'Africa/Johannesburg' },
  { name: 'Nairobi', value: 'Africa/Nairobi' },
  
  { name: '--- Asia ---', value: '', disabled: true },
  { name: 'Dubai', value: 'Asia/Dubai' },
  { name: 'New Delhi', value: 'Asia/Kolkata' },
  { name: 'Bangkok', value: 'Asia/Bangkok' },
  { name: 'Singapore', value: 'Asia/Singapore' },
  { name: 'Hong Kong', value: 'Asia/Hong_Kong' },
  { name: 'Shanghai', value: 'Asia/Shanghai' },
  { name: 'Tokyo', value: 'Asia/Tokyo' },
  { name: 'Seoul', value: 'Asia/Seoul' },
  { name: 'Manila', value: 'Asia/Manila' },
  { name: 'Jakarta', value: 'Asia/Jakarta' },
  { name: 'Kolkata', value: 'Asia/Kolkata' },
  
  { name: '--- Oceania ---', value: '', disabled: true },
  { name: 'Sydney', value: 'Australia/Sydney' },
  { name: 'Melbourne', value: 'Australia/Melbourne' },
  { name: 'Brisbane', value: 'Australia/Brisbane' },
  { name: 'Perth', value: 'Australia/Perth' },
  { name: 'Auckland', value: 'Pacific/Auckland' },
  { name: 'Fiji', value: 'Pacific/Fiji' },
];

// Default timezones to display
const DEFAULT_TIMEZONES = [
  'Local',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
];
