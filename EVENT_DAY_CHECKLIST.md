# Event Check-In System - Quick Start Checklist

## 🎯 Before Your Event

### 2-3 Weeks Before
- [ ] Prepare attendee list (Excel/CSV format)
- [ ] Test app locally or on Vercel
- [ ] Set up Canon E470 printer on your computer
- [ ] Order badge materials (if printing physical badges)
- [ ] Create sample CSV file with test attendees

### 1 Week Before
- [ ] Confirm all attendees in CSV file
- [ ] Generate QR codes in app
- [ ] Download QR codes PDF
- [ ] Send QR codes to attendees (email/SMS)
- [ ] Print sample badge and verify quality
- [ ] Check printer settings and colors

### 1 Day Before Event
- [ ] Upload CSV to app
- [ ] Test entire check-in flow:
  - [ ] Scan QR code (or manual entry)
  - [ ] Check-in button works
  - [ ] Badge prints correctly
  - [ ] Dashboard updates in real-time
- [ ] Prepare backup laptop/tablet
- [ ] Check internet connection (or use offline mode)
- [ ] Create backup of CSV file on cloud drive

### Morning of Event
- [ ] Arrive early to set up kiosk
- [ ] Power on laptop and printer
- [ ] Test printer connection one more time
- [ ] Open app and verify data is loaded
- [ ] Print test badge
- [ ] Position printer at check-in station
- [ ] Have backup tablet ready
- [ ] Print attendance sheet as backup

---

## 📋 During Event

### Opening the App
1. Go to `https://checkin-app.vercel.app` (or `http://localhost:3000` if local)
2. Verify CSV is loaded (should show count of attendees)
3. Click "Check-In" tab
4. You're ready!

### Checking In An Attendee

**Via QR Code:**
1. Attendee shows QR code on phone
2. Click "Open Camera"
3. Point phone at QR code
4. System auto-recognizes attendee
5. Click "Check In"
6. Click "Print Badge"
7. Select "Canon E470" printer
8. Click "Print"

**Via Manual Entry:**
1. Attendee tells you their name
2. Type name in search box
3. Press Enter
4. Click "Check In"
5. Click "Print Badge"
6. Select printer and print

**Troubleshooting During Event:**
- QR not scanning? → Use manual entry
- Printer error? → Check USB cable, restart printer
- App frozen? → Refresh page
- Data lost? → Upload CSV again

---

## 📊 Dashboard Monitoring

### Watch These Metrics:
- **Total Attendees:** Should match your CSV count
- **Checked In:** Live count of who's arrived
- **Check-In Rate:** % checked in (aim for 95%+)
- **Recent Check-Ins:** Scrolling list of arrivals

### Export Report:
- Click "Export CSV Report" every 30 mins
- Save to cloud (Google Drive, Dropbox)
- Have backup of attendance data

---

## 🖨️ Printer Troubleshooting

### Badge Won't Print
1. Check: Is printer on? (light indicator)
2. Check: Is Canon E470 selected in print dialog?
3. Check: Is paper loaded?
4. Try: Restart printer
5. Try: Refresh browser and print again

### Badge Quality Issues
- **Dark badge:** Check Settings tab → colors
- **Misaligned:** Check printer's paper feed
- **Cut off text:** Margins may be set too small
- **Blurry:** Check printer is set to highest quality

### Printer Not Found
**Windows:**
```
Settings → Devices → Printers & Scanners
Click "Add a printer"
Look for "Canon E470"
If not found: Download driver from canon.com
```

**Mac:**
```
System Preferences → Printers & Scanners
Click "+" button
Select "Canon E470" from list
If not found: Check USB cable
```

---

## 💾 Data Backup

### Every 30 Minutes:
1. Dashboard → "Export CSV Report"
2. Save file locally: `attendance-12-30pm.csv`
3. Upload to Google Drive / Dropbox

### End of Event:
1. Export final CSV
2. Save to at least 2 locations (local + cloud)
3. Take screenshot of final stats
4. Email report to organizers

---

## 🎫 Badge Printing Tips

### Quality Settings
- **Paper Type:** ID Card (3.5" x 2.125")
- **Quality:** Best/High
- **Margins:** 0 (no margins)
- **Color:** Color (unless B&W requested)
- **Size:** 100% (don't scale)

### Printer Settings in App
- Settings tab → Customize badge
- Colors: Background & Text color
- Toggle: QR code, title, company
- Printer name: Should be "Canon E470"

### Physical Setup
- Station 1: Registration desk
- Station 2: Printer (facing attendee)
- Station 3: Badge pickup (attendee takes)
- Keep badges in tray while drying (ink may smudge)

---

## 📱 Mobile Check-In Kiosk

### Setup on Tablet
1. iPad/Android tablet with browser
2. Connect to venue WiFi
3. Open app: https://checkin-app.vercel.app
4. Upload CSV
5. Use camera to scan QRs
6. Print to network Canon E470

### Backup Kiosk
- Keep second laptop/tablet powered up
- Same app running
- Can take over if primary fails
- Both logged into same CSV (localStorage)

---

## 🚨 Emergency Procedures

### If Printer Fails
1. Have backup portable printer
2. Use manual badges (name + sticker)
3. Record name in app anyway
4. Print badges after event

### If App Crashes
1. Refresh page (F5 or Cmd+R)
2. Data is saved locally - not lost
3. Use backup tablet
4. Have printed attendee list as backup

### If Power Fails
1. Use backup battery pack for laptop
2. Printer usually has battery backup
3. QR codes printed for all attendees
4. Fall back to printed checklist

### If Internet Down
1. App works offline (uses localStorage)
2. Still can scan QRs and check in
3. Still can print (no internet needed)
4. Sync later when internet returns

---

## 📞 Support Contacts

### Printer Support
- Canon Help: support.canon.com
- Printer manual: In the box with printer
- Tech support: Have printer model number ready

### App Issues
- Clear browser cache (Ctrl+Shift+Del / Cmd+Shift+Del)
- Try different browser (Chrome, Firefox, Safari)
- Restart computer
- Check that CSV uploaded correctly

---

## 📋 Post-Event

### Immediately After
- [ ] Export final attendance CSV
- [ ] Back up to cloud (2 locations minimum)
- [ ] Take photos of setup/badges for records
- [ ] Note any issues for next event

### Within 24 Hours
- [ ] Send attendance report to organizers
- [ ] Prepare attendance summary (% checked in, etc.)
- [ ] Note improvements for next event
- [ ] Clear local data if reusing computer

### Archive
- [ ] Store CSV files (1 year retention)
- [ ] Save final badge design (for next event)
- [ ] Document any lessons learned
- [ ] Update checklist for next event

---

## 🎓 Quick Reference

| Action | Path | Shortcut |
|--------|------|----------|
| Upload attendees | Generate QR Codes tab | Upload CSV button |
| Check in person | Check-In tab | Search or scan |
| Print badge | Check-In tab | Print Badge button |
| View stats | Dashboard tab | Real-time numbers |
| Export attendance | Dashboard tab | Export CSV button |
| Customize badge | Settings tab | Colors & options |
| Set printer | Settings tab | Printer name field |

---

## ✅ Final Verification (10 mins before event)

```
⚪ App loaded and shows correct attendee count
⚪ CSV file uploaded successfully
⚪ Test QR scan works (or manual entry works)
⚪ Printer connected and powered on
⚪ Test badge prints and looks good
⚪ Dashboard showing stats correctly
⚪ Backup laptop ready (if needed)
⚪ WiFi connected (or USB printer for offline)
⚪ All attendees have QR codes (printed or digital)
⚪ First attendee ready to check in!
```

---

## 🎉 You're Ready!

You now have a complete, working event check-in system with:
- ✅ QR code scanning
- ✅ Real-time badge printing
- ✅ Attendance tracking
- ✅ Data backup & export

**Let's check some people in! 🎫**

For detailed technical info, see:
- `SETUP_GUIDE.md` - Complete setup instructions
- `DEPLOYMENT_GUIDE.md` - How to deploy the app
- Sample CSV - Use as template for your attendees
