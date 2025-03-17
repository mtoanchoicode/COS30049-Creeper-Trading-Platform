const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAllTransactions = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/v1/api/transaction/allTransaction`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching transactions", err);
    notification.error({
      message: "Transaction failed",
      description: "Failed to set transactions",
    });
  }
};

export default getAllTransactions;
