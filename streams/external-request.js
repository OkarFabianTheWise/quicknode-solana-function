"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;

const axios = require('axios');

async function main(params) {
    const url = 'https://fiatrouter-streams-f6edd8db4622.herokuapp.com/watchers';

    // Fetch the data using Axios
    const response = await axios.get(url);
    const data = response.data;
    // Expected data
    // {
    //     "data": [
    //         "EST7x9j9wPKTanMnszRMndHdxEXfddTpKVG7qB5sukts",
    //         "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    //         "B8L3xKyr7rSxnriMnNRyTud7M6QiUkxUoszAsbGkTQ32",
    //         "4BEAoP7ohZrA3T8rQnohgCpCQc1ziWrbwNwzUQdFEBC7",
    //         "6JpQNutXDuFnW7MXUMq1bFwbbrzDGyGxVD2ZGtaBMzKt"
    //     ]
    // }

    const result = data.data; // ISSUE HERE .data field cannot be accessed
    // Expected result
    // [
    //   "EST7x9j9wPKTanMnszRMndHdxEXfddTpKVG7qB5sukts",
    //   "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    //   "B8L3xKyr7rSxnriMnNRyTud7M6QiUkxUoszAsbGkTQ32",
    //   "4BEAoP7ohZrA3T8rQnohgCpCQc1ziWrbwNwzUQdFEBC7",
    //   "6JpQNutXDuFnW7MXUMq1bFwbbrzDGyGxVD2ZGtaBMzKt"
    // ]
 


    return result;
}

exports.main = main;
