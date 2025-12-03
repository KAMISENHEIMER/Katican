import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LibraryBookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import ReadingModal from '../components/ReadingModal';
import '../styles/Shelf.css';
import type { Book } from '../types';

// const API_URL = "http://localhost:3000";
const API_URL = "https://katican-api.onrender.com";

const Shelf: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string>(localStorage.getItem('katican_user') || '');
  const [inputName, setInputName] = useState<string>('');
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // modal states
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  
  const navigate = useNavigate();

  //fetch user's books
  const fetchMyShelf = (username: string) => {
    setLoading(true);
    fetch(`${API_URL}/books`)
      .then(res => res.json())
      .then((data: Book[]) => {
        //filter for books checked out by this specific user
        const userBooks = data.filter(b => 
          b.status === 'checked out' && 
          b.checkedOutBy && 
          b.checkedOutBy.toLowerCase() === username.toLowerCase()
        );
        setMyBooks(userBooks);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  //check if user is already logged in
  useEffect(() => {
    if (currentUser) {
      fetchMyShelf(currentUser);
    }
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    localStorage.setItem('katican_user', inputName);
    setCurrentUser(inputName);
  };

  const handleLogout = () => {
    localStorage.removeItem('katican_user');
    setCurrentUser('');
    setMyBooks([]);
  };

  //reading modal
  const handleRead = (bookId: string) => {
    const book = myBooks.find(b => b._id === bookId);
    setReadingBook(book!);
    setSelectedBook(null);
  };


  const closeReading = () => {
    setReadingBook(null);
  };

  //handle returns from shelf
  const handleReturn = (bookId: string) => {
    fetch(`${API_URL}/checkin`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId })
    })
    .then(res => res.json())
    .then(() => {
      alert("Returned to the library.");
      //update your shelf
      fetchMyShelf(currentUser);
      setSelectedBook(null);
      setReadingBook(null);
    });
  };

  return (
    <div className="shelf-container">
      <Navbar />
      
      {!currentUser ? (
        //display login
        <div className="shelf-login">
          <div className="login-card">
            <h1 className="shelf-title">Personal Archive</h1>
            <p>Enter your name to retrieve your collection.</p>
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                className="shelf-input" 
                placeholder="Your Name..." 
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              <button type="submit" className="shelf-btn">Access Shelf</button>
            </form>
          </div>
        </div>
      ) : (
        //display shelf
        <div className="shelf-view">
          <div className="shelf-header">
            <div>
              <h1 className="shelf-title">Your Shelf</h1>
              <p className="shelf-subtitle">You have {myBooks.length} book checked out.</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">Sign Out</button>
          </div>

          {loading ? (
            <div className="shelf-loading">Retrieving Books...</div>
          ) : (
            <div className="shelf-grid">
              {myBooks.length > 0 ? (
                myBooks.map(book => (
                  <LibraryBookCard 
                    key={book._id} 
                    book={book} 
                    onClick={() => setSelectedBook(book)} 
                  />
                ))
              ) : (
                <div className="empty-shelf">
                  <p>Your shelf is empty.</p>
                  <button onClick={() => navigate('/library')} className="browse-btn">Browse Library</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* book details modal */}
      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
          isOwner={true}
          onRead={() => handleRead(selectedBook._id)}
          onCheckIn={handleReturn}
        />
      )}

      {/* reading modal */}
      {readingBook && (
        <ReadingModal 
          book={readingBook} 
          onClose={closeReading} 
          onReturn={handleReturn}
        />
      )}
    </div>
  );
};

export default Shelf;