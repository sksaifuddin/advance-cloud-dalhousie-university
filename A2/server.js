const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./operations.proto";
var protoLoader = require("@grpc/proto-loader");
const AWS = require("aws-sdk");
const { storeDataOperation, makeBucketPublic,  } = require('./operations/storeData');
const { appendDataOperation } = require('./operations/appendData');
const { deleteFileOperation } = require('./operations/DeleteData');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const opearationProto = grpc.loadPackageDefinition(packageDefinition);

const s3 = new AWS.S3({
  accessKeyId: "AKIA6A6UQKPZI7PAFQTB",
  secretAccessKey: "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",
});



function StoreData(call, callback) {
  const { request: { data: message} } = call;
  storeDataOperation(s3, message).then((data) => {
    makeBucketPublic(s3).then(() => {
      console.log('data from promise--->', data);
      callback(null, { s3uri: data });
    });
  });
}

function AppendData(call, callback) {
  const { request: { data: message} } = call;
  console.log('message', message);
  appendDataOperation(s3, message).then((data) => {
    callback(null, {});
  })
}

function DeleteFile(call, callback) {
  const { request: { s3uri} } = call;
  deleteFileOperation(s3,s3uri).then((data) => {
    callback(null, {});
  })
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
