var response = require("cfn-response");
const { connectToDatabase, getSecretsFromManager } = require("./database");

exports.handler =  async (event, context) => {
  console.log(event);
  var input = parseInt(event.ResourceProperties.Input);
  var responseData = { Value: input * 5 };
  const db = await connectToDatabase();

  

  response.send(event, context, response.SUCCESS, responseData);
};
