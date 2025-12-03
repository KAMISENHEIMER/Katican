import BookCard from '../components/BookCard.tsx';
import '../styles/Library.css';
import type { Book } from '../types'; // Import shared type

interface LibraryGridProps {
  loading: boolean;
  books: Book[];
  onBookClick: (book: Book) => void;
}

const LibraryGrid: React.FC<LibraryGridProps> = ({ loading, books, onBookClick }) => {
  return (
    <div className="library-grid">
      {loading ? (
        <div className="loading-state">Our scribes are retrieving the books... <br />This may take a second.</div>
      ) : books.length > 0 ? (
        books.map(book => (
          <BookCard 
            key={book._id} 
            book={book} 
            onClick={() => onBookClick(book)} 
          />
        ))
      ) : (
        <div className="empty-state">No books found.</div>
      )}
    </div>
  );
};

export default LibraryGrid;