import express from 'express';
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

// Initialize the app
const app = express()
const PORT = process.env.PORT || 3000

// To Fetch the HTML File
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

// Get the HTML Filex
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})