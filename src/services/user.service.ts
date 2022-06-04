import { Mongoose, Schema, Types } from "mongoose";
import User from "../models/user.model";

export const toggleActive = async (id: string, isActive: boolean) => {
    return await User.findOneAndUpdate({ _id: new Types.ObjectId(id), isActive });
};

export const fetchById = async (id: string) => {
    return await User.findOne({ id });
};

export const fetchByName = async (id: string, name: string) => {
    return await User.findOne({ id, name });
};

export const fetchByStatus = async (isActive: boolean, id: string) => {
    return await User.findOne({ id, isActive });
};

export const create = async (id: string, name: string, photo: string) => {
    const user = new User({ id, name, photo });
    return await user.save();
};