import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/BookModal.css';

const BookModal = ({ book, onClose, onCheckout, onCheckIn }) => {
  const [userName, setUserName] = useState('');
  
  const handleCheckoutClick = () => {
    if (!userName.trim()) {
      alert("Enter your name to check out this book.");
      return;
    }
    onCheckout(book._id, userName);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-grid">
          {/* left side: placeholder cover */}
          <div className="modal-cover">
            <h2 className="modal-cover-title">{book.title}</h2>
          </div>

          {/* right side: details */}
          <div className="modal-details">
            <h2 className="detail-title">{book.title}</h2>
            <p className="detail-author">Written by {book.author}</p>
            
            <div className="detail-meta">
              <span><strong>ISBN:</strong> {book.isbn || 'Unknown'}</span>
              <span><strong>Publisher:</strong> {book.publisher || 'Unknown'}</span>
            </div>

            <p className="detail-desc">
              {book.description || "This manuscript contains ancient wisdom. No further description is available in the archives."}
            </p>

            <div className="detail-actions">
              {book.status === 'available' ? (
                <div className="checkout-form">
                  <input 
                    type="text" 
                    placeholder="Sign your name..." 
                    className="name-input"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <button className="checkout-btn" onClick={handleCheckoutClick}>
                    Check Out
                  </button>
                </div>
              ) : (
                <div className="checked-out-info">
                  <div className="checked-out-msg">
                    This book is currently checked out.
                    <br/>
                    Due: {new Date(book.dueDate).toLocaleDateString()}
                    
                </div>
                  {/* temp button to force a chekin */}
                  <button 
                    className="checkin-btn" 
                    onClick={() => onCheckIn(book._id)}> 
                    Check-In 
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;