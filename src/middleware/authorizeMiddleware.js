import Role from "../models/rolesModel.js";

const authorize = (roles) => {
    return async (req, res, next) => {
        const verifyRole = await Role.findById(req.user.id);
        if (verifyRole.role !== req.user.role) {
            res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        }
        if (!roles.includes(req.user.role) || verifyRole.role !== req.user.role) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

export default authorize;