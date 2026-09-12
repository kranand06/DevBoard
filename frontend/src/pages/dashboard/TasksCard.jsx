import React, { useState, useEffect, useContext } from 'react';
import BentoCard from '../../Components/BentoCard';
import { ProductivityContext } from '../../context/ProductivityContext';

export default function TasksCard() {

  const { todos = [] } = useContext(ProductivityContext);
  const safeTodos = todos || [];


  const priorityColor = { high: '#ffb4ab', medium: '#ffb95f', low: '#4edea3' };

  return (
    <BentoCard className="md:col-span-6 p-8 flex flex-col min-h-[300px]">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#c0c1ff]">task_alt</span>
        <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Sprint Tasks</h3>
      </div>

      <div className="space-y-4 flex-1">
        {safeTodos.map((task) => (
          <label key={task._id} className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={task.completed === true}
              // onChange={() => handleToggle(task.id)}
              className="mt-1 w-4 h-4 rounded border-[#464554] bg-[#171f33] text-[#c0c1ff] focus:ring-[#c0c1ff] focus:ring-offset-[#0b1326]"
            />
            <div>
              <span className={`text-[14px] block mb-1 group-hover:text-[#c0c1ff] transition-colors ${task.completed === true ? 'line-through text-[#c7c4d7]' : 'text-[#dae2fd]'}`}>
                {task.text}
              </span>
              <span className="text-[10px] font-['JetBrains_Mono'] capitalize" style={{ color: priorityColor[task.priority] }}>
                {task.priority} Priority
              </span>
            </div>
          </label>
        ))}
      </div>
    </BentoCard>
  );
}
