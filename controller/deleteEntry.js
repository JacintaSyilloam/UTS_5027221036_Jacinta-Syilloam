const Entry = require("../entry");
const grpc = require("@grpc/grpc-js");

const deleteEntry = async (call, callback) => {
  const { _id } = call.request;
  try {
    await Entry.deleteOne({ _id });
    callback(null, { message: "Entry deleted successfully" });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Error deleting entry: ${error.message}`,
    });
  }
};

module.exports = deleteEntry;
