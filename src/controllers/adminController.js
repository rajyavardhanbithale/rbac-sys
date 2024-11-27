import { ROLES, User } from '../models/userModel.js';
import Role from '../models/rolesModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await Role.find().populate('_id', 'name email');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'error fetching users', error });
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
        const update = await Role.findByIdAndUpdate(id, { role }, { new: true }).populate('_id', 'name email');
        if (!update) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: 'error changing user role', error });
    }
};

