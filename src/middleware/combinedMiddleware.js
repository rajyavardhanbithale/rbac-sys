import { ROLES } from "../models/userModel.js";
import authenticate from "./authMiddleware.js";
import authorize from "./authorizeMiddleware.js";

const checkAuthAndRole = (roles) => [
    authenticate,
    authorize(roles)
];

export const accessALL = checkAuthAndRole([ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER]);
export const accessAdminAndMods = checkAuthAndRole([ROLES.ADMIN, ROLES.MODERATOR]);
export const accessAdmin = checkAuthAndRole([ROLES.ADMIN]);