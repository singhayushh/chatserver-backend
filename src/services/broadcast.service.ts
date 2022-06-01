import { CreateBroadcastDto } from "../dtos/broadcast.dtos";
import Broadcast from "../models/broadcast.model";

export const fetchAll = async () => {
    return await Broadcast.find();
};

export const create = async (dto: CreateBroadcastDto) => {
    const broadcast = new Broadcast(dto);
    return await broadcast.save();
};