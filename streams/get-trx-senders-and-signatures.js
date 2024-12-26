function main(stream) {
    try {
        // Parse the incoming stream data
        const streamData = stream.data ? stream.data : stream;

        // Validate the structure of the incoming data
        if (!streamData || !Array.isArray(streamData[0]?.transactions)) {
            return { error: "Invalid transaction structure" };
        }

        // Extract block data
        const blockData = streamData[0];
        const transactions = blockData.transactions;

        // Process each transaction
        const results = transactions.map((tx) => {
            const message = tx.transaction.message;
            const meta = tx.meta;

            // Extract the sender (first address in accountKeys)
            const sender = message.accountKeys[0]?.pubkey || null;

            // Calculate balance change (difference between preBalances and postBalances)
            const preBalances = meta?.preBalances || [0];
            const postBalances = meta?.postBalances || [0];
            const balanceChange = (postBalances[0] - preBalances[0]) / 1e9; // Convert lamports to SOL

            // Get transaction signature
            const signature = tx.transaction.signatures?.[0] || null;

            return {
                sender,
                balanceChange,
                signature,
            };
        });

        return { transactions: results };
    } catch (error) {
        return { error: error.message, stack: error.stack };
    }
}

// RESULT
// {
//   "transactions": [
//     {
//       "balanceChange": -0.000010233,
//       "sender": "BEmUSjqs7mpgaSXw6QdrePfTsD8aQHbdtnqUxa63La6E",
//       "signature": "5TrLnmzw2JdRqgfsMN6pKpRk7ZSVwGGJNGaQx7Vu8T45YQKa7rBJwrcjnbnpTFaWq4kqMKiVAQ7WE4V9QCbC69Xh"
//     },
//     {
//       "balanceChange": -0.000005,
//       "sender": "7NRDm2Uqnx77dovJPY9EuWTX8VxyXsUKrESudhPwxTzY",
//       "signature": "2YnF4CvFCvVYoJHQsbUkN6sz3TWXrMmaXAGedRAqaA9WfRM6ACZFAnb5GnujNZWdC9diQmZuHTR3Z7TY2gRCmW1g"
//     },
//     {
//       "balanceChange": -0.000005,
//       "sender": "BMJE6zFwTXwPopVdG1ccYMLWWGd5aNPvm5offrqHUxXV",
//       "signature": "2YV7zGQ2Eey6RaVtC7gVQh6xKf698sZs6EAEyKo1pfowi8a5CTHTcQyNhhS1spSbKaBj2Jn94n7PQ8Afx32SMWxq"
//     },
//     {
//       "balanceChange": -0.000005,
//       "sender": "CcJX66BQ2Y99GQNcojA4zjDSPG71NSXCRLH2CVei6h4v",
//       "signature": "4VDLUCeKtZWuEw9Q4a3VzbvMP4xbFhAQxRzXkVwuNQCoiS124Yuvojsxro12fpmdnupPAAnUJkYZE59xU9e5QGin"
// ..............
