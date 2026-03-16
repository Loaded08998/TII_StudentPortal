import React, { useState } from 'react';
import './Library.css';

const allBooks = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Thomas Cormen', category: 'Computer Science', available: true, cover: '📘' },
  { id: 2, title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', available: true, cover: '📗' },
  { id: 3, title: 'Physics for Scientists', author: 'Raymond Serway', category: 'Physics', available: false, cover: '📕' },
  { id: 4, title: 'Digital Design', author: 'M. Morris Mano', category: 'Engineering', available: true, cover: '📙' },
  { id: 5, title: 'Organic Chemistry', author: 'Paula Bruice', category: 'Chemistry', available: false, cover: '📓' },
  { id: 6, title: 'Microelectronic Circuits', author: 'Adel Sedra', category: 'Engineering', available: true, cover: '📒' },
  { id: 7, title: 'Linear Algebra Done Right', author: 'Sheldon Axler', category: 'Mathematics', available: true, cover: '📗' },
  { id: 8, title: 'Operating System Concepts', author: 'Abraham Silberschatz', category: 'Computer Science', available: true, cover: '📘' },
  { id: 9, title: 'Fundamentals of Physics', author: 'Halliday & Resnick', category: 'Physics', available: true, cover: '📕' },
];

const categories = ['All', 'Computer Science', 'Mathematics', 'Physics', 'Engineering', 'Chemistry'];

function Library() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [borrowed, setBorrowed] = useState([]);

  const filtered = allBooks.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'All' || book.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const toggleBorrow = (id) => {
    setBorrowed((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="library-page">
      <div className="page-header">
        <h2>Library 📚</h2>
        <p>Browse and borrow from our collection of academic resources</p>
      </div>

      {/* Search Bar */}
      <div className="library-search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="library-search"
        />
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="book-grid">
        {filtered.map((book) => {
          const isBorrowed = borrowed.includes(book.id);
          return (
            <div className="book-card card" key={book.id}>
              <div className="book-cover">{book.cover}</div>
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.author}</p>
                <div className="book-meta">
                  <span className={`badge ${book.available ? 'badge-success' : 'badge-danger'}`}>
                    {book.available ? 'Available' : 'Checked Out'}
                  </span>
                </div>
                {book.available && (
                  <button
                    className={isBorrowed ? 'btn-secondary' : 'btn-primary'}
                    onClick={() => toggleBorrow(book.id)}
                    style={{ marginTop: '12px', width: '100%' }}
                  >
                    {isBorrowed ? 'Return' : 'Borrow'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default Library;
