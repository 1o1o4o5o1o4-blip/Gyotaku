# 🕐 Digital Clock with Multiple Timezones

A beautiful, responsive web application that displays the current time in different timezones around the world.

## Features

✨ **Multiple Timezone Support**
- Display clocks for any timezone worldwide
- 40+ pre-configured timezones
- Easy timezone selection and management

🎨 **Customizable Display**
- Toggle between 12-hour and 24-hour format
- Show/hide seconds
- Show/hide date information
- Switch between digital and analog clocks

💾 **Local Storage**
- Automatically save your timezone preferences
- Persistent settings across sessions
- Reset to default timezones anytime

📱 **Responsive Design**
- Works seamlessly on desktop, tablet, and mobile
- Beautiful gradient background
- Smooth animations and transitions

📍 **Location Information**
- Display UTC offset for each timezone
- Show current date in each timezone
- Real-time updates (refreshes 2x per second)

## Usage

### 1. Add a Timezone
- Select a timezone from the dropdown menu
- Click the "+ Add" button
- The clock will appear immediately

### 2. Remove a Timezone
- Click the "✕" button on any clock card to remove it

### 3. Customize Settings
- **24-Hour Format**: Toggle between 24h and 12h display
- **Show Seconds**: Display/hide seconds in time
- **Show Date**: Display/hide the date
- **Analog Clock**: Switch between digital and analog display

### 4. Reset to Default
- Click "Reset to Default" to restore the original timezone selection

## Supported Timezones

### Americas
- Pacific (PST/PDT)
- Mountain (MST/MDT)
- Central (CST/CDT)
- Eastern (EST/EDT)
- Atlantic
- São Paulo
- Argentina

### Europe
- London
- Dublin
- Paris
- Berlin
- Amsterdam
- Rome
- Madrid
- Stockholm
- Istanbul
- Moscow

### Africa
- Cairo
- Lagos
- Johannesburg
- Nairobi

### Asia
- Dubai
- New Delhi
- Bangkok
- Singapore
- Hong Kong
- Shanghai
- Tokyo
- Seoul
- Manila
- Jakarta
- Kolkata

### Oceania
- Sydney
- Melbourne
- Brisbane
- Perth
- Auckland
- Fiji

## Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No dependencies
- **LocalStorage API** - Data persistence
- **Intl API** - Timezone handling

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lightweight (single update loop)
- No external dependencies
- Efficient DOM updates
- Smooth 60fps animations

## Installation

1. Clone or download the files
2. Open `index.html` in your browser
3. No server or build process required!

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `timezones.js` - Timezone configuration
- `clock.js` - Clock calculation logic
- `app.js` - Main application controller
- `README.md` - This file

## Features in Action

### Analog Clock
- Hour, minute, and second hands
- Color-coded hands
- Real-time synchronization

### Digital Display
- Monospace font for clarity
- Large, easy-to-read numbers
- Smooth real-time updates

### Responsive Layout
- Auto-adjusting grid layout
- Mobile-friendly touch targets
- Adaptive font sizes

## Customization

### Add Custom Timezones
Edit `timezones.js` and add entries to the `TIMEZONES` array:

```javascript
{ name: 'My City', value: 'Asia/Bangkok' }
```

### Change Default Timezones
Modify the `DEFAULT_TIMEZONES` array in `timezones.js`

### Customize Colors
Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #4d97ff;
  --secondary-color: #52e78c;
  /* ... */
}
```

## License

MIT License - Feel free to use and modify!

## Contributing

Found a bug or want to suggest a feature? Open an issue or submit a pull request!

---

**Created with ❤️ for timezone enthusiasts worldwide** 🌍🌎🌏
