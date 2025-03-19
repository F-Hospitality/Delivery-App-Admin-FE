import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../types/customTypes"; // Import the custom type

dotenv.config();

const authMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; role: string };

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }

      req.user = decoded; // Store user info in the request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

export default authMiddleware;
