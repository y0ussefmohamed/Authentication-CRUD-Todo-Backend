import jwt from 'jsonwebtoken'

// Matters for the todoRoutes
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']
    if (!token) 
        return res.status(401).json({ message: "No token provided" })

    jwt.verify(token, process.env.JWT_SECRET, (failure, decodedUser) => {
        if (failure) 
            return res.status(401).json({ message: "Invalid token" })

        req.userId = decodedUser.id // If token is valid, give userId to req
        next()
    })
}

export default authMiddleware