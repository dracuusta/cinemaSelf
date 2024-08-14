const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
});

ActorSchema.virtual("url").get(function () {
  return `/catalog/actor/${this._id}`;
});

module.exports = mongoose.model("Actor", ActorSchema);
