import jwt from "jsonwebtoken";

const TOKEN_KEY = process.env.TOKEN_KEY || "areallylonggoodkey";

const restrict = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded; // Attach decoded user to the request
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default restrict;
