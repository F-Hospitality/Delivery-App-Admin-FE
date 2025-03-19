import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../types/customTypes"; // Import the custom type


export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id, user.role);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
};

export const viewProfile = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }
  
      const user = await User.findByPk(req.user.id, { attributes: ["id", "email", "role"] });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving profile" });
    }
  };