import React from "react";
import News from "../Dashboard-Page/NewsComponent/NewsComponentHandle";
import PepePic from "../../assets/pepe-news.jpg"
import PepePic_1 from "../../assets/pepe-news_1.jpg"
import ShiPic from "../../assets/shiba-news.jpg"
import EthereumPic from "../../assets/ethereum-news.png"
import EthereumPic_1 from "../../assets/ethereum-news_1.jpg"
import BNB_Pic from "../../assets/bnb_news.jpeg"


const NewsComponent = [
    {
        id: 1,
        Title: "Ether Price Rises Amid 21Shares' Staking Proposal For Spot ETF",
        Sumary: "Ether's price surged due to 21Shares' proposal for a spot ETF incorporating staking, potentially boosting its appeal to institutional investors and aligning it with Bitcoin ETFs.",
        Category: "Ethereum",
        Date: "2/13/2025",
        Image: EthereumPic,
        renderContent: () => (
            <div>
                <p>According to Cointelegraph, the price of Ether experienced a 3.5% increase following the CBOE BZX Exchange's
                    filing on behalf of asset manager 21Shares to incorporate staking into its spot Ether exchange-traded fund (ETF).
                    Initially, Ether (ETH) surged to $2,776 before retracting to $2,729, as reported by CoinMarketCap.
                </p>

                <p>
                    21Shares aims to become the first to offer Ether staking within a spot Ether ETF product, pending approval.
                    The company plans to stake a portion of the Trust’s Ether periodically through reliable staking providers,
                    as detailed in a February 12 filing with the United States Securities and Exchange Commission (SEC).
                    The filing emphasizes that allowing the Trust to stake its Ether would benefit investors and enhance the Trust's ability
                    to track returns associated with holding Ether. Additionally, 21Shares assures maintaining sufficient liquidity in the trust
                    to meet redemption demands.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        Title: "Messari BNB Chain Q4 Report: Market Cap Soars to $101.09B, DeFi TVL Hits $5.35B Amidst 114% Annual Growth",
        Sumary: "BNB Chain's market cap surged 114% YoY, reaching $101.09B in Q4 2024, while DeFi TVL grew 53% YoY to $5.35B, indicating the blockchain's resilience and growth potential.",
        Category: "BNB",
        Date: "2/4/2025",
        Image: BNB_Pic,
        renderContent: () => (
            <div>
                <p>According to Messari Report: In the fourth quarter of 2024, BNB Chain demonstrated significant growth and resilience,
                    underpinned by impressive market cap increases, strategic DeFi expansions, and pivotal technical enhancements.
                    This period marked a transformative phase for the blockchain,
                    solidifying its position as one of the top Layer 1 (L1) blockchains by revenue and innovation.</p>

                <h4>Market Cap and Revenue Insights</h4>

                <p>BNB's market cap saw a notable rise to $101.09 billion in Q4 2024,
                    marking a 22% increase from the previous quarter and a substantial 114% increase year-over-year (YoY) from $47.31 billion
                    at the beginning of the year. This growth trajectory was bolstered by a crypto market upsurge influenced by the election of
                    U.S. President Donald Trump. BNB's yearly revenue reached a record $234.0 million, driven by increased network activity
                    and adoption across its platforms.
                </p>
            </div>
        ),
    },
    {
        id: 3,
        Title: "PEPE Leads Memecoin Communities with 77,145 Holders Exceeding $1,000",
        Sumary: "PEPE's robust community, with over 77,000 holders exceeding $1,000, solidifies its leadership in the memecoin space, indicating strong investor confidence and potential for sustained growth.",
        Category: "PEPE",
        Date: "12/25/2024",
        Image: PepePic,
        renderContent: () => (
            <div>
                <p>PEPE has emerged as the top memecoin in terms of community wealth, with 77,145 holders having balances
                    exceeding $1,000, according to data shared by memecoin influencer Murad on December 25.</p>

                <ul>
                    <h4>Key Highlights:</h4>
                    <li>
                        Wealth Distribution: Holders with over $1,000 account for 21.5% of PEPE's total community,
                        showcasing strong belief and participation within the ecosystem.
                    </li>

                    <li>
                        Community Leadership: PEPE surpasses all other memecoins in this metric, reflecting its
                        dominant position in the memecoin market.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: 4,
        Title: "Ethereum Spot ETF Sees Significant Inflows",
        Sumary: "Ethereum spot ETFs experienced a significant inflow of $12.58 million on February 11, 2025, indicating growing investor interest in Ethereum and its potential future growth.",
        Category: "Ethereum",
        Date: "2/12/2025",
        Image: EthereumPic_1,
        renderContent: () => (
            <div>
                <p>
                    According to Foresight News, data from SoSoValue indicates that on February 11, 2025,
                    Ethereum spot ETFs experienced a total net inflow of $12.5783 million. On the same day,
                    Grayscale's Ethereum Trust ETF (ETHE) reported no net outflow, maintaining its historical
                    net outflow at $3.948 billion. Similarly, Grayscale's Ethereum Mini Trust ETF also recorded
                    no net outflow, with its historical total net inflow standing at $612 million. The BlackRock
                    ETF ETHA led the daily net inflows among Ethereum spot ETFs, with $12.5783 million, bringing
                    its historical total net inflow to $4.436 billion. As of the latest report, the total net asset
                    value of Ethereum spot ETFs is $9.843 billion, with an ETF net asset ratio of 3.14% relative to
                    Ethereum's total market capitalization. The cumulative historical net inflow has reached $3.169 billion.
                </p>
            </div>
        ),
    },

    {
        id: 5,
        Title: "Shiba Inu Partners with UAE Ministry of Energy to Implement Blockchain in Government Operations",
        Sumary: "Shiba Inu's partnership with the UAE Ministry of Energy brings blockchain to government operations, potentially revolutionizing public sector efficiency and transparency.",
        Category: "Shiba",
        Date: "2/5/2025",
        Image: ShiPic,
        renderContent: () => (
            <div>
                <p>
                    According to a report from Watcher.guru, Shiba Inu (SHIB) has announced a partnership with the United Arab Emirates Ministry
                    of Energy and Infrastructure (MOEI) to integrate its blockchain-based operating system, ShibOS, into government activities.
                    This partnership represents the first instance of a government globally implementing blockchain technology at the federal level.
                    The Shiba Inu team expressed enthusiasm about this pioneering venture, emphasizing the potential of ShibOS to revolutionize public
                    sector operations by introducing enhanced transparency, security, and efficiency.
                </p>

                <h4>UAE's Blockchain Strategy and Economic Impact</h4>

                <p>
                    The UAE has outlined a comprehensive blockchain strategy that aims to transition 50% of government transactions
                    onto blockchain platforms. This strategic shift is expected to save more than $3 billion annually in transaction
                    and document processing fees. Sharif Al Olama, the UAE's Deputy Minister of Energy and Petroleum Affairs, highlighted
                    the significance of this collaboration, stating, "We are pleased to deepen our commitment to cutting-edge digital services.
                    This collaboration marks a critical step in our journey to redefine government services."
                </p>
            </div>
        ),
    },

    {
        id: 6,
        Title: "Robinhood Adds SOL, PEPE, ADA, and XRP Following Trump’s Election Victory, Signaling a Shift in Crypto Policy",
        Sumary: "Robinhood's expansion of crypto offerings, including SOL, ADA, and XRP, reflects the industry's anticipation of a favorable regulatory shift under Trump's administration, fostering optimism and market growth.",
        Category: "PEPE",
        Date: "2/5/2025",
        Image: PepePic_1,
        renderContent: () => (
            <div>
                <p>
                    According to CoinDesk: In response to a pro-crypto sentiment following Donald Trump’s recent election victory,
                    Robinhood has expanded its cryptocurrency offerings, adding Solana (SOL), Pepe (PEPE), Cardano (ADA), and XRP to
                    its platform. This addition comes as the industry anticipates a regulatory shift, with Trump’s administration likely
                    to replace key figures at the U.S. Securities and Exchange Commission (SEC) known for their stringent stance on digital assets.
                </p>

                <p>
                    With the inclusion of these new assets, Robinhood now offers trading in 19 cryptocurrencies to U.S. customers.
                    The expansion aligns with Coinbase’s recent move to also add PEPE, signaling a broader trend among exchanges
                    to expand crypto offerings as the market anticipates clearer regulatory guidelines.
                </p>
            </div>
        ),
    },
];

export default NewsComponent;
