import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Authorization header missing" });
    return; // Stop further execution
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Token missing" });
    return; // Stop further execution
  }

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, secret) as { userId: number };

    req.body.userId = decoded.userId; // Attach userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(403).json({ error: "Invalid token" });
    return; // Stop further execution
  }
};
