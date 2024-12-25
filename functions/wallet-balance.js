"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
// const web3_js_1 = require("@solana/web3.js");
const { Connection, PublicKey } = require("@solana/web3.js");
const ENDPOINT = 'https://blue-blissful-yard.solana-mainnet.quiknode.pro/<API_KEY>/'; // 👈 Replace with your endpoint

/**
 * Main function for QuickNode Function.
 * @param {object} params - The input parameters from the QuickNode request.
 * @returns {Promise<object>} - The result to return to the client.
 */
async function main(params) {
    try {
        // Extract the Solana address from the request payload
        const address = params.user_data?.address;

        // Validate the address
        if (!address) {
            throw new Error("Address is required.");
        }

        const publicKey = new PublicKey(address);

        // Connect to the Solana blockchain
        const connection = new Connection(ENDPOINT, "confirmed");

        // Fetch the wallet balance in lamports
        const balanceLamports = await connection.getBalance(publicKey);

        // Convert lamports to SOL
        const balanceSol = balanceLamports / 1e9;

        // Return the response
        return {
            message: "Balance retrieved successfully.",
            walletAddress: address,
            balance: balanceSol,
        };
    } catch (error) {
        return {
            message: "An error occurred while fetching the wallet balance.",
            error: error.message,
        };
    }
}

exports.main = main;
