// Get token from Authorization header (format: "Bearer <token>")

// Verify token using jsonwebtoken.verify() and process.env.JWT_SECRET

// If valid, attach req.userId = decoded.id

// If invalid/missing, return 401 or 403