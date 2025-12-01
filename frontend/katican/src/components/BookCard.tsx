import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book, onClick }) => {
  // placeholder color based on title length
  const hue = (book.title.length * 25) % 360; 
  const placeholderStyle = {
    backgroundColor: `hsl(${hue}, 40%, 20%)`,
    boxShadow: `0 0 20px hsl(${hue}, 40%, 10%)`
  };

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-cover" style={placeholderStyle}>
        {/* placeholder text as cover */}
        <span className="cover-title">{book.title.substring(0, 2)}</span>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">By {book.author}</p>
        
        <div className={`book-status ${book.status === 'available' ? 'status-available' : 'status-checked'}`}>
          {book.status === 'available' ? 'Available' : 'Checked Out'}
        </div>
      </div>
    </div>
  );
};

export default BookCard;