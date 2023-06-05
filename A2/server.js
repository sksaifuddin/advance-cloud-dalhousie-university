const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./operations.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const opearationProto = grpc.loadPackageDefinition(packageDefinition);

function StoreData(call, callback) {
  callback(null, {s3uri: 'Hello ' + call.request.data});
}

function AppendData(call, callback) {
  callback(null, {s3uri: 'Hello ' + call.request.data});
}

function DeleteFile(call, callback) {
  callback(null, {s3uri: 'Hello ' + call.request.data});
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  
  server.addService(opearationProto.EC2Operations.service, {
    StoreData: StoreData,
    AppendData: AppendData,
    DeleteFile: DeleteFile,
  });

  server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
  );
}

main();
