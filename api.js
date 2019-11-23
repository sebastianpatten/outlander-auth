const axios = require("axios");

exports.get = async (url) => {
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    return error;
  }
};
