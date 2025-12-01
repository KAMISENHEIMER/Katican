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
  const [searchParams] = useSearchParams();
  
  //get category from URL parameter
  const activeCategory = searchParams.get('category') || 'All Stories';

  //fetch books on Load
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

  //filter logic, MOVE THIS TO EXPRESS?
  const filteredBooks = activeCategory === 'All Stories' 
    ? books 
    : books.filter(book => book.category?.toLowerCase() === activeCategory.toLowerCase());

  //checkout book
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
        //update locally to avoid refresh
        setBooks(prevBooks => prevBooks.map(b => 
          b._id === bookId ? { ...b, status: 'checked out', checkedOutBy: userName } : b
        ));
        setSelectedBook(null); //close modal
      }
    })
    .catch(err => console.error("Checkout failed:", err));
  };

  return (
    <div className="library-container">
      <Navbar />
      
      {/* split these into separate components? */}
      {/* header */}
      <div className="library-header">
        <h1 className="library-title">{activeCategory.toUpperCase()}</h1>
        <p className="library-subtitle">
          {filteredBooks.length} Books Found
        </p>
      </div>

      {/* book display */}
      {loading ? (
        <div className="loading-state">Accessing Archives...</div>
      ) : (
        <div className="library-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard 
                key={book._id} 
                book={book} 
                onClick={() => setSelectedBook(book)} 
              />
            ))
          ) : (
            <div className="empty-state">No books found in this section.</div>
          )}
        </div>
      )}

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