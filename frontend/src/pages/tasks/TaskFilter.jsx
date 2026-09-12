// src/pages/tasks/TaskFilter.jsx
import React from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';

const STATUS_LABELS = { todo: 'Todo', 'in-progress': 'In Progress', done: 'Done' };

export default function TaskFilter({ filters, setFilters }) {
  const toggle = (key, val) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === val ? '' : val }));
  };

  const chipCls = (active) =>
    `text-[12px] px-3 py-1.5 rounded-full border cursor-pointer transition-all font-['JetBrains_Mono'] ${
      active
        ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border-[#c0c1ff]/50'
        : 'bg-[#171f33] text-[#c7c4d7] border-[#464554] hover:border-[#c0c1ff]/30'
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {/* Status filters */}
      <button className={chipCls(!filters.status)} onClick={() => setFilters((p) => ({ ...p, status: '' }))}>
        All
      </button>
      {STATUS_OPTIONS.map((s) => (
        <button key={s} className={chipCls(filters.status === s)} onClick={() => toggle('status', s)}>
          {STATUS_LABELS[s]}
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-5 bg-[#464554] mx-1" />

      {/* Priority filters */}
      {PRIORITY_OPTIONS.map((p) => {
        const color = p === 'high' ? '#ffb4ab' : p === 'medium' ? '#ffb95f' : '#4edea3';
        return (
          <button
            key={p}
            onClick={() => toggle('priority', p)}
            className={`text-[12px] px-3 py-1.5 rounded-full border cursor-pointer transition-all font-['JetBrains_Mono'] capitalize ${
              filters.priority === p
                ? 'border-opacity-50'
                : 'bg-[#171f33] text-[#c7c4d7] border-[#464554] hover:opacity-80'
            }`}
            style={
              filters.priority === p
                ? { backgroundColor: `${color}15`, color, borderColor: `${color}50` }
                : {}
            }
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
