// require("dotenv").config();
// const News = require("./src/models/news.model");
// const mongoose = require("mongoose")

// mongoose.connect(process.env.MONGO_DB_URL);

// const insertDB = async () => {
//     try {
       
//         const articles = [{
//             id: 1,
//             Title: "PEPE Leads Memecoin Communities with 77,145 Holders Exceeding $1,000",
//             Summary: "PEPE's robust community, with over 77,000 holders exceeding $1,000, solidifies its leadership in the memecoin space, indicating strong investor confidence and potential for sustained growth.",
//             Category: "PEPE",
//             Date: "2024-12-24",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740637669/pepe-news.jpg",
//             Content: `
//                 <div>
//                     <p>PEPE has emerged as the top memecoin in terms of community wealth, with 77,145 holders having balances
//                         exceeding $1,000, according to data shared by memecoin influencer Murad on December 25.</p>
        
//                     <ul>
//                         <h4>Key Highlights:</h4>
//                         <li>
//                             Wealth Distribution: Holders with over $1,000 account for 21.5% of PEPE's total community,
//                             showcasing strong belief and participation within the ecosystem.
//                         </li>
        
//                         <li>
//                             Community Leadership: PEPE surpasses all other memecoins in this metric, reflecting its
//                             dominant position in the memecoin market.
//                         </li>
//                     </ul>
//                 </div>`
//         }, 
//         {
//             id: 2,
//             Title: "Messari BNB Chain Q4 Report: Market Cap Soars to $101.09B, DeFi TVL Hits $5.35B Amidst 114% Annual Growth",
//             Summary: "BNB Chain's market cap surged 114% YoY, reaching $101.09B in Q4 2024, while DeFi TVL grew 53% YoY to $5.35B, indicating the blockchain's resilience and growth potential.",
//             Category: "BNB",
//             Date: "2025-2-4",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740637039/bnb_news.jpg",
//             Content: `
//                 <div>
//                     <p>According to Messari Report: In the fourth quarter of 2024, BNB Chain demonstrated significant growth and resilience,
//                         underpinned by impressive market cap increases, strategic DeFi expansions, and pivotal technical enhancements.
//                         This period marked a transformative phase for the blockchain,
//                         solidifying its position as one of the top Layer 1 (L1) blockchains by revenue and innovation.</p>

//                     <h4>Market Cap and Revenue Insights</h4>

//                     <p>BNB's market cap saw a notable rise to $101.09 billion in Q4 2024,
//                         marking a 22% increase from the previous quarter and a substantial 114% increase year-over-year (YoY) from $47.31 billion
//                         at the beginning of the year. This growth trajectory was bolstered by a crypto market upsurge influenced by the election of
//                         U.S. President Donald Trump. BNB's yearly revenue reached a record $234.0 million, driven by increased network activity
//                         and adoption across its platforms.
//                     </p>
//                 </div> `
//         },
//         {
//             id: 3,
//             Title: "Shiba Inu Partners with UAE Ministry of Energy to Implement Blockchain in Government Operations",
//             Summary: "Shiba Inu's partnership with the UAE Ministry of Energy brings blockchain to government operations, potentially revolutionizing public sector efficiency and transparency.",
//             Category: "Shiba",
//             Date: "2025-2-5",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740637680/shiba-news.jpg",
//             Content:`
//                 <div>
//                     <p>
//                         According to a report from Watcher.guru, Shiba Inu (SHIB) has announced a partnership with the United Arab Emirates Ministry
//                         of Energy and Infrastructure (MOEI) to integrate its blockchain-based operating system, ShibOS, into government activities.
//                         This partnership represents the first instance of a government globally implementing blockchain technology at the federal level.
//                         The Shiba Inu team expressed enthusiasm about this pioneering venture, emphasizing the potential of ShibOS to revolutionize public
//                         sector operations by introducing enhanced transparency, security, and efficiency.
//                     </p>

//                     <h4>UAE's Blockchain Strategy and Economic Impact</h4>

//                     <p>
//                         The UAE has outlined a comprehensive blockchain strategy that aims to transition 50% of government transactions
//                         onto blockchain platforms. This strategic shift is expected to save more than $3 billion annually in transaction
//                         and document processing fees. Sharif Al Olama, the UAE's Deputy Minister of Energy and Petroleum Affairs, highlighted
//                         the significance of this collaboration, stating, "We are pleased to deepen our commitment to cutting-edge digital services.
//                         This collaboration marks a critical step in our journey to redefine government services."
//                     </p>
//                 </div>
//             `
//         }, 
//         {
//             id: 4,
//             Title: "Robinhood Adds SOL, PEPE, ADA, and XRP Following Trump’s Election Victory, Signaling a Shift in Crypto Policy",
//             Summary: "Robinhood's expansion of crypto offerings, including SOL, ADA, and XRP, reflects the industry's anticipation of a favorable regulatory shift under Trump's administration, fostering optimism and market growth.",
//             Category: "PEPE", 
//             Date: "2025-2-5",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740643729/pepe-news_1.jpg",
//             Content: `
//                 <div>
//                     <p>
//                         According to CoinDesk: In response to a pro-crypto sentiment following Donald Trump’s recent election victory,
//                         Robinhood has expanded its cryptocurrency offerings, adding Solana (SOL), Pepe (PEPE), Cardano (ADA), and XRP to
//                         its platform. This addition comes as the industry anticipates a regulatory shift, with Trump’s administration likely
//                         to replace key figures at the U.S. Securities and Exchange Commission (SEC) known for their stringent stance on digital assets.
//                     </p>

//                     <p>
//                         With the inclusion of these new assets, Robinhood now offers trading in 19 cryptocurrencies to U.S. customers.
//                         The expansion aligns with Coinbase’s recent move to also add PEPE, signaling a broader trend among exchanges
//                         to expand crypto offerings as the market anticipates clearer regulatory guidelines.
//                     </p>
//                 </div>
//             `
//         },
//         {
//             id: 5,
//             Title: "Ethereum Spot ETF Sees Significant Inflows",
//             Summary: "Ethereum spot ETFs experienced a significant inflow of $12.58 million on February 11, 2025, indicating growing investor interest in Ethereum and its potential future growth.",
//             Category: "Ethereum",
//             Date: "2025-2-12",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740637623/ethereum-news_1.jpg",
//             Content: `
//                 <div>
//                     <p>
//                         According to Foresight News, data from SoSoValue indicates that on February 11, 2025,
//                         Ethereum spot ETFs experienced a total net inflow of $12.5783 million. On the same day,
//                         Grayscale's Ethereum Trust ETF (ETHE) reported no net outflow, maintaining its historical
//                         net outflow at $3.948 billion. Similarly, Grayscale's Ethereum Mini Trust ETF also recorded
//                         no net outflow, with its historical total net inflow standing at $612 million. The BlackRock
//                         ETF ETHA led the daily net inflows among Ethereum spot ETFs, with $12.5783 million, bringing
//                         its historical total net inflow to $4.436 billion. As of the latest report, the total net asset
//                         value of Ethereum spot ETFs is $9.843 billion, with an ETF net asset ratio of 3.14% relative to
//                         Ethereum's total market capitalization. The cumulative historical net inflow has reached $3.169 billion.
//                     </p>
//                 </div>
//             `    
//         },
//         {
//             id: 6,
//             Title: "BNB Chain Announces Pascal Hardfork: Key Upgrades for Ethereum Compatibility and Smart Contract Wallets",
//             Summary: "The Pascal hard fork will improve the compatibility of the BNB Smart Chain with Ethereum, opening up new possibilities for interoperability and cross-chain applications.",
//             Category: "BNB",
//             Date: "2025-2-13",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740648027/bnb_chain_news.png",
//             Content: `
//                 <div>
//                     <p>
//                         The BNB Chain Pascal hard fork, scheduled for February 25, 2025 (testnet) and mid-March 2025 (mainnet), 
//                         is set to bring significant improvements to the BNB Smart Chain (BSC) ecosystem. Designed to enhance Ethereum compatibility, 
//                         this upgrade incorporates key Ethereum Execution Layer EIPs, particularly those introduced in Ethereum’s Pectra upgrade.
//                     </p>
//                     <p>
//                         A standout feature of the Pascal hard fork is the implementation of Ethereum’s EIP-7702, enabling native 
//                         smart contract wallets and advancing account abstraction. This innovation allows wallets to function as smart contracts, 
//                         eliminating reliance on Externally Owned Accounts (EOAs) and offering greater security, flexibility, and usability.
//                     </p>
//                     <h4>What’s New in the BNB Chain Pascal Hardfork?</h4>
//                     <p>The Pascal hardfork will introduce several enhancements aimed at improving BNB Chain’s security, efficiency, and interoperability:</p>
//                     <ul>
//                         <li>Ethereum Compatibility – Incorporates Ethereum Execution Layer EIPs, aligning BSC with Ethereum’s latest technological advancements.</li>
//                         <li>Smart Contract Wallets (EIP-7702) – Enables account abstraction, allowing wallets to be managed via smart contracts instead of private keys.</li>
//                         <li>Block Header Updates (BEP-466 & EIP-7685) – Introduces a new RequestsHash field to improve block header formatting and network integrity.</li>
//                         <li>Improved Cross-Chain Interactions – Enhances interoperability between BNB Chain and other blockchain networks.</li>
//                         <li>Optimized Blob Storage – Unlike Ethereum’s upgrade, BSC will maintain a blob target of 3 and a maximum of 6, preserving gas efficiency and avoiding significant cost increases.</li>
//                     </ul>
//                 </div>
//             `
//         }, 
//         {
//             id: 7,
//             Title: "Ether Price Rises Amid 21Shares' Staking Proposal For Spot ETF",
//             Summary: "Ether's price surged due to 21Shares' proposal for a spot ETF incorporating staking, potentially boosting its appeal to institutional investors and aligning it with Bitcoin ETFs.",
//             Category: "Ethereum",
//             Date:  "2025-2-21",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740637324/ethereum-news.png",
//             Content: `
//                 <div>
//                     <p>According to Cointelegraph, the price of Ether experienced a 3.5% increase following the CBOE BZX Exchange's
//                         filing on behalf of asset manager 21Shares to incorporate staking into its spot Ether exchange-traded fund (ETF).
//                         Initially, Ether (ETH) surged to $2,776 before retracting to $2,729, as reported by CoinMarketCap.
//                     </p>
//                     <p>
//                         21Shares aims to become the first to offer Ether staking within a spot Ether ETF product, pending approval.
//                         The company plans to stake a portion of the Trust’s Ether periodically through reliable staking providers,
//                         as detailed in a February 12 filing with the United States Securities and Exchange Commission (SEC).
//                         The filing emphasizes that allowing the Trust to stake its Ether would benefit investors and enhance the Trust's ability
//                         to track returns associated with holding Ether. Additionally, 21Shares assures maintaining sufficient liquidity in the trust
//                         to meet redemption demands.
//                     </p>
//                 </div>
//             `
//         }, 
//         {
//             id: 8,
//             Title: "Ethereum News: Why Is Ethereum (ETH) Price Down Today? Key Factors Behind the Drop",
//             Summary: "Ethereum's price has plunged due to the Bybit hack, hard fork rumors, and bearish market indicators, suggesting potential further declines.",
//             Category: "Ethereum",
//             Date: "2025-2-22",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740648033/ether_down_xdh7ef.png",
//             Content: `
//              <div>
//                 <p>
//                 Ethereum’s price has dropped over 5% in the past 24 hours, sinking toward $2,700 on Feb. 22. Several key catalysts have contributed to this decline, including the Bybit hack, 
//                 growing rumors of a potential Ethereum hard fork, and a prevailing bearish market structure.
//                 </p>
//                 <img src="https://public.bnbstatic.com/static/content/live-admin-api/images/o4DUkhGo1nD93saocbmNh8.jpeg" alt="ETH trading view "></img>
//                 <h4>Bybit Hack Triggers Ethereum Sell-Off</h4>
//                 <p>One of the biggest factors driving ETH lower is the $1.5 billion exploit of Bybit, which involved over 401,000 ETH and large amounts of staked ETH (stETH, mETH, cmETH).</p>
//                 <ul>
//                     <li>Hackers compromised one of Bybit’s Ethereum cold wallets on Feb. 21, gaining access through a deceptive multisig transaction.</li>
//                     <li>Investigators, including ZachXBT, linked the attack to the North Korean Lazarus Group, a cybercrime syndicate responsible for multiple high-profile crypto thefts.</li>
//                     <li>Market fears of the stolen ETH being dumped led to a wave of sell-offs, pressuring prices downward.</li>
//                     <li>Bybit has secured an emergency bridge loan covering 80% of the stolen funds, ensuring that withdrawals continue.</li>
//                 </ul>
//                 <img src="https://public.bnbstatic.com/static/content/live-admin-api/images/uxqc8nCPnR9MpLPNqQk3pV.jpeg" alt="X information ether"></img>
//              </div>
//             `
//         }, 
//         {
//             id: 9,
//             Title: "U.S. House Committee Approves Resolution To Simplify Cryptocurrency Regulations",
//             Summary: "The U.S. House Committee's approval of H.J.Res. 25 signals a shift towards simplified crypto regulations, easing compliance burdens and potentially boosting industry growth.",
//             Category: "Regulation",
//             Date: "2025-2-27",
//             Image: "https://res.cloudinary.com/doumtmdrn/image/upload/v1740648345/us_regulation_dvfpu0.jpg",
//             Content: `
//                 <div>
//                     <p>According to Odaily, the U.S. House Ways and Means Committee has recently approved Resolution H.J.Res. 25, which aims to overturn a previously established cryptocurrency regulation deemed unfair and difficult to enforce. The primary goal of this new resolution is to alleviate the additional paperwork burden on cryptocurrency holders and the Internal Revenue Service (IRS). The approval of this resolution indicates that U.S. lawmakers are working to streamline regulatory processes related to cryptocurrencies, thereby reducing compliance burdens for market participants. This initiative could potentially foster the growth of the cryptocurrency industry.</p>
//                 </div>
//             `
//         }, 
//         ];

//     // add data
//     // const news = new News(articles)
//     // await news.save()

//     await News.insertMany(articles);
//     console.log("Database seeded! ✅");

//     } catch (err) {
//         console.error("❌ Error seeding database:", err);
//     }
// }
// insertDB()
