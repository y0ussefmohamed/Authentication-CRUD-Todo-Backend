import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    try {
        const user = await prisma.User.create({
            data: {
                username: username,
                password: hashedPassword
            }
        })

        const defaultTodoTitle = `Hello :) Add your first todo!`
        await prisma.Todo.create({
            data: {
                task: defaultTodoTitle,
                userId: user.id
            }
         })
            

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } 
    catch (err) 
    {
        res.sendStatus(503)
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await prisma.User.findUnique({
            where: {
                username: username
            }
        })

        if (!user) 
            return res.status(404).send({ message: "User not found" })

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) 
            return res.status(401).send({ message: "Invalid password" })

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } 
    catch (err) 
    {
        res.sendStatus(503)
    }
})


export default router