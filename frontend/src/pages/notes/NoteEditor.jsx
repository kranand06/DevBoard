// src/pages/notes/NoteEditor.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Bold, Italic, Code, Link } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function NoteEditor({ note, onSave }) {
  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [savedAt, setSavedAt] = useState(null);
  const debounceRef = useRef(null);

  // Sync state when active note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title   ?? '');
      setContent(note.content ?? '');
      setSavedAt(note.updatedAt ? new Date(note.updatedAt) : null);
    }
  }, [note?.id]);

  // Debounced auto-save
  const handleChange = useCallback(
    (field, value) => {
      if (field === 'title')   setTitle(value);
      if (field === 'content') setContent(value);

      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          const updated = { ...note, title, content, [field]: value, updatedAt: new Date().toISOString() };
          await onSave(updated);
          setSavedAt(new Date());
        } catch {
          toast.error('Failed to save.');
        }
      }, 1000);
    },
    [note, title, content, onSave]
  );

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <span className="material-symbols-outlined text-6xl text-[#c7c4d7]/20 mb-4">edit_note</span>
        <h3 className="text-[18px] text-[#c7c4d7]/50 font-['Plus_Jakarta_Sans']">Select a note to edit</h3>
        <p className="text-[14px] text-[#908fa0] mt-2">Or create a new one from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-6 py-3 border-b border-[#464554] bg-[#0b1326] flex-shrink-0">
        <div className="flex items-center gap-1">
          {[
            { icon: Bold,   title: 'Bold'   },
            { icon: Italic, title: 'Italic' },
            { icon: Code,   title: 'Code'   },
            { icon: Link,   title: 'Link'   },
          ].map(({ icon: Icon, title: t }) => (
            <button
              key={t}
              title={t}
              className="p-2 rounded hover:bg-[#222a3d] text-[#c7c4d7] hover:text-[#dae2fd] transition-colors"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-[10px] text-[#908fa0] font-['JetBrains_Mono']">
              Saved {formatDistanceToNow(savedAt, { addSuffix: true })}
            </span>
          )}
          <button className="flex items-center gap-1.5 text-[12px] text-[#c0c1ff] hover:text-[#e1e0ff] transition-colors">
            <Share2 size={13} />
            Share
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent text-[32px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] placeholder-[#2d3449] focus:outline-none mb-6 border-none"
        />
        <textarea
          value={content}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Start writing…"
          className="w-full bg-transparent flex-1 text-[15px] text-[#c7c4d7] font-['JetBrains_Mono'] placeholder-[#2d3449] focus:outline-none resize-none border-none leading-relaxed"
          style={{ minHeight: '60vh' }}
        />
      </div>
    </div>
  );
}
