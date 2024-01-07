"use client";

import nodeList from "../nodeList.json";
import { getTreeHierarchy, nodes, links } from "../util/getTreeHierarchy.jsx";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Graph() {
    const svgRef = useRef();
    useEffect(() => {
        getTreeHierarchy(nodeList);
        const width = 1000;
        const height = 600;
        const svg = d3
            .select(svgRef.current)
            .attr("width", width) // SVG의 너비 설정
            .attr("height", height); // SVG의 높이 설정
        const link = svg.selectAll("line").data(links).join("line").attr("stroke", "black").attr("stroke-width", 1);
        const node = svg
            .selectAll("g")
            .data(nodes)
            .join("g")
            .each(function (d) {
                d3.select(this).append("circle").attr("r", "1rem").attr("fill", "skyblue")
                d3.select(this)
                    .append("text")
                    .text((d) => d.nodeName)
                    .attr("x", "-2rem")
                    .attr("y", 5);
            });
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.nodeName)
            )
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", () => {
                link.attr("x1", (d) => d.source.x)
                    .attr("y1", (d) => d.source.y)
                    .attr("x2", (d) => d.target.x)
                    .attr("y2", (d) => d.target.y);
                node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
            });
    }, [nodes, links]);
    return <svg ref={svgRef} />;
}
