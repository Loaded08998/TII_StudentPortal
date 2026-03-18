const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const menuSections = [
  {
    section: 'Chaat',
    window: 1,
    windowName: 'Chaat Counter',
    emoji: '🥘',
    waitMinutes: 5,
    items: [
      { id: 'ch1', name: 'Dahi Batata Puri', price: 50 },
      { id: 'ch2', name: 'Dahi Bhel', price: 50 },
      { id: 'ch3', name: 'Pani Puri', price: 38 },
      { id: 'ch4', name: 'Chowpatty Bhel', price: 38 },
      { id: 'ch5', name: 'Chinese Bhel', price: 63 },
      { id: 'ch6', name: 'Sev Puri', price: 38 },
    ],
  },
  {
    section: 'Sandwiches',
    window: 2,
    windowName: 'Sandwich Counter',
    emoji: '🥪',
    waitMinutes: 8,
    items: [
      { id: 'sw1', name: 'Veg Sandwich', price: 32 },
      { id: 'sw2', name: 'Cheese Plain Sandwich', price: 43 },
      { id: 'sw3', name: 'Veg Cheese Sandwich', price: 50 },
      { id: 'sw4', name: 'Veg Grill Sandwich', price: 69 },
      { id: 'sw5', name: 'Bread Butter', price: 23 },
      { id: 'sw6', name: 'Bread Butter Toast', price: 25 },
      { id: 'sw7', name: 'Bun Maska', price: 25 },
      { id: 'sw8', name: 'Cheese Toast Sandwich', price: 50 },
      { id: 'sw9', name: 'Veg Cheese Toast Sandwich', price: 58 },
    ],
  },
  {
    section: 'Egg Preparation',
    window: 3,
    windowName: 'Egg Counter',
    emoji: '🍳',
    waitMinutes: 10,
    items: [
      { id: 'eg1', name: 'Masala Omelette with Bread', price: 69 },
      { id: 'eg2', name: 'Egg Bhurjee with 2 Pav', price: 69 },
      { id: 'eg3', name: 'Egg Curry with Rice', price: 125 },
      { id: 'eg4', name: 'Boiled Eggs (2 Nos.)', price: 27 },
      { id: 'eg5', name: 'Fried Eggs (2 Nos.) with Bread', price: 41 },
    ],
  },
  {
    section: 'North Indian',
    window: 4,
    windowName: 'North Indian Counter',
    emoji: '🍛',
    waitMinutes: 15,
    items: [
      { id: 'ni1', name: 'Dal Tadka', price: 74 },
      { id: 'ni2', name: 'Dal Fry', price: 68 },
      { id: 'ni3', name: 'Tava Veg', price: 95 },
      { id: 'ni4', name: 'Veg Kolhapuri', price: 89 },
      { id: 'ni5', name: 'Paneer Peshawari', price: 116 },
      { id: 'ni6', name: 'Paneer Lajawab', price: 116 },
      { id: 'ni7', name: 'Paneer Pasanda', price: 137 },
      { id: 'ni8', name: 'Veg Anda Curry', price: 126 },
      { id: 'ni9', name: 'Steamed Rice', price: 69 },
      { id: 'ni10', name: 'Jeera Rice', price: 79 },
      { id: 'ni11', name: 'Dal Khichdi', price: 79 },
      { id: 'ni12', name: 'Veg Pulao', price: 95 },
      { id: 'ni13', name: 'Veg Biryani', price: 95 },
      { id: 'ni14', name: 'Paneer Pulao', price: 116 },
      { id: 'ni15', name: 'Veg Pulao Thali', price: 76 },
      { id: 'ni16', name: 'Lunch Thali', price: 74 },
    ],
  },
  {
    section: 'Breakfast',
    window: 5,
    windowName: 'Breakfast Counter',
    emoji: '🍽️',
    waitMinutes: 7,
    items: [
      { id: 'bf1', name: 'Toast with Butter', price: 23 },
      { id: 'bf2', name: 'Toast, Butter & Jam', price: 27 },
      { id: 'bf3', name: 'Upma', price: 10 },
      { id: 'bf4', name: 'Potato Poha', price: 32 },
      { id: 'bf5', name: 'Vada Pav', price: 17 },
      { id: 'bf6', name: 'Missal Pav', price: 38 },
      { id: 'bf7', name: 'Batata Wada (2 Pcs)', price: 32 },
      { id: 'bf8', name: 'Idli Sambhar', price: 32 },
      { id: 'bf9', name: 'Butter Idli', price: 43 },
      { id: 'bf10', name: 'Medu Wada Sambhar', price: 43 },
      { id: 'bf11', name: 'Idli / Medu Wada', price: 39 },
      { id: 'bf12', name: 'Idli Fry', price: 43 },
      { id: 'bf13', name: 'Dahi Idli', price: 43 },
    ],
  },
  {
    section: 'South Indian',
    window: 6,
    windowName: 'South Indian Counter',
    emoji: '🫕',
    waitMinutes: 12,
    items: [
      { id: 'si1', name: 'Sada Dosa', price: 32 },
      { id: 'si2', name: 'Butter Sada Dosa', price: 39 },
      { id: 'si3', name: 'Masala Dosa', price: 39 },
      { id: 'si4', name: 'Mysore Sada Dosa', price: 43 },
      { id: 'si5', name: 'Mysore Masala Dosa', price: 60 },
      { id: 'si6', name: 'Cheese Sada Dosa', price: 60 },
      { id: 'si7', name: 'Cheese Masala Dosa', price: 63 },
      { id: 'si8', name: 'Plain Uttapam', price: 32 },
      { id: 'si9', name: 'Tomato Uttapam', price: 39 },
      { id: 'si10', name: 'Onion Uttapam', price: 43 },
      { id: 'si11', name: 'Tomato Onion Uttapam', price: 43 },
      { id: 'si12', name: 'Schezwan Dosa', price: 50 },
      { id: 'si13', name: 'Cheese Schezwan Dosa', price: 50 },
    ],
  },
  {
    section: 'Pav Bhaji',
    window: 7,
    windowName: 'Pav Bhaji Counter',
    emoji: '🫓',
    waitMinutes: 10,
    items: [
      { id: 'pb1', name: 'Pav Bhaji', price: 63 },
      { id: 'pb2', name: 'Cheese Pav Bhaji', price: 83 },
      { id: 'pb3', name: 'Extra Pav', price: 12 },
    ],
  },
  {
    section: 'Chinese',
    window: 8,
    windowName: 'Chinese Counter',
    emoji: '🥡',
    waitMinutes: 14,
    items: [
      { id: 'cn1', name: 'Veg Fried Rice', price: 69 },
      { id: 'cn2', name: 'Schezwan Fried Rice', price: 76 },
      { id: 'cn3', name: 'Hong Kong Fried Rice', price: 83 },
      { id: 'cn4', name: 'Singapore Fried Rice', price: 83 },
      { id: 'cn5', name: 'Veg Hakka Noodles', price: 69 },
      { id: 'cn6', name: 'Veg Schezwan Noodles', price: 83 },
      { id: 'cn7', name: 'Veg Hong Kong Noodles', price: 83 },
    ],
  },
  {
    section: 'Chinese Starters',
    window: 8,
    windowName: 'Chinese Counter',
    emoji: '🍜',
    waitMinutes: 14,
    items: [
      { id: 'cs1', name: 'Veg Crispy', price: 76 },
      { id: 'cs2', name: 'Veg Chilly Dry', price: 76 },
      { id: 'cs3', name: 'Paneer Chilly Dry', price: 95 },
      { id: 'cs4', name: 'Paneer Schezwan Dry', price: 88 },
      { id: 'cs5', name: 'Veg Manchurian Dry', price: 69 },
      { id: 'cs6', name: 'Mushroom Chilly Dry', price: 107 },
      { id: 'cs7', name: 'Paneer Crispy', price: 101 },
      { id: 'cs8', name: 'Idli Chilly Dry', price: 76 },
      { id: 'cs9', name: 'Idli Schezwan Dry', price: 76 },
      { id: 'cs10', name: 'Schezwan Crispy Fried Potato', price: 83 },
    ],
  },
  {
    section: 'Franky',
    window: 9,
    windowName: 'Franky Counter',
    emoji: '🌯',
    waitMinutes: 8,
    items: [
      { id: 'fk1', name: 'Veg Franky', price: 43 },
      { id: 'fk2', name: 'Paneer Franky', price: 58 },
      { id: 'fk3', name: 'Paneer Chilly Franky', price: 63 },
      { id: 'fk4', name: 'Manchurian Franky', price: 58 },
    ],
  },
  {
    section: 'Beverages',
    window: 10,
    windowName: 'Beverage Counter',
    emoji: '☕',
    waitMinutes: 5,
    items: [
      { id: 'bv1', name: 'Tea', price: 15 },
      { id: 'bv2', name: 'Nescafe', price: 19 },
      { id: 'bv3', name: 'Hot Milk', price: 25 },
      { id: 'bv4', name: 'Double Tea', price: 26 },
      { id: 'bv5', name: 'Double Coffee', price: 32 },
      { id: 'bv6', name: 'Hot Chocolate', price: 50 },
      { id: 'bv7', name: 'Hot Bournvita', price: 50 },
      { id: 'bv8', name: 'Sweet Lassi', price: 38 },
      { id: 'bv9', name: 'Kesar Lassi', price: 58 },
      { id: 'bv10', name: 'Dry Fruits Lassi', price: 76 },
      { id: 'bv11', name: 'Mango Lassi', price: 69 },
      { id: 'bv12', name: 'Water Melon Juice', price: 50 },
      { id: 'bv13', name: 'Mosambi Juice', price: 58 },
      { id: 'bv14', name: 'Orange Juice', price: 58 },
      { id: 'bv15', name: 'Pineapple Juice', price: 58 },
      { id: 'bv16', name: 'Butter Milk', price: 25 },
      { id: 'bv17', name: 'Fresh Lime Water', price: 18 },
      { id: 'bv18', name: 'Chikoo Milk Shake', price: 63 },
      { id: 'bv19', name: 'Chocolate Milk Shake', price: 63 },
      { id: 'bv20', name: 'Banana Milk Shake', price: 50 },
      { id: 'bv21', name: 'Rose Milk Shake', price: 63 },
      { id: 'bv22', name: 'Kesar Milk Shake', price: 63 },
      { id: 'bv23', name: 'Cold Coffee', price: 58 },
      { id: 'bv24', name: 'Cold Coffee with Ice Cream', price: 63 },
      { id: 'bv25', name: 'Chikoo Chocolate Milk Shake', price: 69 },
    ],
  },
  {
    section: 'Fruits',
    window: 10,
    windowName: 'Beverage Counter',
    emoji: '🍉',
    waitMinutes: 3,
    items: [
      { id: 'fr1', name: 'Cut Fruit Salad', price: 63 },
    ],
  },
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Menu endpoint
app.get('/api/menu', (req, res) => {
  res.json(menuSections);
});

// Orders endpoint & storage
const activeOrdersDB = [];

app.post('/api/orders', (req, res) => {
  const { items, totalPrice } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const orderId = 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);
  const newOrder = {
    id: orderId,
    items,
    totalPrice,
    status: 'active',
    createdAt: new Date().toISOString()
  };

  activeOrdersDB.push(newOrder);

  res.status(201).json({ success: true, order: newOrder });
});

// Auth endpoint
const users = [{ username: 'shaurya', password: 'password123' }];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Attendance endpoint
const attendanceData = [
  { srNo: 1, course: 'Constitution of India', type: 'Theory', conducted: 3, attended: 3, exemption: 0, total: 3, percent: 100.00, notUpdated: 0 },
  { srNo: 2, course: 'English Communication', type: 'Practical', conducted: 10, attended: 9, exemption: 0, total: 9, percent: 90.00, notUpdated: 0 },
  { srNo: 3, course: 'Linear Algebra and Differential Equatio', type: 'Theory', conducted: 12, attended: 12, exemption: 0, total: 12, percent: 90.00, notUpdated: 0 },
  { srNo: 4, course: 'Linear Algebra and Differential Equatio', type: 'Practical', conducted: 8, attended: 6, exemption: 0, total: 6, percent: null, notUpdated: 0 },
  { srNo: 5, course: 'Principles of Economics and Management', type: 'Theory', conducted: 9, attended: 8, exemption: 0, total: 8, percent: 88.89, notUpdated: 0 },
  { srNo: 6, course: 'PROGRAMMING WITH PYTHON', type: 'Theory', conducted: 3, attended: 3, exemption: 0, total: 3, percent: 77.78, notUpdated: 0 },
  { srNo: 7, course: 'PROGRAMMING WITH PYTHON', type: 'Practical', conducted: 6, attended: 4, exemption: 0, total: 4, percent: null, notUpdated: 0 },
  { srNo: 8, course: 'ENVIRONMENTAL STUDIES', type: 'Theory', conducted: 4, attended: 3, exemption: 0, total: 3, percent: 75.00, notUpdated: 0 },
  { srNo: 9, course: 'ELEMENTS OF BIOLOGY', type: 'Theory', conducted: 9, attended: 9, exemption: 0, total: 9, percent: 100.00, notUpdated: 0 },
  { srNo: 10, course: 'ELEMENTS OF BIOLOGY', type: 'Tutorial', conducted: 4, attended: 4, exemption: 0, total: 4, percent: null, notUpdated: 0 },
  { srNo: 11, course: 'INTELLIGENT SYSTEMS', type: 'Theory', conducted: 7, attended: 7, exemption: 0, total: 7, percent: 100.00, notUpdated: 0 },
  { srNo: 12, course: 'INTELLIGENT SYSTEMS', type: 'Practical', conducted: 6, attended: 6, exemption: 0, total: 6, percent: null, notUpdated: 0 },
  { srNo: 13, course: 'TRANSFORMING IDEAS TO INNOVATION', type: 'Practical', conducted: 10, attended: 10, exemption: 0, total: 10, percent: 100.00, notUpdated: 0 },
  { srNo: 14, course: 'PRODUCT REALIZATION', type: 'Theory', conducted: 5, attended: 4, exemption: 0, total: 4, percent: 81.82, notUpdated: 0 },
  { srNo: 15, course: 'PRODUCT REALIZATION', type: 'Practical', conducted: 6, attended: 5, exemption: 0, total: 5, percent: null, notUpdated: 0 }
];

app.get('/api/attendance', (req, res) => {
  res.json(attendanceData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API Server running on port ${PORT}`);
});
