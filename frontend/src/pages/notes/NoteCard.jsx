// src/pages/notes/NoteCard.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NoteCard({ note, isActive, onClick, onDelete }) {
  const timeAgo = note.updatedAt
    ? formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })
    : '';

  return (
    <div
      onClick={onClick}
      className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
        isActive
          ? 'bg-[#171f33] border border-[#c0c1ff]/30'
          : 'border border-transparent hover:bg-[#171f33]'
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <h4 className={`text-[14px] font-medium truncate ${isActive ? 'text-[#c0c1ff]' : 'text-[#dae2fd]'}`}>
          {note.title || 'Untitled'}
        </h4>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1 rounded hover:bg-[#ffb4ab]/10 text-[#c7c4d7] hover:text-[#ffb4ab] transition-all"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <p className="text-[12px] text-[#908fa0] mt-1 line-clamp-2 leading-relaxed">
        {note.content || 'No content yet…'}
      </p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] bg-[#c0c1ff]/10 text-[#c0c1ff] px-1.5 py-0.5 rounded font-['JetBrains_Mono']">
          {note.category}
        </span>
        <span className="text-[10px] text-[#908fa0] font-['JetBrains_Mono']">{timeAgo}</span>
      </div>
    </div>
  );
}
