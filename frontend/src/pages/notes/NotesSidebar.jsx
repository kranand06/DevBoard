// src/pages/notes/NotesSidebar.jsx
import React from 'react';
import NoteCard from './NoteCard';
import { Plus, Search } from 'lucide-react';
import { NOTE_CATEGORIES } from '../../utils/constants';

export default function NotesSidebar({
  notes,
  activeNoteId,
  onSelectNote,
  onDeleteNote,
  onNewNote,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="w-72 flex-shrink-0 h-full bg-[#0b1326] border-r border-[#464554] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#464554]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Notes</h2>
          <span className="text-[10px] text-[#c7c4d7] bg-[#222a3d] px-2 py-0.5 rounded-full border border-[#464554] font-['JetBrains_Mono']">
            {notes.length}
          </span>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#464554]" />
          <input
            type="text"
            placeholder="Search notes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131b2e] border border-[#464554] rounded-lg pl-8 pr-3 py-2 text-[13px] text-[#dae2fd] placeholder-[#464554] focus:outline-none focus:border-[#c0c1ff] transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-3 border-b border-[#464554]">
        <p className="text-[10px] text-[#908fa0] uppercase tracking-wider font-['JetBrains_Mono'] mb-2 px-1">Categories</p>
        <div className="space-y-0.5">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
              !selectedCategory ? 'bg-[#c0c1ff]/10 text-[#c0c1ff]' : 'text-[#c7c4d7] hover:bg-[#171f33]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">folder</span>
              All Notes
            </div>
            <span className="text-[10px] font-['JetBrains_Mono']">{notes.length}</span>
          </button>
          {NOTE_CATEGORIES.map((cat) => {
            const count = notes.filter((n) => n.category === cat.label).length;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label === selectedCategory ? '' : cat.label)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  selectedCategory === cat.label
                    ? 'bg-[#c0c1ff]/10 text-[#c0c1ff]'
                    : 'text-[#c7c4d7] hover:bg-[#171f33]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                  {cat.label}
                </div>
                <span className="text-[10px] font-['JetBrains_Mono']">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-3xl text-[#464554]">note_add</span>
            <p className="text-[12px] text-[#908fa0] mt-2">No notes yet.</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isActive={activeNoteId === note.id}
              onClick={() => onSelectNote(note)}
              onDelete={onDeleteNote}
            />
          ))
        )}
      </div>

      {/* New note button */}
      <div className="p-3 border-t border-[#464554]">
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 bg-[#c0c1ff] text-[#0d0096] font-semibold py-2.5 rounded-xl hover:bg-[#e1e0ff] transition-colors text-[14px]"
        >
          <Plus size={16} />
          New Note
        </button>
      </div>
    </aside>
  );
}
