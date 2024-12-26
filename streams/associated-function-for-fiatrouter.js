"use strict";
const axios = require('axios');

async function main(params) {
  const streamedData = params?.data?.transactions;

  // Get the watched wallets
  const geturl = 'url/watchers';
  
  try {
    // Fetch the data using Axios
    const response = await axios.get(geturl);
    const watchers = response.data?.data;

    if (!streamedData || !Array.isArray(streamedData) || !watchers || !Array.isArray(watchers)) {
      console.error('Invalid streamedData or watchers');
      return;
    }

    // Loop through the streamedData and check if any sender is in watchers
    for (const transaction of streamedData) {
      if (watchers.includes(transaction.sender)) {
        const foundData = {
          balanceChange: transaction.balanceChange,
          sender: transaction.sender,
          signature: transaction.signature
        };

        // Send the found data to the webhook
        try {
          const res = await axios.post('url/webhook', foundData);
          console.log('Webhook response:', res.data);
        } catch (error) {
          console.error('Error sending data to webhook:', error.message);
        }
      }
    }

  } catch (error) {
    console.error('Error fetching watchers:', error.message);
  }
}

module.exports = { main };
