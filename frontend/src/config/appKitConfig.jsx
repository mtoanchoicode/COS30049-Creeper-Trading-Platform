import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { sepolia, mainnet } from "@reown/appkit/networks";

// 1. Get projectId
const projectId = "bef6f0d7e5f03163a5452c1fa126aa45";

// 2. Set the networks
const networks = [sepolia, mainnet];

// 3. Create a metadata object - optional
const metadata = {
  name: "Creeper Trading Platform",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create a AppKit instance
const appKitInstance = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

console.log("AppKit Instance:", appKitInstance);
