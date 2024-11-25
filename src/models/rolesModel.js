import mongoose from "mongoose";
import { ROLES } from "./userModel.js";

export const ROLES_WITH_PERMISSIONS = {
    [ROLES.ADMIN]: ["modify_user", "modify_moderator", "modify_admin", "modify_post"],
    [ROLES.USER]: ["create_comment", "modify_post"],
    [ROLES.MODERATOR]: ["modify_comments", "delete_comments", "modify_post"],
};

const roleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ROLES,
        required: true
    },
    permissions: {
        type: [String],
        required: true,
    }
},{
    versionKey: false,
});

roleSchema.pre('save', function(next) {
    if (!this.permissions || this.permissions.length === 0) {
        this.permissions = ROLES_WITH_PERMISSIONS[this.role];
    }
    next();
});

export default mongoose.model("Role", roleSchema);