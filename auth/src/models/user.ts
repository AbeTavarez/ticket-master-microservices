import mongoose from "mongoose";
import { Password } from "../utilities/password";

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
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

// before saving the user hash the password
userSchema.pre("save", async function (done) {
  // hash the password if it has been modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set('password', hashed);
  }
  done();
});

// creates a new user with supplied attributes
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
