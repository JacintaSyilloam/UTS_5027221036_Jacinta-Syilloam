const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const createEntry = require("./controller/createEntry");
const readAllEntry = require("./controller/readAllEntry");
const updateEntry = require("./controller/updateEntry");
const deleteEntry = require("./controller/deleteEntry");
require("./mongo");

var packageDefinition = protoLoader.loadSync("./entry.proto");  
const entryProto = grpc.loadPackageDefinition(packageDefinition).entry;

const server = new grpc.Server();

server.addService(entryProto.EntryService.service, {
  CreateEntry: createEntry,
  ReadAllEntry: readAllEntry,
  UpdateEntry: updateEntry,
  DeleteEntry: deleteEntry,
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    {
      console.log("Server bound successfully!");
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
  }
);
