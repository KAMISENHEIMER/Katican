import { useState, useEffect } from 'react';
import '../styles/ReadingModal.css';
import { X } from 'lucide-react';
import type { Book } from '../types';

// const API_URL = "http://localhost:3000";
const API_URL = "https://katican-api.onrender.com";

interface ReadingModalProps {
  book: Book | null;
  onClose: () => void;
  onReturn: (bookId: string) => void;
}

const ReadingModal: React.FC<ReadingModalProps> = ({ book, onClose, onReturn }) => {
  const [fullContent, setFullContent] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch full content when modal opens
  useEffect(() => {
    if (book && book._id) {
      setLoading(true);
      
      fetch(`${API_URL}/books/${book._id}`)
        .then(res => res.json())
        .then(data => {
          // The backend returns the full object with 'content'
          setFullContent(data.content);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch book content:", err);
          setLoading(false);
        });
    }
  }, [book]); // Runs whenever the 'book' prop changes
  
  if (!book) return null;

  const handleReturnClick = () => {
    if (window.confirm("Finish reading and return this book?")) {
      onReturn(book._id);
    }
  };

  let bookContent;
  if (loading) {
    bookContent = "<p><i>Loading book content</i></p>";
  } else if (fullContent) {
    bookContent = fullContent;
  } else {
    bookContent = "<p><i>Error loading book content.</i></p>";
  }

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
            <div className="reading-text-body">
              <div dangerouslySetInnerHTML={{ __html: bookContent }} />
            </div>
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
