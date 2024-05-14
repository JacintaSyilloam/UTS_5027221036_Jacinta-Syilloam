const Entry = require("../entry");
const grpc = require("@grpc/grpc-js");

const readAllEntry = async (_, callback) => {
  try {
    const entries = await Entry.find({});
    callback(null, { entries });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Error reading entries: ${error.message}`,
    });
  }
};

module.exports = readAllEntry;
