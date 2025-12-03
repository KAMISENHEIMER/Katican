import BookCard from '../components/BookCard.tsx';
import '../styles/Library.css';

const LibraryGrid = ({ loading, books, onBookClick }) => {
  return (
    <div className="library-grid">
      {loading ? (
        <div className="loading-state">Accessing Archives...</div>
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