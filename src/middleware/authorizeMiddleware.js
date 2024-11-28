import Role from "../models/rolesModel.js";
import { cookiesOption, generateJWT } from "../utils/generateJWT.js";

const authorize = (roles) => {
    return async (req, res, next) => {
        const verifyRole = await Role.findById(req.user.id);
        if (verifyRole.role !== req.user.role) {
            const regenerateToken = generateJWT(req.user.id, verifyRole.role);
            res.cookie("token", regenerateToken, cookiesOption);
        }

        if (!roles.includes(req.user.role) || verifyRole.role !== req.user.role) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

export default authorize;