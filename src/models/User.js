import { model, Schema } from "mongoose";

let UserSchema = new Schema({
  email: String,
});

export default model("User", UserSchema);
