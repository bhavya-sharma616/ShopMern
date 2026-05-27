import mongoose , {Document , Schema} from "mongoose";

interface User extends Document {
    name:string,
    email:string,
    password:string,
    role:"customer" | "admin"
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>("User", userSchema);

export default User;