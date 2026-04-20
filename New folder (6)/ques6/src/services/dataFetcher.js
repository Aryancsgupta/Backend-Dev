const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from API: ${error.message}`);
  }
};

module.exports = { fetchData };
