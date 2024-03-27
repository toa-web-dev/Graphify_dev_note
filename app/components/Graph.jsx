"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "../style/Graph.module.scss";
import setNodeColor from "../util/setNodeColor";
import { spaceToUnderscore } from "../util/replaceEncodeUrl.js";

//노드의 반지름을 attr로 부여, 다른 노드와 연결이 많은 노드 크기 증가, collide r은 적게

export default function Graph({ graphData }) {
    const svgRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const graphProps = {
            nodes: graphData.nodes,
            links: graphData.links,
            svgWidth: svgRef.current?.clientWidth,
            svgHeight: svgRef.current?.clientHeight,
        };
        const { nodes, links, svgWidth, svgHeight } = graphProps;

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", [-svgWidth / 2, -svgHeight / 2, svgWidth, svgHeight])
            .attr("class", `${styles.svg_graph}`)
            .call(
                //확대/축소가 몇배인지 이벤트정보를 그래프컨트롤러에 상태로 전달해 조절가능하게 하기
                d3
                    .zoom()
                    .scaleExtent([0.5, 1.5])
                    .on("zoom", (e) => {
                        container.attr("transform", e.transform);
                    })
            );

        //zoom()의 대상이 되는 래퍼요소 생성
        const container = svg.append("g");

        // 래퍼요소 g와 함께 링크 생성
        const link = container.append("g").selectAll("line").data(links).join("line");

        // 래퍼요소 g와 함께  노드 생성
        const node = container
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .each(function (d) {
                const circle = d3
                    .select(this)
                    .append("circle")
                    .style("fill", (d) => setNodeColor(d.category));
                if (d.is_completed === true) {
                    d3.select(this).on("click", clicked);
                    circle.attr("class", `${styles.completed}`);
                }
                d3.select(this).append("text").text(d.id);
            });
        node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.id)
            )
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        // Set the position attributes of links and nodes each time the simulation ticks.
        simulation.on("tick", () => {
            link.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);
            node.select("circle")
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);
            node.select("text")
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y);
        });

        // *이벤트 선언
        function clicked(event, d) {
            const path = spaceToUnderscore(d.label);
            router.push(`/post/${path}`);
        }
        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        // Update the subject (dragged node) position during drag.
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        // Restore the target alpha so the simulation cools after dragging ends.
        // Unfix the subject position now that it’s no longer being dragged.
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return () => {
            svgRef.current = null;
        };
    }, [svgRef.current]);

    return <svg ref={svgRef} />;
}
