// src/pages/dashboard/GoalsPage.jsx
import { useContext, useState } from 'react';
import { ProductivityContext } from '../../context/ProductivityContext.jsx';
import GoalCard from './GoalCard.jsx';
import GoalForm from './GoalForm.jsx';
import Layout from '../../Components/Layout.jsx';
import { Plus } from 'lucide-react';

export default function GoalsPage() {

  const { goals } = useContext(ProductivityContext);
  const safeGoals = [...(goals || [])].sort((a, b) => {
    // Handle null or missing dates safely (push them to the end)
    if (!a.date) return 1;
    if (!b.date) return -1;
    
    // Convert date strings to timestamps for ascending comparison
    return new Date(a.date) - new Date(b.date);
});

  const [showForm,    setShowForm]    = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleEdit = (goal) => { 
    setEditingGoal(goal); 
    setShowForm(true); 
  };
  const handleClose = () => { 
    setShowForm(false);
    setEditingGoal(null); 
  };



  return (
    <Layout title="Goals Manager">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[32px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Goals Manager</h2>
          <p className="text-[14px] text-[#c7c4d7] mt-1">Track your development tasks and goals.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#c0c1ff] text-[#0d0096] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e1e0ff] transition-colors flex items-center gap-2 w-fit text-[14px]"
        >
          <Plus size={16} />
          Add Goal
        </button>
      </div>
      
      {showForm && <GoalForm goal={editingGoal} onClose={handleClose}/>}

      <div className="grid grid-cols-1 gap-6">
        {safeGoals.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-[#1a1b26] border border-[#2f324a] rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-[#c7c4d7] mb-2">flag</span>
            <p className="text-[#c7c4d7] text-sm">No goals found. Start by adding a new goal!</p>
          </div>
        ) : (
          safeGoals.map((goalItem) => (
            <GoalCard goalItem={goalItem} handleEdit={handleEdit}/>
          ))
        )}
      </div>
    </Layout>
  );
}
