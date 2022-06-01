import { Document } from "mongoose";

export interface UserInterface extends Document {
    name: string
    id: string
    photo: string
    isActive: boolean
}

export interface CreateUserDto {
    name: string
    id: string
    photo: string
    isActive: boolean
}

export interface UpdateUserDto {
    name: string
    id: string
    photo: string
    isActive: boolean
}

export interface jwtPayloadDto {
    user: {
        name: string
        id: string
        photo: string
        isActive: boolean
    };
}

export interface SocketClientDto {
    userId: string
    socketId: string
}
