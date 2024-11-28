import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, ROLES } from "../models/userModel.js";
import Role, { ROLES_WITH_PERMISSIONS } from "../models/rolesModel.js";
import { cookiesOption, generateJWT, refreshTokenOption } from "../utils/generateJWT.js";

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

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const role = await Role.findById(user._id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = generateJWT(user._id, role.role, "1h");
        const refreshToken = generateJWT(user._id, role.role, "7d");

        res.cookie("token", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, refreshTokenOption);

        res.status(200).json({
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role.role,
            },
            token: accessToken,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(403).json({ message: "No refresh token provided" });
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            const user = await User.findById(decoded.id);
            const role = await Role.findById(user._id);

            if (!user || !role) {
                return res.status(404).json({ message: "User not found" });
            }

            const newAccessToken = generateJWT(user._id, role.role, "1h");
            const newRefreshToken = generateJWT(user._id, role.role, "7d");

            res.cookie("token", newAccessToken, cookiesOption);
            res.cookie("refreshToken", newRefreshToken, refreshTokenOption);

            console.log('New access token:', newAccessToken);
console.log('New refresh token:', newRefreshToken);
console.log('Setting cookies');

            res.status(200).json({
                message: "New access token generated",
                token: newAccessToken,
            });
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