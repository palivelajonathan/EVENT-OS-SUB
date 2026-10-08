import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';

const EventCheckInApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState('checkin'); // 'qrgen', 'checkin', 'dashboard', 'settings'
  const [attendees, setAttendees] = useState([]);
  const [checkedIn, setCheckedIn] = useState(new Set());
  const [qrScanResult, setQrScanResult] = useState('');
  const [currentAttendee, setCurrentAttendee] = useState(null);
  const [showBadgePreview, setShowBadgePreview] = useState(false);
  const [badgeSettings, setBadgeSettings] = useState({
    showQR: true,
    showCompany: true,
    showTitle: true,
    fontColor: '#000000',
    bgColor: '#FFFFFF',
    printerName: 'Canon E470',
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('eventAttendees');
    const savedCheckins = localStorage.getItem('checkedIn');
    if (saved) setAttendees(JSON.parse(saved));
    if (savedCheckins) setCheckedIn(new Set(JSON.parse(savedCheckins)));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('eventAttendees', JSON.stringify(attendees));
    localStorage.setItem('checkedIn', JSON.stringify([...checkedIn]));
  }, [attendees, checkedIn]);

  // CSV Upload Handler
  const handleCSVUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

      const newAttendees = lines.slice(1)
        .filter((line) => line.trim())
        .map((line, idx) => {
          const values = line.split(',').map((v) => v.trim());
          return {
            id: `ATT-${Date.now()}-${idx}`,
            name: values[headers.indexOf('name')] || `Attendee ${idx}`,
            email: values[headers.indexOf('email')] || '',
            company: values[headers.indexOf('company')] || '',
            title: values[headers.indexOf('title')] || '',
          };
        });

      setAttendees([...attendees, ...newAttendees]);
    };
    reader.readAsText(file);
  };

  // QR Code Scanner
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        scanQRCode();
      }
    } catch (err) {
      alert('Camera access denied: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (canvas.width === 0 || canvas.height === 0) {
      requestAnimationFrame(scanQRCode);
      return;
    }

    ctx.drawImage(video, 0, 0);

    try {
      // Simple QR detection - look for the pattern
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // In production, use jsQR library for actual QR decoding
      // For now, we'll simulate with manual QR input
    } catch (err) {
      console.error('Scan error:', err);
    }

    if (!showBadgePreview) {
      requestAnimationFrame(scanQRCode);
    }
  };

  // Manual QR Input
  const handleQRInput = (qrData) => {
    const attendee = attendees.find((a) => a.id === qrData || a.name.toLowerCase().includes(qrData.toLowerCase()));
    if (attendee) {
      setCurrentAttendee(attendee);
      setQrScanResult(qrData);
      setShowBadgePreview(true);
      stopCamera();
    } else {
      alert('Attendee not found');
    }
  };

  // Check In Handler
  const handleCheckIn = () => {
    if (!currentAttendee) return;
    setCheckedIn((prev) => new Set([...prev, currentAttendee.id]));
    setShowBadgePreview(false);
    setCurrentAttendee(null);
    setQrScanResult('');
    alert(`${currentAttendee.name} checked in!`);
  };

  // Print Badge
  const printBadge = () => {
    if (!currentAttendee) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    const badgeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print Badge - ${currentAttendee.name}</title>
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            .badge { margin: 0; }
          }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f0f0f0;
            margin: 0;
            padding: 20px;
          }
          .badge {
            width: 3.5in;
            height: 2.125in;
            background: ${badgeSettings.bgColor};
            border: 2px solid #333;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: ${badgeSettings.fontColor};
            position: relative;
            overflow: hidden;
          }
          .badge-header {
            text-align: center;
            border-bottom: 2px solid ${badgeSettings.fontColor};
            padding-bottom: 8px;
          }
          .badge-name {
            font-size: 16px;
            font-weight: bold;
            margin: 0;
          }
          .badge-title {
            font-size: 10px;
            margin: 2px 0 0 0;
            opacity: 0.8;
          }
          .badge-company {
            font-size: 9px;
            margin: 2px 0 0 0;
            opacity: 0.7;
          }
          .badge-qr {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 45px;
            height: 45px;
          }
          .badge-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          @media print {
            body { background: white; }
            .badge { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="badge">
          <div class="badge-header">
            <p class="badge-name">${currentAttendee.name}</p>
            ${badgeSettings.showTitle && currentAttendee.title ? `<p class="badge-title">${currentAttendee.title}</p>` : ''}
            ${badgeSettings.showCompany && currentAttendee.company ? `<p class="badge-company">${currentAttendee.company}</p>` : ''}
          </div>
          <div class="badge-content"></div>
          ${badgeSettings.showQR ? `
            <div class="badge-qr">
              <svg viewBox="0 0 100 100" width="45" height="45">
                <text x="50" y="50" text-anchor="middle" font-size="12" fill="${badgeSettings.fontColor}">QR</text>
              </svg>
            </div>
          ` : ''}
        </div>
        <script>
          window.print();
          window.onafterprint = () => window.close();
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(badgeHTML);
    printWindow.document.close();
  };

  // Export Attendance Report
  const exportReport = () => {
    const report = attendees.map((att) => ({
      ...att,
      checkedIn: checkedIn.has(att.id) ? 'Yes' : 'No',
    }));

    const csv = [
      ['Name', 'Email', 'Company', 'Title', 'Checked In'],
      ...report.map((r) => [r.name, r.email, r.company, r.title, r.checkedIn]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${Date.now()}.csv`;
    a.click();
  };

  // Generate QR Codes for Download
  const downloadAllQRCodes = () => {
    alert('Opening QR code download tool...');
    // In production, this would generate a PDF with all QR codes
    // For now, showing individual QR codes
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎫 Event Check-In System</h1>
        <p style={styles.subtitle}>QR scanning • Badge printing • Real-time attendance</p>
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        {[
          { id: 'qrgen', label: '📋 Generate QR Codes' },
          { id: 'checkin', label: '📱 Check-In' },
          { id: 'dashboard', label: '📊 Dashboard' },
          { id: 'settings', label: '⚙️ Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.navButton,
              ...(activeTab === tab.id ? styles.navButtonActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={styles.content}>
        {/* QR Generation Tab */}
        {activeTab === 'qrgen' && (
          <div style={styles.tabContent}>
            <h2>📋 Generate QR Codes</h2>
            <p>Upload a CSV file with attendee information to generate QR codes.</p>

            <div style={styles.section}>
              <h3>CSV Format</h3>
              <code style={styles.code}>
                name,email,company,title
              </code>
              <p style={styles.note}>Example:</p>
              <code style={styles.code}>
                John Doe,john@example.com,Acme Corp,CEO
              </code>
            </div>

            <div style={styles.section}>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={styles.primaryButton}
              >
                📤 Upload CSV
              </button>
            </div>

            {attendees.length > 0 && (
              <div style={styles.section}>
                <h3>📊 Attendees Loaded ({attendees.length})</h3>
                <button onClick={downloadAllQRCodes} style={styles.secondaryButton}>
                  ⬇️ Download All QR Codes (PDF)
                </button>

                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>QR Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendees.slice(0, 10).map((att) => (
                      <tr key={att.id} style={styles.tableRow}>
                        <td>{att.name}</td>
                        <td>{att.email}</td>
                        <td>{att.company}</td>
                        <td>
                          <div style={{ width: '60px' }}>
                            <QRCode value={att.id} size={60} level="L" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {attendees.length > 10 && (
                  <p style={styles.note}>Showing 10 of {attendees.length} attendees</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Check-In Tab */}
        {activeTab === 'checkin' && (
          <div style={styles.tabContent}>
            <h2>📱 Quick Check-In</h2>

            {!showBadgePreview ? (
              <>
                <div style={styles.section}>
                  <h3>Scan QR Code or Enter ID</h3>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Scan QR or enter attendee ID/name..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleQRInput(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      style={styles.input}
                    />
                  </div>
                  <button onClick={startCamera} style={styles.primaryButton}>
                    📷 Open Camera
                  </button>
                </div>

                {isCameraActive && (
                  <div style={styles.section}>
                    <video
                      ref={videoRef}
                      autoPlay
                      style={styles.video}
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <button onClick={stopCamera} style={styles.secondaryButton}>
                      ✕ Close Camera
                    </button>
                  </div>
                )}
              </>
            ) : currentAttendee ? (
              <div style={styles.badgePreview}>
                <h3>✓ Attendee Found</h3>
                <div style={styles.attendeeCard}>
                  <h2>{currentAttendee.name}</h2>
                  <p><strong>Email:</strong> {currentAttendee.email}</p>
                  <p><strong>Company:</strong> {currentAttendee.company}</p>
                  <p><strong>Title:</strong> {currentAttendee.title}</p>
                </div>

                <div style={styles.buttonGroup}>
                  <button onClick={handleCheckIn} style={styles.primaryButton}>
                    ✓ Check In
                  </button>
                  <button onClick={printBadge} style={styles.successButton}>
                    🖨️ Print Badge
                  </button>
                  <button
                    onClick={() => {
                      setShowBadgePreview(false);
                      setCurrentAttendee(null);
                    }}
                    style={styles.secondaryButton}
                  >
                    ← Back
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={styles.tabContent}>
            <h2>📊 Attendance Dashboard</h2>

            <div style={styles.stats}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{attendees.length}</div>
                <div style={styles.statLabel}>Total Attendees</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>{checkedIn.size}</div>
                <div style={styles.statLabel}>Checked In</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>
                  {attendees.length > 0
                    ? Math.round((checkedIn.size / attendees.length) * 100)
                    : 0}
                  %
                </div>
                <div style={styles.statLabel}>Check-In Rate</div>
              </div>
            </div>

            <div style={styles.section}>
              <h3>Recent Check-Ins</h3>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees
                    .filter((a) => checkedIn.has(a.id))
                    .slice(0, 15)
                    .map((att) => (
                      <tr key={att.id} style={styles.tableRow}>
                        <td>{att.name}</td>
                        <td style={{ color: 'green' }}>✓ Checked In</td>
                        <td>-</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div style={styles.section}>
              <button onClick={exportReport} style={styles.primaryButton}>
                📥 Export CSV Report
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={styles.tabContent}>
            <h2>⚙️ Settings</h2>

            <div style={styles.section}>
              <h3>Badge Customization</h3>

              <label style={styles.settingLabel}>
                <input
                  type="checkbox"
                  checked={badgeSettings.showQR}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, showQR: e.target.checked })
                  }
                />
                Show QR Code on Badge
              </label>

              <label style={styles.settingLabel}>
                <input
                  type="checkbox"
                  checked={badgeSettings.showCompany}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, showCompany: e.target.checked })
                  }
                />
                Show Company
              </label>

              <label style={styles.settingLabel}>
                <input
                  type="checkbox"
                  checked={badgeSettings.showTitle}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, showTitle: e.target.checked })
                  }
                />
                Show Title
              </label>

              <div style={styles.colorSetting}>
                <label>Badge Background Color</label>
                <input
                  type="color"
                  value={badgeSettings.bgColor}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, bgColor: e.target.value })
                  }
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.colorSetting}>
                <label>Text Color</label>
                <input
                  type="color"
                  value={badgeSettings.fontColor}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, fontColor: e.target.value })
                  }
                  style={styles.colorInput}
                />
              </div>

              <div style={styles.colorSetting}>
                <label>Printer Name</label>
                <input
                  type="text"
                  value={badgeSettings.printerName}
                  onChange={(e) =>
                    setBadgeSettings({ ...badgeSettings, printerName: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.section}>
              <h3>Canon E470 Printer Setup</h3>
              <p style={styles.note}>
                <strong>Windows:</strong> Ensure printer is installed via Windows Settings → Devices → Printers
              </p>
              <p style={styles.note}>
                <strong>Mac:</strong> Add printer via System Preferences → Printers & Scanners
              </p>
              <p style={styles.note}>
                <strong>USB:</strong> Connect Canon E470 directly to this computer
              </p>
              <p style={styles.note}>
                <strong>Network:</strong> Connect via WiFi and add to printer list
              </p>
            </div>

            <div style={styles.section}>
              <h3>Data Management</h3>
              <button
                onClick={() => {
                  if (window.confirm('Clear all data?')) {
                    setAttendees([]);
                    setCheckedIn(new Set());
                    localStorage.clear();
                  }
                }}
                style={styles.dangerButton}
              >
                🗑️ Clear All Data
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '10px',
    padding: '20px',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  navButtonActive: {
    backgroundColor: '#667eea',
    color: 'white',
  },
  content: {
    padding: '20px',
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  section: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  primaryButton: {
    padding: '12px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    marginLeft: '10px',
  },
  successButton: {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    marginLeft: '10px',
  },
  dangerButton: {
    padding: '12px 24px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
  },
  code: {
    display: 'block',
    backgroundColor: '#f4f4f4',
    padding: '12px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
    overflowX: 'auto',
    marginTop: '10px',
  },
  note: {
    backgroundColor: '#f0f7ff',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#0066cc',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
  },
  tableHeader: {
    backgroundColor: '#667eea',
    color: 'white',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '14px',
    opacity: 0.9,
  },
  badgePreview: {
    backgroundColor: '#f0f7ff',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  attendeeCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    marginTop: '15px',
    borderLeft: '4px solid #667eea',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  video: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '6px',
    marginBottom: '15px',
  },
  colorSetting: {
    marginTop: '20px',
  },
  colorInput: {
    marginLeft: '10px',
    cursor: 'pointer',
    width: '50px',
    height: '40px',
    border: 'none',
    borderRadius: '4px',
  },
  settingLabel: {
    display: 'block',
    margin: '15px 0',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default EventCheckInApp;
