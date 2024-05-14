const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("express");

const PROTO_PATH = "../entry.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const entryProto = grpc.loadPackageDefinition(packageDefinition).entry;

const client = new entryProto.EntryService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
