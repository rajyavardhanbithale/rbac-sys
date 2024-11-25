
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "please fill in all fields" });
        }

        const user = new userModel({ name, email, password, role });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "please fill in all fields" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const getUserProfile = async (req, res) => {
    const message = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
    }

    res.json(message);
};