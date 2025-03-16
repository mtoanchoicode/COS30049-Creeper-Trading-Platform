import { notification } from "antd";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleTransaction = async (
  userWallet, selectedTokenID, recipientAddress, transactionAmount, 
  estimatedFee, gasLimit, transactionMethod, transactionHash, transactionStatus
) => {
  try {
    await fetch(`${API_BASE_URL}/v1/api/transaction/created`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: userWallet.toString(),
        tokenID: selectedTokenID,
        addressFrom: userWallet.toString(),
        addressTo: recipientAddress.toString(),
        amount: transactionAmount.toString(),
        fee: parseFloat(estimatedFee),
        gas: gasLimit.toString(),
        method: transactionMethod.toString(),
        hashCode: transactionHash.toString(),
        status: transactionStatus
      }),
    });

    notification.success({
      message: "Transaction succeeded",
      description: `Transaction added to database`,
    });

  } catch (err) {
    console.error("Error adding transaction to database:", err);
    notification.error({
      message: "Transaction failed",
      description: "Error adding transaction to database",
    });
  }
}

export default handleTransaction;