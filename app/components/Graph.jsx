"use client";

import { useRouter } from "next/navigation";
import { getGraphStructure } from "../util/getGraphStructure.js";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../style/Graph.module.scss";
import { spaceToUnderscore } from "../util/replaceEncodeUrl.js";

const ALPHA_DECAY = 0.09

export default function Graph() {
    const svgRef = useRef();
    const router = useRouter();
    const [fetchData, setFetchData] = useState(null);
    useEffect(() => {
        if (!fetchData) {
            (async () => {
                setFetchData(await getGraphStructure());
            })();
        }
    }, []);
    useEffect(() => {
        if (fetchData && svgRef.current.children.length === 0) {
            const { nodes, links } = fetchData;
            const svg = d3.select(svgRef.current);
            const container = svg.append("g");
            const link = container.selectAll("line").data(links).join("line");
            let circleStyle;
            const node = container
                .selectAll("g")
                .data(nodes)
                .join("g")
                .each(function (d) {
                    if (d.isCompleted) circleStyle = `${styles.complete}`;
                    else if (d.isCompleted === false) circleStyle = `${styles.draft}`;
                    else circleStyle = `${styles.pending}`;

                    d3.select(this).attr("class", `${styles.node}`);
                    d3.select(this).append("circle").attr("class", circleStyle);
                    d3.select(this)
                        .append("text")
                        .attr("class", `${styles.label}`)
                        .attr("y", 35)
                        .text((d) => d.label);
                });

            svg.call(
                //확대/축소가 몇배인지 이벤트정보를 그래프컨트롤러에 상태로 전달해 조절가능하게 하기
                d3
                    .zoom()
                    .scaleExtent([0.5, 1.5])
                    .on("zoom", (e) => {
                        container.attr("transform", e.transform);
                    })
            );

            node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
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

            node.on("click", clicked);
            function clicked(event, d) {
                //게시글 제목을 URL로 할때 공백이 %20으로 변환되므로 공백을 _(언더바)로 변환하기
                const path = spaceToUnderscore(d.label);
                router.push(`/post/${path}`);
            }

            const svgWidth = svgRef.current.clientWidth;
            const svgHeight = svgRef.current.clientHeight;
            const simulation = d3
                .forceSimulation(nodes)
                .force(
                    "link",
                    d3
                        .forceLink(links)
                        .id((d) => d.id)
                        .distance(100)
                )
                .force("charge", d3.forceManyBody().strength(-100).distanceMax(160))
                .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
                .alphaDecay(ALPHA_DECAY)
                .on("tick", () => {
                    link.attr("x1", (d) => d.source.x)
                        .attr("y1", (d) => d.source.y)
                        .attr("x2", (d) => d.target.x)
                        .attr("y2", (d) => d.target.y);
                    node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
                });
        }
    }, [fetchData]);

    return <svg ref={svgRef} className={styles.svg_graph} />;
}
