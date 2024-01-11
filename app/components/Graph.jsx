"use client";

import nodeList from "../nodeList.json";
import { getTreeHierarchy, nodes, links } from "../util/getTreeHierarchy.jsx";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "../style/Graph.module.scss";

export default function Graph() {
    const svgRef = useRef();
    useEffect(() => {
        getTreeHierarchy(nodeList);
        const svg = d3.select(svgRef.current);
        const link = svg.selectAll("line").data(links).join("line");
        const node = svg
            .selectAll("g")
            .data(nodes)
            .join("g")
            .each(function (d) {
                d3.select(this)
                    .append("title")
                    .text((d) => d.title);
                d3.select(this).append("circle");
                d3.select(this)
                    .append("text")
                    .attr("class", `${styles.node_name}`)
                    .text((d) => d.nodeName);
            })
            .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

        // 노드 드래그 이벤트 핸들러 함수들
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        const svgWidth = svgRef.current.clientWidth;
        const svgHeight = svgRef.current.clientHeight;
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.nodeName)
            )
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
            .on("tick", () => {
                link.attr("x1", (d) => d.source.x)
                    .attr("y1", (d) => d.source.y)
                    .attr("x2", (d) => d.target.x)
                    .attr("y2", (d) => d.target.y);
                node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
            });
    }, []);
    return <svg ref={svgRef} className={styles.svg_graph} />;
}
