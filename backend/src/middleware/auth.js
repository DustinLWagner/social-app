const { verify } = require('jsonwebtoken');
const LOGIN_PAGE = '/pages/index.html';

function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        //extract token from cookie
        const tokenFromCookie = req.cookies.token;
        //check for proper Authorization header and extract token
        const tokenFromHeader = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;
        //fallback option for cookie
        const token = tokenFromHeader || tokenFromCookie;

        if (!token) {
            //check if req accepts html and redirect
            if (req.accepts('html')) {
                return res.redirect(LOGIN_PAGE);
            }
            //api calls get JSON errors
            return res.status(401).json({ error: 'Auth Header Missing or Malformed' });

        }
        // Verify token
        const decoded = verify(token, JWT_SECRET);
        // attach user ID to req for downstream handlers
        req.userId = decoded.id;
        next();
    } catch (error) {
        // If invalid/missing token
        return res.status(403).json({ error: 'Insufficient Permissions' });
    }
}
module.exports = verifyJWT;