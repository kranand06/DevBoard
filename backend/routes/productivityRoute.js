import express from 'express';
import { checkAuth } from '../middleware/auth.js';
import { getProductivityData, addGoals,updateGoals, deleteGoals, addNotes,updateNotes,deleteNotes,addTodo, updateTodo, deleteTodo } from '../controllers/productivityController.js';

const productivityRouter = express.Router();

productivityRouter.use(checkAuth);

productivityRouter.get('/stats', getProductivityData);

productivityRouter.post('/goals', addGoals);
productivityRouter.put('/goals', updateGoals);
productivityRouter.delete('/goals/:goalID', deleteGoals);

productivityRouter.post('/notes', addNotes);
productivityRouter.put('/notes', updateNotes);
productivityRouter.delete('/notes/:noteID', deleteNotes);

productivityRouter.post('/todos', addTodo);
productivityRouter.put('/todos', updateTodo);
productivityRouter.delete('/todos/:todoID', deleteTodo);

export default productivityRouter;