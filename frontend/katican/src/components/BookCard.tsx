import '../styles/BookCard.css';
import type { Book } from '../types.tsx';

// helper to create placeholder title
const acronym = (str: string) =>
  str
    .split(" ")
    .map(word => word[0]?.toUpperCase())
    .join("")
    .slice(0, 3); // max 3 letters

interface BookCardProps {
  book: Book;
  onClick: () => void;
}
    
const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {

  return (
    <div className="book-card" onClick={onClick}>
      {/* placeholder cover, clear background and text */}
      <div className="book-cover">
        <span className="cover-title">{acronym(book.title)}</span>
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