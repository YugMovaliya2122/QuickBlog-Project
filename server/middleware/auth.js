import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Optionally attach user info to request
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
}