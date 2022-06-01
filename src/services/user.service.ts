import { Schema } from "mongoose";
import User from "../models/user.model";

export const toggleActive = async (id: string, isActive: boolean) => {
    return await User.findOneAndUpdate({ _id: new Schema.Types.ObjectId(id), isActive });
};

export const fetchById = async (id: string) => {
    return await User.findById(new Schema.Types.ObjectId(id));
};

export const fetchByName = async (name: string) => {
    return await User.findOne({ name });
};

export const fetchByStatus = async (isActive: boolean) => {
    return await User.findOne({ isActive });
};

export const create = async (name: string, photo: string) => {
    const user = new User({ name, photo });
    return await user.save();
};