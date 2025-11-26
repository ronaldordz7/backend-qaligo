import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "change-me";

export function signToken(payload, options = { expiresIn: "7d" }) {
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
