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
