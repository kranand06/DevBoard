import { useContext, useState } from 'react';
import { ProductivityContext } from '../../context/ProductivityContext.jsx';
import TaskCard from './TaskCard.jsx'
// import GoalForm from './GoalForm.jsx';
import TaskForm from './TaskForm.jsx';
import BentoCard from "../../Components/BentoCard.jsx"
import Layout from '../../Components/Layout.jsx';
import { Plus } from 'lucide-react';

function TasksPage() {

  const { todos } = useContext(ProductivityContext);
  const safeTask = todos || []
  // console.log(safeTask)


  const [isAdding, setIsAdding] = useState(false)

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[32px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Task Manager</h2>
          <p className="text-[14px] text-[#c7c4d7] mt-1">Track your tasks and todos.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#c0c1ff] text-[#0d0096] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e1e0ff] transition-colors flex items-center gap-2 w-fit text-[14px]"
        >
          <Plus size={16} />
          Add Tasks
        </button>
      </div>
        {isAdding && < TaskForm onClose={()=>setIsAdding(false)}/>}
      <div className="grid grid-cols-1 gap-6">
        {safeTask.length === 0 ? (
          <BentoCard className="col-span-full py-16 text-center border border-[#2f324a] rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-[#c7c4d7] mb-2">flag</span>
            <p className="text-[#c7c4d7] text-sm">No goals found. Start by adding a new goal!</p>
          </BentoCard>
        ) : (
          safeTask.map((todo) => (
            <TaskCard todo={todo} />
          ))
        )}
      </div>
    </Layout>
  )
}

export default TasksPage


//   const [showForm, setShowForm] = useState(false);
//   const [editingGoal, setEditingGoal] = useState(null);

//   const handleEdit = (goal) => {
//     setEditingGoal(goal);
//     setShowForm(true);
//   };
//   const handleClose = () => {
//     setShowForm(false);
//     setEditingGoal(null);
//   };



//   return (
//     <Layout title="Goals Manager">
      

//       {showForm && <GoalForm goal={editingGoal} onClose={handleClose} />}

//       
//     </Layout>
//   );
// }
