const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
    let todos;
    try{
        todos = await Todo.getAllTodos();
    }catch(error) {
        return next(error);
    }

    res.json({
        todos: todos
    });
}

async function addTodo(req, res, next) {
    const todoText = req.body.text;

    const todo = new Todo(todoText);

    let insertedId;
    try {
        const result = await todo.save();

        // the promise yielded by insertOne eventually results to an object which holds the id that was inserted:
        insertedId = result.insertedId;
    } catch (error) {
        next(error);
    }

    todo.id = insertedId.toString();

    res.json({
        message: 'Added todo successfully!',
        createdTodo: todo
    });
}

async function updateTodo(req, res, next) {
    const todoId = req.params.id;
    const newTodoText = req.body.newText;

    const todo = new Todo(newTodoText, todoId);

    let result;
    try {
        result = await todo.save();
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'Todo updated successfully!',
        updateTodo: todo
    });
}

async function deleteTodo(req, res, next) {
    const todoId = req.params.id;

    // Passing `null` object as arg for text:
    const todo = new Todo(null, todoId);

    let result;
    try {
        result = await todo.delete();
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'Todo deleted successfully!'
    });
}

module.exports = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
};