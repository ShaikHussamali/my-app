
import './App.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';



function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [searchText, setSearchText] = useState('');

  function addNote() {
    if (newNoteText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      setNewNoteText('');
    }
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function handleNewNoteTextChange(event) {
    setNewNoteText(event.target.value);
  }

  function handleSearchTextChange(event) {
    setSearchText(event.target.value);
  }

  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()));

  
  function handleSearch() {
    const searchInput = document.getElementById('search-input');
    setSearchText(searchInput.value);
  }


  return (
    <div>
      <h2>Notes</h2>
      <div style={{ display: 'flex',
        width:'400px',
        alignItems: 'center' }}>
        <input
          type="text"
          id="search-input"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search notes"
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <textarea
        value={newNoteText}
        onChange={handleNewNoteTextChange}
        placeholder="type here to add notes..."
      />
      <button onClick={addNote}>Save</button>
      <div>
        {notes.map((note) => (
          <div key={note.id} style={{ 
               backgroundColor: 'rgb(216, 224, 128)',
               border: 'transparent',   
               padding: '10px', 
               margin: '10px 0',
               borderRadius:'6px', 
               display:'block',
               }}>
            <p>{note.timestamp}</p>
            <p>{note.text}</p>
            <button className='delete' onClick={() => deleteNote(note.id)} >
            <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
