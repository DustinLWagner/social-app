const { verify } = require('jsonwebtoken');

app.get('/profile', verifyJWT, handler);



function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        //check for proper Authorization header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Auth Header Missing or Malformed' });
        }
        // extract token from Authorization header 
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = verify(token, JWT_SECRET);
        // attach user ID to req for downstream handlers
        req.userId = decoded.id;
        next();
    } catch (error) {
        // If invalid/missing, return 401 or 403
        return res.status(403).json({ error: 'Insufficient Permissions' });
    }
}