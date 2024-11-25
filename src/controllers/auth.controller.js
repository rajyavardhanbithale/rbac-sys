import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { ROLES } from "../models/user.model.js";
import { cookiesOption } from "../utils/cookiesOption.js";
import Role, { ROLES_WITH_PERMISSIONS } from "../models/roles.model.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "please fill in all fields" });
        }

        const user = new User({ name, email, password });
        const role = new Role({
            _id: user._id,
            role: ROLES.USER,
            permissions: ROLES_WITH_PERMISSIONS[ROLES.USER]
        });

        await Promise.all([user.save(), role.save()]);

        res.status(201).json({ message: "user registered successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({ email });
        const role = await Role.findById(user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: role.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { cookiesOption });

        res.status(200).json({
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getUserProfile = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findById(id);
        user.password = undefined;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};