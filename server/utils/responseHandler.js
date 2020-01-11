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

const responseAuth = function(response, statusCode, message, values, token) {
  var data = {
    success: true,
    message: message,
    data: values,
    token
  };
  response.status(statusCode).json(data);
  response.end();
};

const sendTokenResponse = (response, statusCode, message, data, token) => {
  // create options
  const options = {
    expires: new Date(Date.now + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true
  };

  var data = {
    success: true,
    message: message,
    data: data,
    token
  };

  response
    .status(statusCode)
    .cookie("token", token, options)
    .json(data);
  response.end();
};

module.exports = {
  responseData,
  responseMessage,
  responseAuth,
  sendTokenResponse
};
