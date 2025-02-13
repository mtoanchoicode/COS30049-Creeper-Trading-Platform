const { driver } = require("../config/neo4jDatabase");

class TransactionModel {
  static async storeTransaction({ from, to, amount, txHash, timestamp }) {
    const session = driver.session();
    try {
      await session.run(
        `MERGE (a:Wallet {address: $from})
         MERGE (b:Wallet {address: $to})
         MERGE (a)-[:SENT {amount: $amount, txHash: $txHash, timestamp: $timestamp}]->(b)`,
        { from, to, amount, txHash, timestamp }
      );
    } finally {
      await session.close();
    }
  }

  static async getTransactions(walletAddress) {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:Wallet)-[t:SENT]->(b:Wallet)
        WHERE toLower(a.address) = toLower($wallet) OR toLower(b.address) = toLower($wallet)
        RETURN a.address AS from, b.address AS to, t.amount AS amount, t.txHash AS txHash, t.timestamp AS timestamp`,
        { wallet: walletAddress }
      );

      return result.records.map((record) => ({
        from: record.get("from"),
        to: record.get("to"),
        amount: record.get("amount"),
        txHash: record.get("txHash"),
        timestamp: record.get("timestamp"),
      }));
    } finally {
      await session.close();
    }
  }
}

module.exports = TransactionModel;
