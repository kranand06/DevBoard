// src/pages/todo/TodoForm.jsx
import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { ProductivityContext } from "../../context/ProductivityContext";

export default function TodoForm({ onClose }) {
  const { addTodos } = useContext(ProductivityContext);

  const [text, setText] = useState("");
  const [priority, setPriority] = useState("low");

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setText(text.trim());
    if (!text) return;

    await addTodos(text, priority);

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        bg-black/60
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-lg
          bg-[#222a3d]
          border border-[#464554]
          rounded-2xl
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b border-[#464554]
          "
        >
          <div>
            <h3
              className="
                text-[18px]
                font-semibold
                text-[#dae2fd]
                font-['Plus_Jakarta_Sans']
              "
            >
              New Todo
            </h3>

            <p className="text-[12px] text-[#908fa0] mt-1">
              Add something you need to get done.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-[#2d3449]
              text-[#c7c4d7]
              hover:text-[#dae2fd]
              transition-colors
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Todo */}
          <div>
            <label
              htmlFor="todo-text"
              className="
                block
                text-[12px]
                text-[#c7c4d7]
                font-['JetBrains_Mono']
                uppercase
                tracking-wider
                mb-1.5
              "
            >
              Todo
            </label>

            <input
              id="todo-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              required
              className="
                w-full
                bg-[#131b2e]
                border border-[#464554]
                rounded-lg
                px-3
                py-2
                text-[14px]
                text-[#dae2fd]
                placeholder-[#464554]
                focus:outline-none
                focus:border-[#c0c1ff]
                transition-colors
              "
            />
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="todo-priority"
              className="
                block
                text-[12px]
                text-[#c7c4d7]
                font-['JetBrains_Mono']
                uppercase
                tracking-wider
                mb-1.5
              "
            >
              Priority
            </label>

            <select
              id="todo-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="
                w-full
                bg-[#131b2e]
                border border-[#464554]
                rounded-lg
                px-3
                py-2
                text-[14px]
                text-[#dae2fd]
                focus:outline-none
                focus:border-[#c0c1ff]
                transition-colors
              "
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="
                flex-1
                bg-[#c0c1ff]
                text-[#0d0096]
                font-semibold
                py-2.5
                rounded-lg
                hover:bg-[#e1e0ff]
                transition-colors
                text-[14px]
              "
            >
              Create Todo
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                bg-[#131b2e]
                border border-[#464554]
                text-[#c7c4d7]
                font-medium
                py-2.5
                rounded-lg
                hover:bg-[#222a3d]
                transition-colors
                text-[14px]
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
