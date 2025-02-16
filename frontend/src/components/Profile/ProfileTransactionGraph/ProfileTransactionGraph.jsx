import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Loader from "../../Loader/Loader";
import "./ProfileTransactionGraph.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WalletGraph = ({ initialWallet }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const zoomRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchTransactions(initialWallet);
  }, [initialWallet]);

  const fetchTransactions = async (walletAddress) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/v1/api/wallet/wallet-graph/${walletAddress}`
      );
      const data = await response.json();
      const transactions = data.transactions;

      const nodesSet = new Set(graphData.nodes.map((n) => n.id));
      const newNodes = [];
      const newLinks = [];

      transactions.forEach((tx) => {
        if (!nodesSet.has(tx.from)) {
          newNodes.push({ id: tx.from });
          nodesSet.add(tx.from);
        }
        if (!nodesSet.has(tx.to)) {
          newNodes.push({ id: tx.to });
          nodesSet.add(tx.to);
        }
        newLinks.push({ source: tx.from, target: tx.to, amount: tx.amount });
      });

      setGraphData((prev) => {
        const updatedGraph = {
          nodes: [...prev.nodes, ...newNodes],
          links: [...prev.links, ...newLinks],
        };
        drawGraph(updatedGraph);
        return updatedGraph;
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (graphData.nodes.length > 0) {
      drawGraph();
    }
  }, [graphData]);

  const drawGraph = () => {
    d3.select("#profileTransactionGraph").selectAll("*").remove();

    const container = document.getElementById("profileTransactionGraph");
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const svg = d3
      .select("#profileTransactionGraph")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${width}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(
        d3.zoom().on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
      );

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    zoomRef.current = zoom;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "var(--grey-color)")
      .style("color", "var(--white-color)")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("font-size", "12px")
      .style("visibility", "hidden")
      .style("pointer-events", "none");

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, width / 2));

    const link = g
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .style("stroke", "var(--third-color)")
      .style("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    g.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", "var(--secondary-color)");

    const node = g
      .selectAll("circle")
      .data(graphData.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "var(--primary-color)")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => {
        setSelectedNode(d);
        setMenuPosition({
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .text(d.id)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    const text = g
      .selectAll("text")
      .data(graphData.nodes)
      .enter()
      .append("text")
      .text((d) => d.id.substring(0, 6) + "...")
      .attr("x", 12)
      .attr("y", 3)
      .style("font-size", "10px")
      .style("fill", "var(--white-color)");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      text.attr("x", (d) => d.x + 12).attr("y", (d) => d.y + 3);
    });
  };

  // Updated Zoom Functions (use zoomRef)
  const zoomHandler = (scaleFactor) => {
    if (zoomRef.current) {
      d3.select("#profileTransactionGraph svg")
        .transition()
        .duration(500)
        .call(zoomRef.current.scaleBy, scaleFactor);
    }
  };

  const resetZoom = () => {
    if (zoomRef.current) {
      d3.select("#profileTransactionGraph svg")
        .transition()
        .duration(500)
        .call(zoomRef.current.transform, d3.zoomIdentity);
    }
  };

  // Menu click
  const handleMenuClick = (action) => {
    if (action === "expand") {
      fetchTransactions(selectedNode.id);
    } else if (action === "open") {
      // Get the current URL
      const currentUrl = window.location.href;
      // Extract the base URL (everything before the last part)
      const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
      // Construct the new URL
      const searchUrl = `${baseUrl}/${selectedNode.id}`;
      window.open(searchUrl, "_blank");
    }
    setMenuPosition(null);
  };

  const closeMenu = () => {
    setMenuPosition(null);
  };

  return (
    <div>
      {loading && <Loader />}
      <div id="profileTransactionGraph"></div>
      {menuPosition && (
        <div
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
          }}
          className="profileTransactionGraph-tooltipNode"
        >
          <ul style={{ listStyleType: "none", margin: 0, padding: "10px" }}>
            <li
              style={{ padding: "5px 10px" }}
              onClick={() => handleMenuClick("address")}
            >
              {selectedNode?.id}
            </li>
            <li
              style={{ cursor: "pointer", padding: "5px 10px" }}
              onClick={() => handleMenuClick("expand")}
            >
              Expand
            </li>
            <li
              style={{ cursor: "pointer", padding: "5px 10px" }}
              onClick={() => handleMenuClick("open")}
            >
              Search Address in New Window
            </li>
          </ul>
          <button
            onClick={closeMenu}
            style={{
              display: "block",
              margin: "5px auto",
              padding: "5px 10px",
              color: "var(--white-color)",
              background: "var(--price-falling)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
      <div className="profileTransactionGraph-zoomBtn">
        <button onClick={() => zoomHandler(1.2)}>Zoom In</button>
        <button onClick={() => zoomHandler(0.8)}>Zoom Out</button>
        <button onClick={() => resetZoom()}>Reset</button>
      </div>
    </div>
  );
};

export default WalletGraph;
