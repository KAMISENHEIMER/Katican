import React from 'react';
import '../styles/ReadingModal.css';
import { X } from 'lucide-react';


const ReadingModal = ({ book, onClose, onReturn }) => {
  if (!book) return null;

  const handleReturnClick = () => {
    if (window.confirm("Finish reading and return this book?")) {
      onReturn(book._id);
    }
  };

  return (
    <div className="reading-modal-overlay">
      <div className="reading-modal-content">
        <button className="reading-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="reading-inner-wrapper">
          <h1 className="reading-title">{book.title}</h1>
          <p className="reading-author">By {book.author}</p>

          <div className="reading-text-body">
            <p>
              BOOK TEXT GOES HERE
            </p>
          </div>

          <div className="reading-footer">
            <button className="reading-return-btn" onClick={handleReturnClick}>
              Return Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;
