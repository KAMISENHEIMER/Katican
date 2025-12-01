import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import BookCard from '../components/BookCard.tsx';
import BookModal from '../components/BookModal.tsx';
import '../styles/Library.css';

// CHANGE HERE to when switching to render
const API_URL = "http://localhost:3000"; 

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  
  //get category from URL parameter
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  //filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title'); 
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch books:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const getProcessedBooks = () => {
    let processed = [...books];

    if (activeCategory && activeCategory !== 'All Collection') {
      processed = processed.filter(book => 
        book.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      processed = processed.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) || 
        book.author.toLowerCase().includes(lowerQuery)
      );
    }

    processed.sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'author') return a.author.localeCompare(b.author);
      if (sortOption === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    return processed;
  };

  const visibleBooks = getProcessedBooks();

  const handleCategoryChange = (category) => {
    if (activeCategory.toLowerCase() === category.toLowerCase()) {
      setActiveCategory('');
      setSearchParams({});
    } else {
      setActiveCategory(category);
      setSearchParams({ category });
    }
  };

  const handleCheckout = (bookId, userName) => {
    fetch(`${API_URL}/checkout`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, userName })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Book successfully checked out!");
        setBooks(prevBooks => prevBooks.map(b => 
          b._id === bookId ? { ...b, status: 'checked out', checkedOutBy: userName } : b
        ));
        setSelectedBook(null);
      }
    })
    .catch(err => console.error("Checkout failed:", err));
  };

  return (
    <div className="library-container">
      <Navbar />
      
      <div className="library-header">
        <h1 className="library-title">LIBRARY</h1>
        
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Search by Title or Author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="library-ocean-layer">
        <div className="library-content-wrapper">
          
          {/* left: book grid */}
          <div className="library-grid">
            {loading ? (
              <div className="loading-state">Accessing Archives...</div>
            ) : visibleBooks.length > 0 ? (
              visibleBooks.map(book => (
                <BookCard 
                  key={book._id} 
                  book={book} 
                  onClick={() => setSelectedBook(book)} 
                />
              ))
            ) : (
              <div className="empty-state">No books matching your criteria.</div>
            )}
          </div>

          {/* right: filters */}
          <aside className="library-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Sort Archives</h3>
              <select 
                className="sort-select" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="title">Alphabetical (A-Z)</option>
                <option value="author">Author (A-Z)</option>
                <option value="status">Availability</option>
              </select>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Filter by Category</h3>
              <div className="filter-group">
                {['Fantasy', 'Space', 'Heroes'].map(cat => (
                  <label key={cat} className="filter-label">
                    <input 
                      type="checkbox" 
                      className="filter-checkbox"
                      checked={activeCategory.toLowerCase() === cat.toLowerCase()}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Status</h3>
              <div className="filter-group">
                 <label className="filter-label">
                   <input type="checkbox" className="filter-checkbox" defaultChecked />
                   Show Checked Out
                 </label>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* modal overlay */}
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default Library;