# Deployment Guide - Event Check-In App

## 🚀 Option 1: Deploy to Vercel (Fastest - 5 minutes)

### Prerequisites
- GitHub account (free)
- Vercel account (free)

### Step-by-Step

1. **Create GitHub Repository**
   ```bash
   # Create a new folder
   mkdir event-checkin
   cd event-checkin
   
   # Initialize git
   git init
   
   # Create package.json (copy from package.json file provided)
   # Create public/index.html
   # Create src/App.js
   # Create src/EventCheckInApp.jsx (copy from provided file)
   
   # Add all files
   git add .
   git commit -m "Initial commit"
   
   # Create new repo on GitHub and push
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/event-checkin.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Select your "event-checkin" repository
   - Click "Import"
   - Vercel auto-detects React app
   - Click "Deploy"
   - **Done!** Your app is live at `https://event-checkin-[random].vercel.app`

3. **Get a Custom Domain** (Optional)
   - In Vercel dashboard
   - Go to "Settings" → "Domains"
   - Add custom domain (e.g., checkin.yourcompany.com)
   - Update DNS records (Vercel provides instructions)

---

## 🏠 Option 2: Run Locally on Your Computer

### Windows

```powershell
# 1. Install Node.js from https://nodejs.org/

# 2. Open PowerShell and create project
mkdir event-checkin
cd event-checkin

# 3. Create React app
npx create-react-app .

# 4. Install dependencies
npm install qrcode.react jsqr html2pdf

# 5. Copy files:
# - Copy EventCheckInApp.jsx to src/
# - Update src/App.js to import EventCheckInApp

# 6. Start development server
npm start

# App will open at http://localhost:3000
```

### Mac

```bash
# 1. Install Node.js from https://nodejs.org/

# 2. Create project
mkdir event-checkin
cd event-checkin

# 3. Create React app
npx create-react-app .

# 4. Install dependencies
npm install qrcode.react jsqr html2pdf

# 5. Copy files:
# - Copy EventCheckInApp.jsx to src/
# - Update src/App.js to import EventCheckInApp

# 6. Start development server
npm start

# App will open at http://localhost:3000
```

### Linux

```bash
# 1. Install Node.js
sudo apt-get update
sudo apt-get install nodejs npm

# 2. Create project
mkdir event-checkin
cd event-checkin

# 3. Create React app
npx create-react-app .

# 4. Install dependencies
npm install qrcode.react jsqr html2pdf

# 5. Copy files:
# - Copy EventCheckInApp.jsx to src/
# - Update src/App.js to import EventCheckInApp

# 6. Start development server
npm start

# App will open at http://localhost:3000
```

---

## 📁 Project Structure

```
event-checkin/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              ← Update to import EventCheckInApp
│   ├── EventCheckInApp.jsx ← Copy the main component here
│   ├── CanonPrinterManager.js ← Copy printer integration
│   ├── index.js
│   └── index.css
├── package.json            ← Copy provided package.json
├── .gitignore
└── README.md
```

---

## 📝 src/App.js Configuration

Replace the default App.js with this:

```javascript
import EventCheckInApp from './EventCheckInApp';
import './App.css';

function App() {
  return <EventCheckInApp />;
}

export default App;
```

---

## 🖨️ Printer Setup After Deployment

### If Using Vercel (Cloud):
- App runs in browser
- Print goes directly to your local printer
- **Setup on each kiosk computer:**
  1. Add Canon E470 as printer in OS settings
  2. Set as default printer
  3. When you click "Print Badge", it will use the local default printer
  4. No backend configuration needed!

### If Running Locally:
- Same setup
- Just open http://localhost:3000 on your kiosk computer
- Everything works immediately

---

## ✅ Testing Before Event

```bash
# 1. Start development server
npm start

# 2. Test features:
# ✓ Upload CSV
# ✓ View attendees
# ✓ Check-in manually (type name)
# ✓ View dashboard
# ✓ Export CSV
# ✓ Test print button (should open print dialog)

# 3. Test printer:
# - Click "Settings"
# - Check printer name
# - Click any "Print Badge" button
# - Select Canon E470 from printer dialog
# - Should print!

# 4. If printing doesn't work:
# - Verify printer is added to OS
# - Check it's set as default
# - Try from another browser
# - Restart printer
```

---

## 🔄 Updates & Maintenance

### Push Updates to Vercel

```bash
# Make changes to code
# ...

# Commit and push
git add .
git commit -m "Update badge colors"
git push origin main

# Vercel auto-deploys within 30 seconds!
# No manual redeploy needed
```

### Backup Data

```bash
# Download attendance CSV regularly
# Dashboard → "Export CSV Report"
# Save to cloud (Google Drive, Dropbox, etc.)
```

---

## 🔐 Security Considerations

### This App:
- ✓ No backend = no database hacking risk
- ✓ All data stored locally on your computer
- ✓ QR codes are just unique IDs (not sensitive)
- ✓ No personal data sent anywhere

### For Production:
- Use HTTPS (Vercel provides auto-HTTPS)
- Restrict access with password? (Can add login)
- Backup CSV files regularly
- Clear local storage after event

---

## 📊 Performance

**Local Storage Capacity:**
- Works smoothly up to ~10,000 attendees
- For larger events, contact for database backend

**Printer Performance:**
- Prints badge in ~3-5 seconds
- Can queue multiple badges
- No network required (works offline)

---

## 🆘 Common Issues & Fixes

### "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Port 3000 already in use
```bash
# Use different port
npm start -- --port 3001
```

### Printer not showing in dialog
**Windows:**
```
Control Panel → Devices and Printers → Right-click Canon E470 → Set as default
```

**Mac:**
```
System Preferences → Printers & Scanners → Select Canon E470 → "Set Default Printer"
```

### QR scanner not working
- Check camera permissions (browser may ask)
- Use manual entry instead (type attendee name)
- Try different browser if one doesn't work

### Data loss after restart
- App saves to localStorage (survives refresh)
- If you clear browser cache, data is lost
- **Always export CSV regularly!**

---

## 🎯 Production Checklist

- [ ] Node.js installed on kiosk computer
- [ ] Canon E470 connected via USB/Network
- [ ] Printer set as default
- [ ] Test print works
- [ ] CSV file prepared with attendees
- [ ] QR codes generated and printed
- [ ] App deployed (Vercel or local)
- [ ] Test check-in flow end-to-end
- [ ] Battery/power backup for laptop
- [ ] WiFi backup plan (or use USB printer)
- [ ] Export CSV backup plan

---

## 📞 Support

If you need help with:
- **Printer integration:** Check Settings tab in app
- **QR code issues:** Use manual entry (type name)
- **Data loss:** Always export CSV as backup
- **Custom features:** Database backend available

---

**You're ready to deploy! 🚀**

Next step: Upload your CSV and start checking people in!
