import { useContext } from 'react';
import BentoCard from "../../Components/BentoCard"
import { ProductivityContext } from '../../context/ProductivityContext';

export default function GoalCard({ goalItem, handleEdit }) {

  const {deleteGoals} = useContext(ProductivityContext);


  const formattedDate = goalItem.date 
    ? new Date(goalItem.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) 
    : 'No date';

  return (
    <BentoCard className="bg-[#1a1b26] border border-[#2f324a] rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-[#4edea3]/40">
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {/* <input
                type="checkbox"
                checked={goalItem.completed}
                // onChange={handleUpdate}
                className="mt-3 w-4 h-4 accent-[#4edea3] cursor-pointer"
              /> */}
              <div>
                <h4 className={`text-[28px] font-semibold text-[#dae2fd] ${goalItem.completed ? 'line-through opacity-50' : ''}`}>
                  {goalItem.goal}
                </h4>
                <span className="text-[12px] text-[#c7c4d7] font-['JetBrains_Mono'] mt-1 block">
                  {formattedDate}
                </span>
              </div>
            </div>
            <div className={`px-2.5 py-1 rounded-full text-[14px] font-['JetBrains_Mono'] font-medium ${goalItem.completed ? 'bg-[#4edea3]/10 text-[#4edea3]' : 'bg-[#e2e2fd]/10 text-[#c7c4d7]'}`}>
              {goalItem.completed ? 'Completed' : 'In Progress'}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#2f324a]/50">
            <button
              onClick={() => handleEdit(goalItem)}
              className="flex items-center gap-1 text-xs text-[#c7c4d7] hover:text-[#4edea3] transition"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span> Edit
            </button>
            <button
              onClick={() => deleteGoals(goalItem._id)}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span> Delete
            </button>
          </div>
        </>
    </BentoCard>
  );
}
