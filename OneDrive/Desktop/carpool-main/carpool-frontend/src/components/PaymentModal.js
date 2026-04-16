import { useState } from 'react';

export default function PaymentModal({ booking, onSuccess, onClose }) {
  const [method, setMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [upiId, setUpiId] = useState('');

  const amount = booking.seats * 50;

  const processPayment = async (selectedMethod) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:9090/payments/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: booking.id, amount, method: selectedMethod }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        onSuccess(selectedMethod, amount);
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      setError('Could not connect to payment server');
    }
    setLoading(false);
  };

  const handleCardPay = () => {
    if (!cardNumber || !cardName || !expiry || !cvv) { setError('Please fill all card details'); return; }
    if (cardNumber.replace(/\s/g, '').length !== 16) { setError('Invalid card number'); return; }
    processPayment('Card');
  };

  const handleUpiPay = () => {
    if (!upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. name@upi)'); return; }
    processPayment('UPI');
  };

  const handleCashPay = () => processPayment('Cash');

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => val.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>💳 Complete Payment</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Amount */}
        <div style={styles.amountBox}>
          <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>Booking #{booking.id} · {booking.seats} seat(s)</p>
          <p style={{ margin: '4px 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#0066cc' }}>₹{amount}</p>
        </div>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        {/* Method Selection */}
        {!method && (
          <div>
            <p style={{ textAlign: 'center', color: '#555', marginBottom: '16px' }}>Choose payment method</p>
            <div style={styles.methodGrid}>
              <button style={styles.methodBtn} onClick={() => setMethod('upi')}>
                <span style={{ fontSize: '2rem' }}>📱</span>
                <span>UPI</span>
              </button>
              <button style={styles.methodBtn} onClick={() => setMethod('card')}>
                <span style={{ fontSize: '2rem' }}>💳</span>
                <span>Card</span>
              </button>
              <button style={styles.methodBtn} onClick={() => setMethod('cash')}>
                <span style={{ fontSize: '2rem' }}>💵</span>
                <span>Cash</span>
              </button>
            </div>
          </div>
        )}

        {/* UPI */}
        {method === 'upi' && (
          <div style={styles.section}>
            <button style={styles.backBtn} onClick={() => { setMethod(null); setError(''); }}>← Back</button>
            <h3 style={{ textAlign: 'center', marginBottom: '12px' }}>📱 Pay via UPI</h3>

            {/* Fake QR Code */}
            <div style={styles.qrBox}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                {/* QR pattern simulation */}
                {[0,1,2,3,4,5,6].map(row =>
                  [0,1,2,3,4,5,6].map(col => {
                    const isCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2);
                    const pattern = (row * 7 + col * 3 + row + col) % 3 === 0;
                    return (pattern || isCorner) ? (
                      <rect key={`${row}-${col}`} x={10 + col * 18} y={10 + row * 18} width="14" height="14" fill="#1a1a1a" rx="1" />
                    ) : null;
                  })
                )}
              </svg>
              <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: '#888' }}>Scan with any UPI app</p>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', fontWeight: 'bold' }}>pescarpool@upi</p>
            </div>

            <p style={{ textAlign: 'center', color: '#888', margin: '12px 0', fontSize: '0.85rem' }}>— OR enter UPI ID —</p>
            <input
              style={styles.input}
              placeholder="yourname@upi"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
            />
            <button style={styles.payBtn} onClick={handleUpiPay} disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${amount} via UPI`}
            </button>
          </div>
        )}

        {/* Card */}
        {method === 'card' && (
          <div style={styles.section}>
            <button style={styles.backBtn} onClick={() => { setMethod(null); setError(''); }}>← Back</button>
            <h3 style={{ marginBottom: '12px' }}>💳 Card Details</h3>

            {/* Card Preview */}
            <div style={styles.cardPreview}>
              <p style={{ margin: '0 0 8px', fontSize: '0.75rem', opacity: 0.7 }}>DEBIT / CREDIT CARD</p>
              <p style={{ margin: '0 0 16px', fontSize: '1.1rem', letterSpacing: '3px', fontFamily: 'monospace' }}>
                {cardNumber || '•••• •••• •••• ••••'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.65rem', opacity: 0.7 }}>CARD HOLDER</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{cardName || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.65rem', opacity: 0.7 }}>EXPIRES</p>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>{expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>

            <input style={styles.input} placeholder="Card Number" value={cardNumber}
              onChange={e => setCardNumber(formatCard(e.target.value))} maxLength="19" />
            <input style={styles.input} placeholder="Cardholder Name" value={cardName}
              onChange={e => setCardName(e.target.value)} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={{ ...styles.input, flex: 1 }} placeholder="MM/YY" value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))} maxLength="5" />
              <input style={{ ...styles.input, flex: 1 }} placeholder="CVV" value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} maxLength="3" type="password" />
            </div>
            <button style={styles.payBtn} onClick={handleCardPay} disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${amount} via Card`}
            </button>
          </div>
        )}

        {/* Cash */}
        {method === 'cash' && (
          <div style={styles.section}>
            <button style={styles.backBtn} onClick={() => { setMethod(null); setError(''); }}>← Back</button>
            <h3 style={{ textAlign: 'center' }}>💵 Pay with Cash</h3>
            <div style={styles.cashBox}>
              <p style={{ fontSize: '2.5rem', margin: '0 0 8px' }}>💵</p>
              <p style={{ margin: 0, color: '#555' }}>Pay <strong>₹{amount}</strong> directly to your driver</p>
              <p style={{ margin: '8px 0 0', fontSize: '0.82rem', color: '#888' }}>
                Please keep exact change ready. Driver will confirm receipt.
              </p>
            </div>
            <button style={{ ...styles.payBtn, background: '#27ae60' }} onClick={handleCashPay} disabled={loading}>
              {loading ? 'Confirming...' : '✅ Confirm Cash Payment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    background: 'white', borderRadius: '16px', width: '100%',
    maxWidth: '420px', maxHeight: '90vh', overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)', margin: '0 16px',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 20px 0', borderBottom: '1px solid #eee', paddingBottom: '16px',
  },
  closeBtn: {
    background: 'none', border: 'none', fontSize: '1.2rem',
    cursor: 'pointer', color: '#888', padding: '4px 8px',
  },
  amountBox: {
    textAlign: 'center', padding: '20px',
    borderBottom: '1px solid #eee', background: '#f8f9ff',
  },
  error: {
    margin: '12px 20px 0', padding: '10px 14px',
    background: '#fff0f0', border: '1px solid #ffcccc',
    borderRadius: '8px', color: '#cc0000', fontSize: '0.85rem',
  },
  methodGrid: {
    display: 'flex', gap: '12px', padding: '0 20px 20px', justifyContent: 'center',
  },
  methodBtn: {
    flex: 1, padding: '16px 8px', border: '2px solid #e0e0e0',
    borderRadius: '12px', background: 'white', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '6px', fontSize: '0.85rem', fontWeight: 'bold', color: '#333',
    transition: 'all 0.2s',
  },
  section: { padding: '16px 20px 20px' },
  backBtn: {
    background: 'none', border: 'none', color: '#0066cc',
    cursor: 'pointer', fontSize: '0.85rem', padding: '0 0 12px', fontWeight: 'bold',
  },
  qrBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '16px', background: '#f9f9f9', borderRadius: '12px',
    border: '1px solid #eee', marginBottom: '12px',
  },
  input: {
    width: '100%', padding: '12px 14px', fontSize: '0.95rem',
    border: '1.5px solid #ddd', borderRadius: '8px',
    marginBottom: '10px', boxSizing: 'border-box', outline: 'none',
  },
  payBtn: {
    width: '100%', padding: '14px', background: '#0066cc',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px',
  },
  cardPreview: {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    color: 'white', borderRadius: '12px', padding: '20px',
    marginBottom: '16px', minHeight: '90px',
  },
  cashBox: {
    textAlign: 'center', padding: '24px 16px',
    background: '#f0fff4', borderRadius: '12px',
    border: '1px solid #b2dfdb', marginBottom: '16px',
  },
};
