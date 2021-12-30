import { Schema } from "mongoose";
import mongoose from "mongoose";
import { generateToken } from "helper/jwt";
export interface IUser{
    firstName: string,
    username: string,
    email: string,
    birthday: Date,
    isOnline?: boolean,
    isSuspended?: boolean,
    createdAt?: Date,
    isVerified? : boolean
}

const UserSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    username: {type: String, required:true},
    email: {type: String, required: true},
    birthday: {type: Date, required: true},
    isOnline: {type: Boolean, default: false},
    isSuspended: { type: Boolean, default: false },
    createdAt: {type: Date, default: new Date()},
    isVerified: {type: Boolean, default: false}
},{timestamps: true});

UserSchema.virtual("getAge",function(this:IUser) {
    return (new Date().getFullYear() - this.birthday.getFullYear());
})

export default mongoose.model("User", UserSchema);
