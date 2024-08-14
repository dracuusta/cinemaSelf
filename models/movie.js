const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true },
  date_of_release: { type: Date, default: Date.now },
  synopsis: { type: String, minLength: 3 },
  director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
  actor: [{ type: Schema.Types.ObjectId, ref: "Actor", required: true }],
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
});

MovieSchema.virtual("url").get(function () {
  return `/catalog/movie/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);
