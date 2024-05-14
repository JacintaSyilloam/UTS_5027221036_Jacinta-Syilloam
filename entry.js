const mongoose = require("mongoose");

// Define the schema for the entry model
const entrySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

// Create the Mongoose model for the entry
const Entry = mongoose.model("Entry", entrySchema);

// Export the entry model
module.exports = Entry;
