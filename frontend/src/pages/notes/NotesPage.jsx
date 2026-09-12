// src/pages/notes/NotesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/common/Layout';
import NotesSidebar from './NotesSidebar';
import NoteEditor from './NoteEditor';
import { getNotes, createNote, updateNote, deleteNote } from '../../api/notes.api';
import toast from 'react-hot-toast';

export default function NotesPage() {
  const [notes,            setNotes]            = useState([]);
  const [activeNote,       setActiveNote]       = useState(null);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showEditor,       setShowEditor]       = useState(false); // mobile toggle

  useEffect(() => {
    getNotes().then((data) => {
      setNotes(data);
      if (data.length > 0) setActiveNote(data[0]);
    });
  }, []);

  /* ---------- Filtered notes ---------- */
  const filtered = notes.filter((n) => {
    if (selectedCategory && n.category !== selectedCategory) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !n.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  /* ---------- Handlers ---------- */
  const handleSelect = (note) => { setActiveNote(note); setShowEditor(true); };

  const handleNew = async () => {
    const newNote = await createNote({
      title:     '',
      content:   '',
      category:  selectedCategory || 'Snippets',
      tags:      [],
      updatedAt: new Date().toISOString(),
    });
    setNotes((prev) => [newNote, ...prev]);
    setActiveNote(newNote);
    setShowEditor(true);
  };

  const handleSave = useCallback(async (updated) => {
    const saved = await updateNote(updated.id, updated);
    setNotes((prev) => prev.map((n) => (n.id === saved.id ? saved : n)));
    setActiveNote(saved);
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(filtered.find((n) => n.id !== id) ?? null);
    toast.success('Note deleted.');
  };

  return (
    <Layout title="Notes">
      {/* Override Layout's padding — Notes needs a full-height two-column layout */}
      <div className="flex h-full -m-4 md:-m-8 overflow-hidden">
        {/* Sidebar — hidden on mobile when editor is open */}
        <div className={`${showEditor ? 'hidden md:flex' : 'flex'} h-full`}>
          <NotesSidebar
            notes={filtered}
            activeNoteId={activeNote?.id}
            onSelectNote={handleSelect}
            onDeleteNote={handleDelete}
            onNewNote={handleNew}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Editor */}
        <div className={`flex-1 flex flex-col overflow-hidden ${showEditor ? 'flex' : 'hidden md:flex'}`}>
          {/* Mobile back button */}
          {showEditor && (
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border-b border-[#464554] text-[#c0c1ff] text-[14px]"
              onClick={() => setShowEditor(false)}
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              All Notes
            </button>
          )}
          <NoteEditor note={activeNote} onSave={handleSave} />
        </div>
      </div>
    </Layout>
  );
}
