import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../../../data/balance.json"; // Import the data
import "./ProfileBalanceChart.css";

const ProfileBalanceChart = () => {
  const chartRef = useRef(null);
  const [filteredData, setFilteredData] = useState(data);
  const [activeFilter, setActiveFilter] = useState("1M");

  const filterData = (filter) => {
    const today = new Date();
    let startDate;

    if (filter === "1W") {
      startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (filter === "1M") {
      startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (filter === "1Y") {
      startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
    } else {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((d) => new Date(d.date) >= startDate);
    setFilteredData(filtered);
  };

  useEffect(() => {
    const containerWidth = chartRef.current.clientWidth; // Get container width
    const containerHeight = chartRef.current.clientHeight || 300; // Fallback height

    const margin = {
      top: containerHeight * 0.1,
      right: containerWidth * 0,
      bottom: containerHeight * 0.1,
      left: containerWidth * 0.05,
    };

    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMidYMid meet");

    const xScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "var(--primary-color)")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSize(0).tickPadding(10))
      .selectAll("text")
      .attr("fill", "white")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(5).tickSize(0).tickPadding(10))
      .selectAll("text")
      .attr("fill", "white");

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "profileBalance-tooltip")
      .style("position", "absolute")
      .style("background", "var(--secondary-color)")
      .style("color", "var(--white-color)")
      .style("padding", "5px 10px")
      .style("border-radius", "4px")
      .style("pointer-events", "none");

    svg
      .selectAll(".profileBalance-dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "profileBalance-dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 5)
      .attr("fill", "var(--white-color)")
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1);
        d3.select(this).attr("r", 7).attr("fill", "var(--third-color)");
      })
      .on("mousemove", function (event, d) {
        tooltip
          .html(`Date: ${d.date}<br>Value: ${d.value}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
        d3.select(this).attr("r", 5).attr("fill", "var(--white-color)");
      });
  }, [filteredData]);

  return (
    <div className="profileBalance-chart">
      <div className="profileBalance-header">
        <h2>Balance</h2>
        <div className="profileBalance-time-options">
          {["1W", "1M", "1Y", "ALL"].map((filter) => (
            <span
              key={filter}
              className={filter === activeFilter ? "active" : ""}
              onClick={() => {
                setActiveFilter(filter);
                filterData(filter);
              }}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <div ref={chartRef}></div>
    </div>
  );
};

export default ProfileBalanceChart;
