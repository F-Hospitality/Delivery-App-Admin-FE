import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

export default generateToken;
