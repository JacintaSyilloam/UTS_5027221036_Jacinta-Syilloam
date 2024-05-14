const Entry = require("../entry");
const grpc = require("@grpc/grpc-js");

const updateEntry = async (call, callback) => {
  const { _id, name, score } = call.request;
  try {
    await Entry.updateOne({ _id }, { name, score });
    callback(null, { _id, name, score });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Error updating entry: ${error.message}`,
    });
  }
};

module.exports = updateEntry;
