import React, { useState, useMemo, useEffect } from 'react';
import './Cafeteria.css';

function OrderAccordion({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="order-accordion card">
      <div 
        className="order-accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="order-accordion-info">
          <strong className="order-id">{order.id}</strong>
          <span className="order-status">{order.status.toUpperCase()}</span>
          <div className="order-date">
            {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="order-accordion-summary">
          <span className="order-total">₹{order.totalPrice}</span>
          <span className="order-chevron">{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="order-accordion-body">
          {order.items.map((item, idx) => (
            <div className="order-item-row" key={idx}>
              <span className="order-item-name">{item.qty}x {item.name} <span className="order-item-window">(W{item.window})</span></span>
              <span className="order-item-price">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Cafeteria() {
  const [menuSections, setMenuSections] = useState([]);
  const [sectionNames, setSectionNames] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  
  const [cart, setCart] = useState({});
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active orders state with localStorage persistence
  const [activeOrders, setActiveOrders] = useState(() => {
    const saved = localStorage.getItem('cafeteria_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [submittedOrder, setSubmittedOrder] = useState(null);

  // Persist to localStorage whenever activeOrders changes
  useEffect(() => {
    localStorage.setItem('cafeteria_orders', JSON.stringify(activeOrders));
  }, [activeOrders]);

  // Fetch menu data from our new backend API
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/menu`)
      .then(res => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then(data => {
        setMenuSections(data);
        const names = data.map((s) => s.section);
        setSectionNames(names);
        if (names.length > 0) setActiveSection(names[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching menu:', err);
        setError('Failed to load menu from the server. Is the backend running?');
        setLoading(false);
      });
  }, []);

  const currentSection = menuSections.find((s) => s.section === activeSection);

  /* Cart helpers */
  const updateQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  /* Flatten all items for lookup */
  const allItems = useMemo(
    () => menuSections.flatMap((s) => s.items.map((i) => ({ 
      ...i, 
      window: s.window, 
      windowName: s.windowName, 
      section: s.section, 
      waitMinutes: s.waitMinutes, 
      emoji: s.emoji 
    }))),
    [menuSections]
  );

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = allItems.find((i) => i.id === id);
    return { ...item, qty };
  });

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  /* Group submitted order items by window for the checkout confirmation */
  const windowGroups = useMemo(() => {
    if (!submittedOrder) return [];
    const groups = {};
    submittedOrder.items.forEach((item) => {
      if (!groups[item.window]) {
        groups[item.window] = {
          window: item.window,
          windowName: item.windowName,
          emoji: item.emoji,
          waitMinutes: item.waitMinutes,
          items: [],
        };
      }
      // Use the max wait time for items from this window
      if (item.waitMinutes > groups[item.window].waitMinutes) {
        groups[item.window].waitMinutes = item.waitMinutes;
      }
      groups[item.window].items.push(item);
    });
    return Object.values(groups).sort((a, b) => a.window - b.window);
  }, [submittedOrder]);

  const handleCheckout = async () => {
    if (cartItems.length > 0) {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      try {
        const res = await fetch(`${apiUrl}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartItems, totalPrice })
        });
        const data = await res.json();
        if (data.success) {
          const newOrder = data.order;
          setActiveOrders(prev => [newOrder, ...prev]);
          setSubmittedOrder(newOrder);
          setCart({});
          setCheckoutDone(true);
        } else {
          alert('Failed to place order.');
        }
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Could not connect to server to place order.');
      }
    }
  };

  const handleNewOrder = () => {
    setSubmittedOrder(null);
    setCheckoutDone(false);
    if (sectionNames.length > 0) {
      setActiveSection(sectionNames[0]);
    }
  };

  /* ===== LOADING / ERROR VIEWS ===== */
  if (loading) {
    return (
      <div className="cafeteria-page">
        <div className="page-header">
          <h2>MPSTME Canteen 🍽️</h2>
          <p>Loading the latest menu from the backend server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cafeteria-page">
        <div className="page-header">
          <h2>MPSTME Canteen 🍽️</h2>
          <p className="error-text" style={{ color: 'var(--accent-primary)', fontWeight: '600', marginTop: '1rem' }}>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  /* ===== CHECKOUT CONFIRMATION VIEW ===== */
  if (checkoutDone && submittedOrder) {
    return (
      <div className="cafeteria-page">
        <div className="checkout-success">
          <div className="checkout-success-icon">✅</div>
          <h2>Order Placed!</h2>
          <p>Order ID: <strong>{submittedOrder.id}</strong></p>
          <p>Your order totalling <strong>₹{submittedOrder.totalPrice}</strong> has been placed.</p>
        </div>

        <h3 className="collection-heading">Collection Windows</h3>
        <p className="collection-subtext">Pick up your items from the following windows:</p>

        <div className="window-groups">
          {windowGroups.map((wg) => (
            <div className="window-card card" key={wg.window}>
              <div className="window-card-header">
                <div className="window-badge">
                  <span className="window-badge-num">W{wg.window}</span>
                </div>
                <div className="window-header-info">
                  <h4>{wg.emoji} {wg.windowName}</h4>
                  <span className="window-wait">
                    ⏱️ Est. wait: <strong>{wg.waitMinutes} min</strong>
                  </span>
                </div>
              </div>
              <div className="window-items-list">
                {wg.items.map((item) => (
                  <div className="window-item-row" key={item.id}>
                    <span className="window-item-name">{item.name}</span>
                    <span className="window-item-qty">×{item.qty}</span>
                    <span className="window-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="window-subtotal">
                Subtotal: ₹{wg.items.reduce((s, i) => s + i.price * i.qty, 0)}
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-total-bar glass">
          <div className="checkout-total-info">
            <span>Grand Total</span>
            <span className="checkout-grand-total">₹{submittedOrder.totalPrice}</span>
          </div>
          <button className="btn-primary" onClick={handleNewOrder}>
            🍽️ Back to Menu
          </button>
        </div>
      </div>
    );
  }

  /* ===== MENU BROWSING VIEW ===== */
  return (
    <div className="cafeteria-page">
      <div className="page-header">
        <h2>MPSTME Canteen 🍽️</h2>
        <p>Browse the menu, add items to your cart, and place your order</p>
      </div>

      {/* Active Orders Section */}
      {activeOrders.length > 0 && (
        <div className="active-orders-section">
          <div className="active-orders-header">
            <h3>Your Active Orders</h3>
            <span className="active-orders-count">{activeOrders.length}</span>
          </div>
          <div className="active-orders-list">
            {activeOrders.map(order => (
              <OrderAccordion order={order} key={order.id} />
            ))}
          </div>
        </div>
      )}

      {/* Section Tabs */}
      <div className="caf-categories">
        {menuSections.map((s) => (
          <button
            key={s.section}
            className={`caf-cat-btn ${activeSection === s.section ? 'active' : ''}`}
            onClick={() => setActiveSection(s.section)}
          >
            <span className="cat-emoji">{s.emoji}</span>
            {s.section}
          </button>
        ))}
      </div>

      {/* Section Info */}
      {currentSection && (
        <div className="section-info">
          <span className="section-window-tag">
            📍 Window {currentSection.window} — {currentSection.windowName}
          </span>
        </div>
      )}

      {/* Menu Grid */}
      <div className="menu-grid">
        {currentSection && currentSection.items.map((item) => {
          const qty = cart[item.id] || 0;
          return (
            <div className={`menu-item-row ${qty > 0 ? 'in-cart' : ''}`} key={item.id}>
              <div className="menu-item-info">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-price">₹{item.price}</span>
              </div>
              <div className="qty-control">
                {qty > 0 && (
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                )}
                {qty > 0 && <span className="qty-value">{qty}</span>}
                <button className="qty-btn add" onClick={() => updateQty(item.id, 1)}>
                  {qty === 0 ? 'ADD' : '+'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      {totalItems > 0 && (
        <div className="cart-bar glass">
          <div className="cart-bar-info">
            <span className="cart-bar-count">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
            <span className="cart-bar-total">₹{totalPrice}</span>
          </div>
          <button className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

export default Cafeteria;
