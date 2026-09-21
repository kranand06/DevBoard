import { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import { ProductivityContext } from '../../context/ProductivityContext';

export default function GoalForm({ goal, onClose }) {

    const { addGoals, updateGoals } = useContext(ProductivityContext);

    const isEditing = Boolean(goal?._id);

    const STATUS_OPTIONS = ['In-Progress', 'Completed'];
    const formatDateTimeLocal = (date) => {
        if (!date) return '';

        const d = new Date(date);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [form, setForm] = useState({
        goalId: goal?._id ?? '',
        goal: goal?.goal ?? '',
        completed: goal?.completed ?? 'false',
        date: formatDateTimeLocal(goal?.date),
    });

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await (isEditing) ? updateGoals(form) : addGoals(form);
        onClose();
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
                        {isEditing ? 'Edit Goal' : 'New Goal'}
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#2d3449] text-[#c7c4d7] hover:text-[#dae2fd] transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {field('Title', 'goal', 'text', { placeholder: 'Goal title…', required: true })}

                    <div className="grid grid-cols-2 gap-4">

                        {/* Status */}
                        <div>
                            <label className="block text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] uppercase tracking-wider mb-1.5">Status</label>
                             {/* <select
                            value={form.status}
                            onChange={(e) => setForm((p) => ({ ...p, completed: ((e.target.value === 'Completed') ? true : false) }))}
                            className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] focus:outline-none focus:border-[#c0c1ff] transition-colors"
                        >
                            {STATUS_OPTIONS.map((o) => (
                                <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1).replace('-', ' ')}</option>
                            ))}
                        </select> */}
                            <select
                                value={(form.completed==true) ? 'Completed' : 'In-Progress'}
                                onChange={(e) => setForm((p) => ({ ...p, completed: ((e.target.value === 'Completed') ? true : false) }))}
                                className="w-full bg-[#131b2e] border border-[#464554] rounded-lg px-3 py-2 text-[14px] text-[#dae2fd] focus:outline-none focus:border-[#c0c1ff] transition-colors"
                            >
                                {STATUS_OPTIONS.map((o) => (
                                    <option key={o} value={o}>
                                        {o}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {field('Due Date', 'date', 'datetime-local')}

                    </div>


                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-[#c0c1ff] text-[#0d0096] font-semibold py-2.5 rounded-lg hover:bg-[#e1e0ff] transition-colors text-[14px]"
                        >
                            {isEditing ? 'Save Changes' : 'Create Goal'}
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
