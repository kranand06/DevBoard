import Productivity from "../models/productivitySchema.js";

export const getProductivityData = async (req, res) => {
    try{
        const data = await Productivity.findOne({ userId: req.user.id });
        console.log("User ID:", req.user.id);
        console.log("Productivity data fetched:", data);
        if(!data) return res.status(404).json({ message: "Productivity data not found" });
        res.status(200).json(data);
    }catch (error) {
        res.status(500).json({ message: "Error fetching productivity data", error: error.message });
    }
}


export const addTodo = async (req, res) => {
    try {
        const { text, priority } = req.body;
        const productivityData = await Productivity.findOne({ userId: req.user.id });
        if (!productivityData) return res.status(404).json({ message: "Productivity data not found" });
        productivityData.todos.push({ text, priority });
        await productivityData.save();
        res.status(201).json(productivityData);
    }   catch (error) {
        res.status(500).json({ message: "Error adding todo", error: error.message });
    }
}
export const updateTodo = async (req, res) => {
    try {
        const { todoId, text, priority, completed } = req.body;
        const productivityData = await Productivity.findOne({ userId: req.user.id });
        if (!productivityData) return res.status(404).json({ message: "Productivity data not found" });
        const todo = productivityData.todos.id(todoId);
        if (!todo) return res.status(404).json({ message: "Todo not found" });
        todo.text = text || todo.text;
        todo.priority = priority || todo.priority;
        todo.completed = completed !== undefined ? completed : todo.completed;
        await productivityData.save();
        res.status(200).json(productivityData);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error: error.message });
    }
}

export const deleteTodo = async (req,res)=>{
    try{
        const {todoID} =req.params;
        const productivityData = await Productivity.findOne({ userId: req.user.id });
        if (!productivityData) return res.status(404).json({ message: "Productivity data not found" });
        const todo =productivityData.todos.id(todoID);
        if(!todo) return res.status(404).json({ message: "Todo not found" });
        todo.deleteOne();
        await productivityData.save();
        res.status(200).json(productivityData);
    }catch (error){
        res.status(500).json({ message: "Error deleting todo", error: error.message });
    }
}

//Notes Sections
export const addNotes = async (req,res) =>{
    try{
        const {title, content}=req.body;
        const productivityData=await Productivity.findOne({userId:req.user.id});
        if(!productivityData) return res.status(404).json({message:"Productivity data not found"});
        productivityData.notes.push({title, content});
        await productivityData.save();
        res.status(201).json(productivityData);
    } catch (error){
        res.status(500).json({message:"error adding notes", error:error.message});
    }
}
export const updateNotes = async (req,res)=>{
    try{
        const {noteId, title, content}=req.body;
        const productivityData=await Productivity.findOne({userId:req.user.id});
        if(!productivityData) return res.status(404).json({message:"Productivity data not found"});
        const note=productivityData.notes.id(noteId);
        if(!note) return res.status(404).json({message:"Note not found"});
        note.title=title || note.title;
        note.content=content || note.content;
        note.updatedAt=Date.now();
        await productivityData.save();
        res.status(200).json(productivityData);
    }catch (error){
        res.status(500).json({message:"Error updating notes", error:error.message});
    }
}
export const deleteNotes = async (req,res)=>{
    try{
        const {noteID} =req.params;
        const productivityData = await Productivity.findOne({ userId: req.user.id });
        if (!productivityData) return res.status(404).json({ message: "Productivity data not found" });
        const note =productivityData.notes.id(noteID);
        if(!note) return res.status(404).json({ message: "Note not found" });
        note.deleteOne();
        await productivityData.save();
        res.status(200).json(productivityData);
    }catch (error){
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}

//Goals Section
export const addGoals = async (req,res) =>{
    try{
        const {goal, date}=req.body;
        const productivityData=await Productivity.findOne({userId:req.user.id});
        if(!productivityData) return res.status(404).json({message:"Productivity data not found"});
        productivityData.goals.push({goal, date});
        await productivityData.save();
        res.status(201).json(productivityData);
    } catch (error){
        res.status(500).json({message:"error adding goals", error:error.message});
    }
}
export const updateGoals = async (req,res)=>{
    try{
        const {goalId, goal, date, completed}=req.body;
        const productivityData=await Productivity.findOne({userId:req.user.id});
        if(!productivityData) return res.status(404).json({message:"Productivity data not found"});
        const goalItem=productivityData.goals.id(goalId);
        if(!goalItem) return res.status(404).json({message:"Goal not found"});
        goalItem.goal=goal || goalItem.goal;
        goalItem.date=date || goalItem.date;
        goalItem.completed=completed !== undefined ? completed : goalItem.completed;
        await productivityData.save();
        res.status(200).json(productivityData);
    }catch (error){
        res.status(500).json({message:"Error updating goals", error:error.message});
    }
}
export const deleteGoals = async (req,res)=>{
    try{
        const {goalID} =req.params;
        const productivityData = await Productivity.findOne({ userId: req.user.id });
        if (!productivityData) return res.status(404).json({ message: "Productivity data not found" });
        const goal =productivityData.goals.id(goalID);
        if(!goal) return res.status(404).json({ message: "Goal not found" });
        goal.deleteOne();
        await productivityData.save();
        res.status(200).json(productivityData);
    }catch (error){
        res.status(500).json({ message: "Error deleting goal", error: error.message });
    }
}   
