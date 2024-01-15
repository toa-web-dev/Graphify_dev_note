"use client";

import { useRouter } from "next/navigation";
import { getGraphStructure } from "../util/getGraphStructure.jsx";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styles from "../style/Graph.module.scss";

export default function Graph() {
    const svgRef = useRef();
    const router = useRouter();

    const [graphData, setGraphData] = useState(null);
    useEffect(() => {
        (async () => {
            const { nodes, links } = await getGraphStructure();
            setGraphData({ nodes, links });
        })();
    }, []);
    useEffect(() => {
        if (graphData) {
            const { nodes, links } = graphData;
            const svg = d3.select(svgRef.current);
            const link = svg.selectAll("line").data(links).join("line");
            const node = svg
                .selectAll("g")
                .data(nodes)
                .join("g")
                .each(function (d) {
                    d3.select(this).attr("class", `${styles.node}`).on("click", clicked);
                    d3.select(this)
                        .append("title")
                        .text((d) => {
                            if (d.title) return d.title;
                        });
                    d3.select(this).append("circle");
                    d3.select(this)
                        .append("text")
                        .attr("class", `${styles.label}`)
                        .text((d) => d.label);
                })
                .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
            // 노드 드래그 이벤트 핸들러 함수들
            // Lerp 적용 고민 중
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
            //screen 크기가 변할때 리렌더링돼서 그래프의 중앙을 화면의 중앙에 오도록 동적으로 변경
            const simulation = d3
                .forceSimulation(nodes)
                .force(
                    "link",
                    d3.forceLink(links).id((d) => d.label)
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
        }
    }, [graphData]);
    return <svg ref={svgRef} className={styles.svg_graph} />;
}
