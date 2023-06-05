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
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  client.StoreData({data: "this is from client"}, function(err, response) {
    console.log('Greeting:', response.s3uri);
  });
