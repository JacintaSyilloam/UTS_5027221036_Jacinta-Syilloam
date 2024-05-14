const Entry = require("../entry");
const grpc = require("@grpc/grpc-js");

const createEntry = async (call, callback) => {
  const { name, score } = call.request;
  try {
    const entry = new Entry({ name, score });
    await entry.save();
    callback(null, { name, score });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      message: `Error creating entry: ${error.message}`,
    });
  }
};

module.exports = createEntry;
