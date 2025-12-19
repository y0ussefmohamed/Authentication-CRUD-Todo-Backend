import express from 'express'
import prisma from '../prismaClient.js'

const router = express.Router()

// Read
router.get('/', async (req, res) => {
    const todos = await prisma.Todo.findMany({
        where: {
            userId: req.userId
        }
    })

    res.status(200).json(todos)
})

// Create
router.post('/', (req, res) => {
    const { task } = req.body // Title

    const newTodo = prisma.Todo.create({
        data: {
            task: task,
            userId: req.userId
        }
    })

    res.status(201).json(newTodo)
})

// Update
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updateTodo = prisma.Todo.update({
        where: {
            id:parseInt(id),
            userId: req.userId
        }, 
        data: {
            completed: completed
        }
    })

    res.status(200).json(updateTodo)
})

// Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params
    
    const deleteTodo = prisma.Todo.delete({
        where: {
            id: parseInt(id),
            userId: req.userId
        }
    })
    
    res.status(200).json(deleteTodo)
})

export default router