import { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import '../styles/BookModal.css';
import type { Book } from '../types';

interface BookModalProps {
  book: Book;
  onClose: () => void;
  onCheckout?: (bookId: string, userName: string) => void;
  onCheckIn?: (bookId: string) => void;
  onRead?: () => void;
  isOwner?: boolean;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose, onCheckout, onCheckIn, onRead, isOwner = false }) => {
  const [userName, setUserName] = useState('');
  
  const handleCheckoutClick = () => {
    if (!userName.trim()) {
      alert("Enter your name to check out this book.");
      return;
    }
    onCheckout!(book._id, userName);
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

            <span className="tags-section"><strong>TAGS:</strong>
            {book.tags && book.tags.length > 0 && (
              <span className="detail-tags">
                {book.tags.map((tag, index) => (
                  <span key={index} className="modal-tag-pill">
                    {tag}
                  </span>
                ))}
              </span>
            )}</span>            

            <p className="detail-desc">
              {book.description || "No description exists."}
            </p>

            <div className="detail-actions">
              {/* if is owned by you */}
              {isOwner ? (
                <div className="owner-actions">
                  <button className="read-now-btn" onClick={onRead}>
                    <BookOpen size={18} style={{marginRight: '8px'}}/> 
                    Read Now
                  </button>
                  <button className="return-btn-small" onClick={() => onCheckIn!(book._id)}>
                    Return Book
                  </button>
                </div>
              ) : (
                /* library views */
                book.status === 'available' ? (
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
                      Due: {book.dueDate ? new Date(book.dueDate).toLocaleString() : 'N/A'}
                    </div>
                    {/* temp button to force a chekin */}
                    {/* {onCheckIn && <button className="checkin-btn" onClick={() => onCheckIn(book._id)}>Return Book</button>} */}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;