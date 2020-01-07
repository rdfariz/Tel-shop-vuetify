const responseData = function(response, statusCode, values) {
  var data = {
    success: true,
    data: values
  };
  response.status(statusCode).json(data);
  response.end();
};

const responseMessage = function(response, statusCode, message) {
  var data = {
    success: true,
    message: message
  };
  response.status(statusCode).json(data);
  response.end();
};

const responseAuth = function(response, statusCode, message, values) {
  var data = {
    success: true,
    message: message,
    data: values
  };
  response.status(statusCode).json(data);
  response.end();
};

module.exports = { responseData, responseMessage, responseAuth };
