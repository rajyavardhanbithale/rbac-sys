import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ROLES,
        default: "user"
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export default mongoose.model("User", userSchema);