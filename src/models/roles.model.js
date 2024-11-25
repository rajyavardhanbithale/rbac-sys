import mongoose from "mongoose";

export const ROLES_WITH_PERMISSIONS = {
    ADMIN: ["modify_user", "modify_moderator", "modify_admin", "modify_post"],
    USER: ["create_comment", "modify_post"],
    MODERATOR: ["modify_comments", "delete_comments", "modify_post"],
};

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [String],
});

export default mongoose.model("Role", roleSchema);