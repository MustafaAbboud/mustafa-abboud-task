import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            required: true,
        }
    },
    {
        versionKey: false
    }
)

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User