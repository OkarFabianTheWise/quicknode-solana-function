"use strict";

const { Connection, PublicKey } = require("@solana/web3.js");
const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");

const ENDPOINT = "https://api.mainnet-beta.solana.com"; // Replace with your Solana RPC endpoint

/**
 * Main function for QuickNode Function.
 * @param {object} params - The input parameters from the QuickNode request.
 * @returns {Promise<object>} - The result to return to the client.
 */
async function main(params) {
    try {
        // Extract the Solana wallet address from the request payload
        const address = params.user_data?.address;

        // Validate the address
        if (!address) {
            throw new Error("Address is required.");
        }

        const publicKey = new PublicKey(address);

        // Connect to the Solana blockchain
        const connection = new Connection(ENDPOINT, "confirmed");

        // Fetch all token accounts for the wallet address
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: TOKEN_PROGRAM_ID,
        });

        // Parse token accounts to extract token balances and mint addresses
        const portfolio = tokenAccounts.value.map((account) => {
            const accountData = account.account.data.parsed.info;
            return {
                mint: accountData.mint,
                tokenAmount: {
                    uiAmount: accountData.tokenAmount.uiAmount,
                    amount: accountData.tokenAmount.amount,
                    decimals: accountData.tokenAmount.decimals,
                },
            };
        });

        return {
            message: "Token portfolio retrieved successfully.",
            walletAddress: address,
            portfolio,
        };
    } catch (error) {
        return {
            message: "An error occurred while fetching the token portfolio.",
            error: error.message,
        };
    }
}

exports.main = main;


// RETURNS DATA IN THE FOLLOWING SIMILITUDE

// {
//   message: "Token portfolio retrieved successfully.",
//   walletAddress: "7V4bVeHDYTpSWDixWJUWTHJz7qBmTMf7cnyY3qci7Xzc", 
//   portfolio: [
//     {
//       mint: "4sh67gb9P1upzR8GxRXLHgNdHWWDxucQ8oJD7De1pump",
//       tokenAmount: {
//         uiAmount: 10040.925633,
//         amount: "10040925633",
//         decimals: 6,
//       },
//     },
//     {
//       mint: "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6",
//       tokenAmount: {
//         uiAmount: 200500.44417,
//         amount: "20050044417",
//         decimals: 5,
//       },
//     },
//     {
//       mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
//       tokenAmount: { uiAmount: 4.261528, amount: "4261528", decimals: 6 },
//     },
//     {
//       mint: "B5WTLaRwaUQpKk7ir1wniNB6m5o8GgMrimhKMYan2R6B",
//       tokenAmount: { uiAmount: 0, amount: "0", decimals: 6 },
//     },
//   ],
// };
