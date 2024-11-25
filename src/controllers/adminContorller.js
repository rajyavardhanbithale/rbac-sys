import { User } from '../models/userModel.js';


export const createUser = async (req, res) => {
    const { name, email, role } = req.body;

    if(!name || !email || !role) {
        return res.status(400).json({ message: 'please fill in all fields' });
    }

    try {
        const newUser = await User.create({ name, email, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'error creating user', error });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'error fetching users', error });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};


export const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (![ROLES.ADMIN, ROLES.USER, ROLES.MODERATOR].includes(role)) {
        return res.status(400).json({ message: 'invalid role' });
    }
    try {
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'error changing user role', error });
    }
};
