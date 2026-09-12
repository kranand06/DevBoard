// src/pages/tasks/TasksPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/common/Layout';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../../api/tasks.api';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  const [tasks,       setTasks]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showForm,    setShowForm]    = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters,     setFilters]     = useState({ status: '', priority: '' });
  const [search,      setSearch]      = useState('');

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Filtered tasks ---------- */
  const filtered = tasks.filter((t) => {
    if (filters.status   && t.status   !== filters.status)   return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  /* ---------- Stats ---------- */
  const stats = {
    total:      tasks.length,
    done:       tasks.filter((t) => t.status === 'done').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo:       tasks.filter((t) => t.status === 'todo').length,
  };

  /* ---------- Handlers ---------- */
  const handleSave = async (taskData) => {
    if (taskData.id) {
      const updated = await updateTask(taskData.id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === taskData.id ? updated : t)));
      toast.success('Task updated!');
    } else {
      const created = await createTask(taskData);
      setTasks((prev) => [created, ...prev]);
      toast.success('Task created!');
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleToggle = async (id) => {
    const updated = await toggleTask(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: updated.status } : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success('Task deleted.');
  };

  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); };
  const handleClose = () => { setShowForm(false); setEditingTask(null); };

  return (
    <Layout title="Task Manager">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[32px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Task Manager</h2>
          <p className="text-[14px] text-[#c7c4d7] mt-1">Track your development tasks and goals.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#c0c1ff] text-[#0d0096] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e1e0ff] transition-colors flex items-center gap-2 w-fit text-[14px]"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: 'Total',       count: stats.total,      color: '#c7c4d7' },
          { label: 'Done',        count: stats.done,       color: '#4edea3' },
          { label: 'In Progress', count: stats.inProgress, color: '#c0c1ff' },
          { label: 'Todo',        count: stats.todo,       color: '#ffb95f' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-[#171f33] border border-[#464554] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[12px] text-[#c7c4d7] font-['JetBrains_Mono']">{s.label}</span>
            <span className="text-[12px] font-bold" style={{ color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 bg-[#131b2e] border border-[#464554] rounded-xl px-4 py-2.5 text-[14px] text-[#dae2fd] placeholder-[#464554] focus:outline-none focus:border-[#c0c1ff] transition-colors"
        />
        <TaskFilter filters={filters} setFilters={setFilters} />
      </div>

      {/* Task list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#464554] border-t-[#c0c1ff] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-[#c7c4d7]/30 mb-4">task_alt</span>
          <h3 className="text-[18px] text-[#c7c4d7] font-['Plus_Jakarta_Sans'] mb-2">No tasks found</h3>
          <p className="text-[14px] text-[#908fa0]">
            {search || filters.status || filters.priority
              ? 'Try adjusting your filters.'
              : 'Create your first task to get started!'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <TaskForm task={editingTask} onSave={handleSave} onClose={handleClose} />
      )}
    </Layout>
  );
}
