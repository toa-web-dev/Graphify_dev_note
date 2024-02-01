"use client";

import { useRouter } from "next/navigation";
import { getGraphStructure } from "../util/getGraphStructure.jsx";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../style/Graph.module.scss";

export default function Graph() {
    const svgRef = useRef();
    const router = useRouter();
    const [fetchData, setFetchData] = useState(null);
    useEffect(() => {
        (async () => {
            const { nodes, links } = await getGraphStructure();
            setFetchData({ nodes, links });
        })();
    }, []);
    useEffect(() => {
        if (fetchData) {
            const { nodes, links } = fetchData;
            console.log(nodes, links);
            const svg = d3.select(svgRef.current);
            const box = svg.append("g");
            const link = box.selectAll("line").data(links).join("line");
            const node = box
                .selectAll("g")
                .data(nodes)
                .join("g")
                .each(function () {
                    d3.select(this).attr("class", `${styles.node}`);
                    d3.select(this).append("circle");
                    d3.select(this)
                        .append("text")
                        .attr("class", `${styles.label}`)
                        .attr("y", 30)
                        .text((d) => d.label);
                });

            svg.call(
                //확대/축소가 몇배인지 이벤트정보를 그래프컨트롤러에 상태로 전달해 조절가능하게 하기
                d3
                    .zoom()
                    .scaleExtent([0.5, 1.5])
                    .on("zoom", (e) => {
                        box.attr("transform", e.transform);
                    })
            );
            node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
            node.on("click", clicked);
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
            function clicked(event, d) {
                //게시글 제목을 URL로 할때 공백이 %20으로 변환되므로 공백을 _(언더바)로 변환하기
                if (d.title) router.push(`/article/${d.label}/${d.title}`);
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
                .force("charge", d3.forceManyBody().strength(-30))
                .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
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
