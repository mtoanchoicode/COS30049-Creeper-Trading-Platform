const { driver } = require("../config/neo4jDatabase");

class WalletModel {
  static async createWallet(address) {
    const session = driver.session();
    try {
      await session.run(`MERGE (w:Wallet {address: $address}) RETURN w`, {
        address,
      });
    } finally {
      await session.close();
    }
  }

  static async getWallets() {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (w:Wallet) RETURN w.address AS address`
      );
      return result.records.map((record) => record.get("address"));
    } finally {
      await session.close();
    }
  }
}

module.exports = WalletModel;
