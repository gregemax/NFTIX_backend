import type { Document } from "mongoose";
export type UserDocument = User & Document;
export declare class User {
    walletAddress: string;
    email?: string;
    username?: string;
    avatar?: string;
    isVerified: boolean;
    isEventOrganizer: boolean;
    profile?: {
        bio?: string;
        website?: string;
        twitter?: string;
        discord?: string;
    };
    favoriteEvents: string[];
    lastLogin: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
