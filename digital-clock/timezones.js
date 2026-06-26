const TIMEZONES = [
  { name: 'Local', value: 'Local' },
  { name: '--- UTC ---', value: '', disabled: true },
  { name: 'UTC', value: 'UTC' },
  
  { name: '--- Americas ---', value: '', disabled: true },
  { name: 'Pacific (PST/PDT)', value: 'America/Los_Angeles' },
  { name: 'Mountain (MST/MDT)', value: 'America/Denver' },
  { name: 'Central (CST/CDT)', value: 'America/Chicago' },
  { name: 'Eastern (EST/EDT)', value: 'America/New_York' },
  { name: 'Atlantic', value: 'America/Halifax' },
  { name: 'São Paulo', value: 'America/Sao_Paulo' },
  
  { name: '--- Europe ---', value: '', disabled: true },
  { name: 'London', value: 'Europe/London' },
  { name: 'Paris', value: 'Europe/Paris' },
  { name: 'Berlin', value: 'Europe/Berlin' },
  { name: 'Moscow', value: 'Europe/Moscow' },
  
  { name: '--- Asia ---', value: '', disabled: true },
  { name: 'Dubai', value: 'Asia/Dubai' },
  { name: 'New Delhi', value: 'Asia/Kolkata' },
  { name: 'Bangkok', value: 'Asia/Bangkok' },
  { name: 'Tokyo', value: 'Asia/Tokyo' },
  { name: 'Sydney', value: 'Australia/Sydney' },
];

const DEFAULT_TIMEZONES = [
  'Local',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
];