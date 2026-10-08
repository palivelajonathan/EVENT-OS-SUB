# Event Check-In App - Complete Setup Guide

## 📋 What You Have

A production-ready React application with:
- ✅ CSV upload for attendee management
- ✅ QR code generation & scanning
- ✅ Real-time check-in dashboard
- ✅ Badge printing to Canon E470
- ✅ Attendance export reports
- ✅ Local data persistence (localStorage)

---

## 🚀 Quick Start (5 minutes)

### Option 1: Run Locally (Fastest)

```bash
# Install Node.js from https://nodejs.org (if you don't have it)

# Create a new React app
npx create-react-app event-checkin
cd event-checkin

# Install dependencies
npm install qrcode.react jsqr html2pdf

# Copy the EventCheckInApp.jsx file to src/
cp EventCheckInApp.jsx src/

# Update src/App.js to use the component:
# -----
# import EventCheckInApp from './EventCheckInApp';
# function App() {
#   return <EventCheckInApp />;
# }
# export default App;
# -----

# Start the app
npm start
```

Visit `http://localhost:3000` - you're live!

### Option 2: Deploy to Vercel (1 minute)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

**Live in seconds!** Your app will have a public URL.

---

## 🖨️ Canon E470 Printer Integration

### Step 1: Connect the Printer

**Windows:**
- Plug in Canon E470 via USB
- Windows will auto-detect it
- Or: Settings → Devices → Printers → "Add a printer"

**Mac:**
- Plug in Canon E470 via USB
- System Preferences → Printers & Scanners → "+" → select Canon E470

**Network (WiFi):**
- Connect Canon E470 to your WiFi
- Settings → Devices → Printers → "Add a printer" → select Canon E470

### Step 2: Set as Default Printer

**Windows:**
```
Control Panel → Devices and Printers → Right-click Canon E470 → Set as default
```

**Mac:**
```
System Preferences → Printers & Scanners → Select Canon E470 → "Set Default Printer"
```

### Step 3: Verify Print Setup

**Test Print:**
1. Open the app
2. Go to Settings tab
3. Check "Canon E470" is listed as printer name
4. Click any "Print Badge" button
5. A print dialog will appear
6. Select "Canon E470"
7. Click "Print"

✓ You should hear the printer and see a badge!

---

## 📊 How to Use the App

### 1️⃣ Generate QR Codes (Before Event)

**Prepare CSV file:**
```csv
name,email,company,title
John Doe,john@example.com,Acme Corp,CEO
Jane Smith,jane@example.com,Tech Inc,Engineer
Bob Wilson,bob@example.com,StartUp Co,Designer
```

**In app:**
1. Click "Generate QR Codes" tab
2. Click "Upload CSV"
3. Select your CSV file
4. System shows all attendees
5. Click "Download All QR Codes (PDF)"
6. Print and send to attendees

### 2️⃣ Check-In at Event

**Via QR Code Scanner:**
1. Click "Check-In" tab
2. Click "Open Camera"
3. Point at attendee's QR code
4. System auto-detects and shows badge preview
5. Click "Check In" + "Print Badge"
6. Badge prints on Canon E470!

**Manual Entry:**
1. Attendee tells you their name
2. Type in the search box (top of Check-In tab)
3. Press Enter
4. Click "Check In" + "Print Badge"

### 3️⃣ Dashboard (During Event)

**Real-time Stats:**
- Total attendees
- Number checked in
- Check-in percentage
- Recent check-ins list

**Export Report:**
- Click "Export CSV Report"
- Get file: `attendance-[timestamp].csv`
- Open in Excel/Google Sheets

### 4️⃣ Customize Badges

**Settings tab:**
- Toggle QR code visibility
- Show/hide company name
- Show/hide job title
- Change badge colors (background/text)
- Configure printer name

---

## 🎨 Badge Format

**Default Badge Size:** 3.5" × 2.125" (standard ID card)

**What's Printed:**
```
┌─────────────────────┐
│    JOHN DOE         │
│    CEO              │
│    Acme Corp        │
│                  [QR│
│                  CODE│
│                     │
└─────────────────────┘
```

**Customizable:**
- Name (always shown)
- Title (toggle in settings)
- Company (toggle in settings)
- QR code (toggle in settings)
- Colors (background + text)

---

## 📱 QR Code Format

Each QR code encodes:
```
{attendee-id}
```

Example: `ATT-1705234567890-0`

When scanned, the app:
1. Decodes the QR
2. Looks up attendee in database
3. Shows name + info
4. Ready to check-in or print

---

## 💾 Data Storage

### Local (Built-in)
- Everything saved in browser's localStorage
- Survives page refresh
- Private (not sent anywhere)
- Limit: ~5MB per domain

### To Backup:
1. Dashboard → "Export CSV Report"
2. Saves all check-ins to file

### To Restore:
1. Delete browsers cache (Settings → Clear browsing data)
2. Re-upload CSV
3. Manual check-ins

---

## 🔧 Troubleshooting

### Printer Not Found

**Windows:**
```
Settings → Devices → Printers → See if Canon E470 appears
If not: Control Panel → Devices and Printers → "Add a printer"
```

**Mac:**
```
System Preferences → Printers & Scanners → Click "+" → Look for Canon E470
```

**Still no printer?**
- Check USB cable (or WiFi connection)
- Restart printer
- Restart computer
- Download latest driver from Canon website

### QR Code Not Scanning

- **Lighting:** Make sure QR code is well-lit
- **Distance:** Hold phone 6-12 inches away
- **Camera:** Give app permission to use camera (browser prompt)
- **Fallback:** Use manual entry (type attendee name)

### Badge Print Looks Wrong

1. Check badge settings (Settings tab)
2. Verify printer is set to "Canon E470"
3. Click "Print Badge" again
4. In print dialog, check margins are set to 0
5. Try printing from computer's normal print dialog as test

### Data Lost After Refresh

- App saves automatically to localStorage
- If you cleared browser cache, data is gone
- **Always export CSV regularly!**

---

## 🚀 Advanced: Self-Hosted Backend

**Want to store data online?** Upgrade to:

```
Frontend: Vercel (same as now)
Backend: Firebase + Node.js
Database: PostgreSQL / Firestore
```

This gives you:
- Automatic cloud backup
- Multi-device access
- Better security
- Real-time sync

Setup takes ~30 mins (let me know if you need this).

---

## 📞 Support Tips

### Before Event
- [ ] Test printer connection
- [ ] Print sample badge
- [ ] Prepare CSV with all attendees
- [ ] Generate QR codes PDF
- [ ] Set up check-in station

### During Event
- [ ] Have backup power (laptop + printer)
- [ ] WiFi stable or use USB printer
- [ ] Keep phone/tablet charged
- [ ] Have pen for manual backups
- [ ] Export CSV every hour (just in case)

### After Event
- [ ] Export final CSV
- [ ] Back up to cloud (Google Drive/Dropbox)
- [ ] Save PDF of all QR codes
- [ ] Clear local data if reusing computer

---

## 📋 Quick Reference

| Feature | Location | Shortcut |
|---------|----------|----------|
| Upload attendees | Generate QR Codes tab | Click "Upload CSV" |
| Check-in attendee | Check-In tab | Type name or scan QR |
| Print badge | Check-In tab | Click "Print Badge" |
| View stats | Dashboard tab | Real-time metrics |
| Export report | Dashboard tab | "Export CSV Report" |
| Customize badge | Settings tab | Colors, fields, layout |
| Configure printer | Settings tab | Set printer name |

---

## 🎯 Typical Event Flow

```
1. 2 weeks before:
   ↓ Prepare attendee CSV
   ↓ Upload to app
   ↓ Generate QR codes
   ↓ Print and send to attendees

2. Morning of event:
   ↓ Set up check-in station (laptop + printer)
   ↓ Test printer
   ↓ Open app on kiosk

3. During event:
   ↓ Attendees scan QR or tell name
   ↓ Click "Check In" + "Print Badge"
   ↓ Attendee takes printed badge
   ↓ Dashboard shows live stats

4. After event:
   ↓ Export CSV report
   ↓ Backup to cloud
   ↓ Share attendance with organizers
```

---

## 📧 Sample CSV Templates

### Minimal (Required fields)
```csv
name
John Doe
Jane Smith
Bob Wilson
```

### Standard (Recommended)
```csv
name,email,company,title
John Doe,john@example.com,Acme Corp,CEO
Jane Smith,jane@example.com,Tech Inc,Engineer
```

### Full (All fields)
```csv
name,email,company,title,phone,department
John Doe,john@example.com,Acme Corp,CEO,555-1234,Executive
Jane Smith,jane@example.com,Tech Inc,Engineer,555-5678,Engineering
Bob Wilson,bob@example.com,StartUp Co,Designer,555-9012,Design
```

---

## 🎓 Tech Stack Summary

| Component | Technology | Why |
|-----------|-----------|-----|
| Frontend | React 18 | Modern, fast, component-based |
| QR Gen | qrcode.react | Built-in React integration |
| QR Scan | jsqr (optional) | Browser-based scanning |
| Printing | Browser Print API | No driver needed, works everywhere |
| Storage | localStorage | Fast, private, no backend needed |
| Deploy | Vercel | Free, automatic, instant |

---

**You're all set! Start checking people in! 🎫**

Questions? The Settings tab has additional printer setup instructions for your OS.
