// src/pages/tasks/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../utils/constants';

export default function TaskForm({ task, onSave, onClose }) {
  const isEditing = Boolean(task?.id);
  const [form, setForm] = useState({
    title:       task?.title       ?? '',
    description: task?.description ?? '',
    priority:    task?.priority    ?? 'medium',
    status:      task?.status      ?? 'todo',
    dueDate:     task?.dueDate     ?? '',
  });

  // Trap focus / close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Task title is required.'); return; }
    onSave({ ...task, ...form });
  };

  const field = (label, name, type = 'text', extra = {}) => (
    <div>
      <label className="block text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] placeholder-[#464554] focus:outline-none focus:border-[#c0c1ff] transition-colors"
        {...extra}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#222a3d] border border-[#464554] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#464554]">
          <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">
            {isEditing ? 'Edit Task' : 'New Task'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2d3449] text-[#c7c4d7] hover:text-[#dae2fd] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {field('Title', 'title', 'text', { placeholder: 'Task title…', required: true })}

          <div>
            <label className="block text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              placeholder="Optional description…"
              className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] placeholder-[#464554] focus:outline-none focus:border-[#c0c1ff] transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
                className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] focus:outline-none focus:border-[#c0c1ff] transition-colors"
              >
                {PRIORITY_OPTIONS.map((o) => (
                  <option key={o} value={o} className="capitalize">{o.charAt(0).toUpperCase() + o.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] focus:outline-none focus:border-[#c0c1ff] transition-colors"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1).replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          {field('Due Date', 'dueDate', 'date')}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#c0c1ff] text-[#0d0096] font-semibold py-2.5 rounded-lg hover:bg-[#e1e0ff] transition-colors text-[14px]"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#131b2e] border border-[#464554] text-[#c7c4d7] font-medium py-2.5 rounded-lg hover:bg-[#222a3d] transition-colors text-[14px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
