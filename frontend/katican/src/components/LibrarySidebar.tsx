import React from 'react';
import '../styles/LibrarySidebar.css';

const LibrarySidebar = ({ 
  sortOption, 
  setSortOption, 
  selectedTags, 
  toggleTag, 
  allTags, 
  showAvailable, 
  setShowAvailable, 
  showCheckedOut, 
  setShowCheckedOut 
}) => {
  return (
    <aside className="library-sidebar">
      
      {/* sort */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Sort Archives</h3>
        <select 
          className="sort-select" 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title">Title (A-Z)</option>
          <option value="author">Author (A-Z)</option>
        </select>
      </div>

      {/* tags */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Filter Tags</h3>
        <div className="tags-container">
          {allTags.map(tag => (
            <button 
              key={tag} 
              className={`tag-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* statuses */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Status</h3>
        <div className="status-toggles">
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showAvailable}
              onChange={(e) => setShowAvailable(e.target.checked)}
            />
            <span className="toggle-text">Show Available</span>
          </label>
          
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showCheckedOut}
              onChange={(e) => setShowCheckedOut(e.target.checked)}
            />
            <span className="toggle-text">Show Checked Out</span>
          </label>
        </div>
      </div>

    </aside>
  );
};

export default LibrarySidebar;