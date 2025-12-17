import express from 'express'
import db from '../db.js'

const router = express.Router()

// Read
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)

    res.status(200).json(todos)
})

// Create
router.post('/', (req, res) => {
    const { task } = req.body // Title

    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 })
})

// Update
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?')
    updatedTodo.run(completed, id, req.userId)

    res.status(200).json({ message: "Todo completed" })
})

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params
    
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, req.userId)
    
    res.status(200).json({ message: "Todo deleted" })
})

export default router