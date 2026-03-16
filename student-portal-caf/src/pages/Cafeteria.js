import React, { useState } from 'react';
import './Cafeteria.css';

const menuData = {
  Breakfast: [
    { id: 1, name: 'Classic Pancakes', price: 4.50, emoji: '🥞', desc: 'Fluffy pancakes with maple syrup' },
    { id: 2, name: 'Avocado Toast', price: 5.00, emoji: '🥑', desc: 'Sourdough with smashed avocado & egg' },
    { id: 3, name: 'Fruit Bowl', price: 3.50, emoji: '🍓', desc: 'Fresh seasonal fruits with granola' },
    { id: 4, name: 'Breakfast Burrito', price: 6.00, emoji: '🌯', desc: 'Eggs, cheese, peppers, and salsa' },
  ],
  Lunch: [
    { id: 5, name: 'Grilled Chicken Wrap', price: 7.50, emoji: '🌮', desc: 'Herb-grilled chicken with hummus' },
    { id: 6, name: 'Vegan Buddha Bowl', price: 8.00, emoji: '🥗', desc: 'Quinoa, roasted veggies, tahini dressing' },
    { id: 7, name: 'Beef Burger', price: 8.50, emoji: '🍔', desc: 'Angus patty with cheddar & pickles' },
    { id: 8, name: 'Margherita Pizza', price: 6.50, emoji: '🍕', desc: 'Fresh mozzarella, basil, tomato sauce' },
  ],
  Snacks: [
    { id: 9, name: 'Fries Basket', price: 3.00, emoji: '🍟', desc: 'Crispy seasoned fries' },
    { id: 10, name: 'Mozzarella Sticks', price: 4.00, emoji: '🧀', desc: 'Golden fried with marinara' },
    { id: 11, name: 'Chocolate Brownie', price: 2.50, emoji: '🍫', desc: 'Rich dark chocolate fudge brownie' },
  ],
  Beverages: [
    { id: 12, name: 'Iced Latte', price: 3.50, emoji: '☕', desc: 'Espresso over ice with milk' },
    { id: 13, name: 'Fresh Smoothie', price: 4.50, emoji: '🥤', desc: 'Mango, banana & strawberry blend' },
    { id: 14, name: 'Sparkling Water', price: 1.50, emoji: '💧', desc: 'Chilled mineral water' },
  ],
};

const categoryList = Object.keys(menuData);

function Cafeteria() {
  const [activeCategory, setActiveCategory] = useState('Breakfast');
  const [cart, setCart] = useState({});

  const items = menuData[activeCategory];

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const allItems = Object.values(menuData).flat();
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = allItems.find((i) => i.id === Number(id));
    return { ...item, qty };
  });
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cafeteria-page">
      <div className="page-header">
        <h2>Cafeteria 🍽️</h2>
        <p>Order your favorite meals and pick them up at the counter</p>
      </div>

      {/* Category Tabs */}
      <div className="caf-categories">
        {categoryList.map((cat) => (
          <button
            key={cat}
            className={`caf-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {items.map((item) => (
          <div className="menu-card card" key={item.id}>
            <div className="menu-emoji">{item.emoji}</div>
            <div className="menu-details">
              <h4>{item.name}</h4>
              <p className="menu-desc">{item.desc}</p>
              <div className="menu-footer">
                <span className="menu-price">${item.price.toFixed(2)}</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-value">{cart[item.id] || 0}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="order-summary glass">
          <div className="order-summary-header">
            <h3>🛒 Your Order</h3>
            <span className="order-count">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
          </div>
          <div className="order-items">
            {cartItems.map((ci) => (
              <div className="order-row" key={ci.id}>
                <span>{ci.emoji} {ci.name} × {ci.qty}</span>
                <span>${(ci.price * ci.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span className="total-value">${total.toFixed(2)}</span>
          </div>
          <button className="btn-primary order-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Cafeteria;
