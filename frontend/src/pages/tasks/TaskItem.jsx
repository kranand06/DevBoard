// src/pages/tasks/TaskItem.jsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { PRIORITY_BG, STATUS_COLORS } from '../../utils/constants';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === 'done';

  return (
    <div className="group flex items-start gap-4 p-4 border border-[#464554] rounded-xl hover:border-[#c0c1ff]/50 transition-all bg-[#0b1326] hover:bg-[#171f33]">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          isDone
            ? 'bg-[#c0c1ff] border-[#c0c1ff]'
            : 'border-[#464554] hover:border-[#c0c1ff]'
        }`}
      >
        {isDone && (
          <svg className="w-3 h-3 text-[#0b1326]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-[14px] font-medium transition-colors ${isDone ? 'line-through text-[#908fa0]' : 'text-[#dae2fd]'}`}>
            {task.title}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-['JetBrains_Mono'] capitalize ${PRIORITY_BG[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded font-['JetBrains_Mono'] capitalize ${STATUS_COLORS[task.status]}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        {task.description && (
          <p className="text-[12px] text-[#c7c4d7] line-clamp-1">{task.description}</p>
        )}
        {task.dueDate && (
          <span className="text-[10px] text-[#908fa0] font-['JetBrains_Mono'] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">schedule</span>
            {task.dueDate}
          </span>
        )}
      </div>

      {/* Actions (appear on hover) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-lg hover:bg-[#222a3d] text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 rounded-lg hover:bg-[#ffb4ab]/10 text-[#c7c4d7] hover:text-[#ffb4ab] transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
