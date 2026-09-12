import React, { useContext, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { DevContext } from '../../context/DevContext';


export default function EditProfileForm({ onClose }) {

  const devContext = useContext(DevContext);
  // Supports either { dev } or a context that exposes the fields directly.
  const dev = devContext?.dev ?? devContext ?? {};
  const [form, setForm] = useState({});
  const [touched, setTouched] = useState({});
  
  const {updatePlatform, handle} = useContext(DevContext);

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setTouched((current) => ({ ...current, [key]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedHandles = Object.fromEntries(
      HANDLES.filter(({ key }) => touched[key]).map(({ key }) => [key, form[key] ?? '']),
    );

    if (!Object.keys(updatedHandles).length) {
      toast.error('No handle changes to save.');
      return;
    }

    // onSubmit?.(updatedHandles); api call 
    updatePlatform(updatedHandles);
    onClose();
  };

  const HANDLES = [
  { key: 'leetcodeHandle', label: 'LeetCode' ,placeholder:handle?.leetcodeHandle},
  { key: 'codechefHandle', label: 'CodeChef' ,placeholder:handle?.codechefHandle},
  { key: 'githubHandle', label: 'GitHub' ,placeholder:handle?.githubHandle},
  { key: 'codeforcesHandle', label: 'Codeforces' ,placeholder:handle?.codeforcesHandle},
];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-700/70 bg-[#111827] shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between border-b border-slate-700/70 px-6 pb-5 pt-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300">Developer profiles</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Coding handles</h3>
            <p className="mt-1 text-sm text-slate-400">Add only the profiles you want to share.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {HANDLES.map(({ key, label, placeholder }) => (
            <label key={key} className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-200">{label}</span>
              <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-900/70 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/15">
                <input
                  type="text"
                  value={form[key] ?? ''}
                  onChange={(event) => handleChange(key, event.target.value)}
                  placeholder={placeholder || 'username'}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </label>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
            >
              Save handles
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
