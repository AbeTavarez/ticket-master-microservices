import mongoose from "mongoose";

// Interface describes the properties to create an User
// what it takes to create an User
interface UserAttrs {
    email: string;
    password: string;
}

// Interface describes the properties that an User Model has
// What a collection looks like
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties an User Document has
// What properties a single User has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
