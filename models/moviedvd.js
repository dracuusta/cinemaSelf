const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieDVDSchema = new Schema({
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Loaned", "Reserved"],
    default: "Available",
  },
  due_back: { type: Date, default: Date.now },
});

MovieDVDSchema.virtual("url").get(function () {
  return `/catalog/moviedvd/${this._id}`;
});

module.exports = mongoose.model("MovieDVD", MovieDVDSchema);
