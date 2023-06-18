/**
 * This is only for my experiments and testing
 */
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./operations.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };

  var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
  const EC2Operations = grpc.loadPackageDefinition(packageDefinition).EC2Operations;

  const client = new EC2Operations(
    "44.211.81.67:8080",
    grpc.credentials.createInsecure()
  );

  client.StoreData({data: "this is from client"}, function (err, response)  {
    console.log('Greeting:', response);
  });

  // client.AppendData({data: "append this text"}, (err, response) => {
  //   console.log('Greeting:', response);
  // });

  // client.DeleteFile({s3uri: "https://csco5409-test-assignment.s3.amazonaws.com/csci5409.txt"}, (err, response) => {
  //   console.log('Greeting:', response);
  // });
