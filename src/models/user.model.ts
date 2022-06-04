import { model, Model, Schema } from "mongoose";
import { UserInterface } from "../dtos/user.dtos";

const userSchema: Schema<UserInterface> = new Schema(
    {
        name: String,
        id: { type: String, unique: true },
        photo: String,
        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const User: Model<UserInterface> = model("User", userSchema);

export default User;