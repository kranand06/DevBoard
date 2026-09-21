// src/components/todo/TodoCard.jsx
import { Check, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { ProductivityContext } from '../../context/ProductivityContext';

export default function TaskCard({ todo }) {

  
  const {deleteTodos, toggleTodos} = useContext(ProductivityContext);

  const priorityStyles = {
    high: { dot: 'bg-[#ffb4ab]', text: 'text-[#ffb4ab]', bg: 'bg-[#ffb4ab]/10', label: 'High' },
    medium: { dot: 'bg-[#f5c26b]', text: 'text-[#f5c26b]', bg: 'bg-[#f5c26b]/10', label: 'Medium' },
    low: { dot: 'bg-[#8fd5b5]', text: 'text-[#8fd5b5]', bg: 'bg-[#8fd5b5]/10', label: 'Low' },
  };

  const priority = priorityStyles[todo.priority] || priorityStyles.medium;

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
        todo.completed
          ? 'bg-[#0d1528] border-[#222a3d]'
          : 'bg-[#111a2d] border-[#252e43] hover:border-[#3a435b] hover:bg-[#141d32]'
      }`}
    >
      {/* Checkbox */}
      <button
        type="button"
        onClick={() => toggleTodos(todo._id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-[#c0c1ff] border-[#c0c1ff] text-[#0d1020]'
            : 'border-[#464554] hover:border-[#c0c1ff] bg-transparent'
        }`}
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Todo content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-[14px] leading-5 transition-all ${
            todo.completed ? 'text-[#6f7485] line-through' : 'text-[#dae2fd]'
          }`}
        >
          {todo.text}
        </p>
      </div>

      {/* Priority */}
      <div
        className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md ${priority.bg} ${priority.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
        <span className="text-[10px] font-medium uppercase tracking-wide">
          {priority.label}
        </span>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => deleteTodos(todo._id)}
        aria-label="Delete todo"
        className="flex-shrink-0 p-1.5 rounded-lg text-[#6f7485] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-all"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
