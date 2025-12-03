import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import BookModal from '../components/BookModal.tsx';
import LibraryGrid from '../components/LibraryGrid';
import LibrarySidebar from '../components/LibrarySidebar';
import '../styles/Library.css';

// const API_URL = "http://localhost:3000";
const API_URL = "https://katican-api.onrender.com";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  //get category from URL parameter
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  //filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');

  //tag - filters
  const [selectedTags, setSelectedTags] = useState(
    initialCategory
      ? [initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)] : []
  );

  //status - filters
  const [showAvailable, setShowAvailable] = useState(true);
  const [showCheckedOut, setShowCheckedOut] = useState(true);

  const allTags = [
    'Fantasy', 'Space', 'Heroes',
    'Comedy', 'Tragedy', 'Poetry',
    'Adventure',
  ];

  //fetch entire book list
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

  //apply filtering to books
  const getProcessedBooks = () => {
    let processed = [...books];

    //filter by selected tags
    if (selectedTags.length > 0) {
      processed = processed.filter(book => 
        book.tags && Array.isArray(book.tags) && 
        selectedTags.every(selectedTag => 
          book.tags.some(bookTag => 
            bookTag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      );
    }

    //filter by selected statuses
    processed = processed.filter(book => {
      if (book.status === 'available' && !showAvailable) return false;
      if (book.status !== 'available' && !showCheckedOut) return false;
      return true;
    });

    //filter by search bar
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      processed = processed.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
      );
    }

    //sort by chosen option
    processed.sort((a, b) => {
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'author') return a.author.localeCompare(b.author);
      // if (sortOption === 'status') return a.status.localeCompare(b.status);
      //add upload date
      //add likes?
      return 0;
    });

    return processed;
  };

  const visibleBooks = getProcessedBooks();

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  //checkout logic
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
          alert("Book successfully checked out! \nView your shelf to read!");
          setBooks(prevBooks => prevBooks.map(b =>
            b._id === bookId ? { ...b, status: 'checked out', checkedOutBy: userName } : b
          ));
          setSelectedBook(null);
        }
      })
      .catch(err => console.error("Checkout failed:", err));
  };

  //check-in logic
  const handleCheckIn = (bookId) => {
    fetch(`${API_URL}/checkin`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Book successfully returned!");
        setBooks(prevBooks => prevBooks.map(b => 
          b._id === bookId ? { ...b, status: 'available', checkedOutBy: null, dueDate: null } : b
        ));
        setSelectedBook(null);
      }
    })
    .catch(err => console.error("Check-in failed:", err));
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

          <LibraryGrid
            loading={loading}
            books={visibleBooks}
            onBookClick={setSelectedBook}
          />

          <LibrarySidebar
            sortOption={sortOption}
            setSortOption={setSortOption}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            allTags={allTags}
            showAvailable={showAvailable}
            setShowAvailable={setShowAvailable}
            showCheckedOut={showCheckedOut}
            setShowCheckedOut={setShowCheckedOut}
          />
        </div>
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onCheckout={handleCheckout}
          onCheckIn={handleCheckIn}
        />
      )}
    </div>
  );
};

export default Library;