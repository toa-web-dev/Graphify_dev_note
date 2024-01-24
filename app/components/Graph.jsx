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
    const [svgData, setSvgData] = useState({ svg: null, link: null, node: null, scale: 1 });
    useEffect(() => {
        (async () => {
            const { nodes, links } = await getGraphStructure();
            setFetchData({ nodes, links });
        })();
        window.addEventListener(
            "wheel",
            (e) => {
                e.preventDefault();
                const alpha = e.deltaY < 0 ? 1.1 : 0.9;
                setSvgData((prev) => {
                    return { ...prev, scale: prev.scale * alpha };
                });
            },
            { passive: false }
        );

        window.addEventListener("resize", () => {});
    }, []);
    useEffect(() => {
        if (fetchData) {
            const { nodes, links } = fetchData;
            const svg = d3.select(svgRef.current);
            const link = svg.selectAll("line").data(links).join("line");
            const node = svg
                .selectAll("g")
                .data(nodes)
                .join("g")
                .each(function (d) {
                    d3.select(this).attr("class", `${styles.node}`);
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
                });

            setSvgData((prev) => {
                return { ...prev, svg: svg, link: link, node: node };
            });
        }
    }, [fetchData]);

    useEffect(() => {
        if (fetchData) {
            const { nodes, links } = fetchData;
            const svg = svgData.svg;
            const link = svgData.link;
            const node = svgData.node;
            node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)).on("click", clicked);
            const svgWidth = svgRef.current.clientWidth;
            const svgHeight = svgRef.current.clientHeight;
            //screen 크기가 변할때 리렌더링돼서 그래프의 중앙을 화면의 중앙에 오도록 동적으로 변경
            const simulation = d3
                .forceSimulation(nodes)
                .force(
                    "link",
                    d3.forceLink(links).id((d) => d.label)
                )
                .force("charge", d3.forceManyBody().strength(-200))
                .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
                .on("tick", () => {
                    link.attr("x1", (d) => d.source.x)
                        .attr("y1", (d) => d.source.y)
                        .attr("x2", (d) => d.target.x)
                        .attr("y2", (d) => d.target.y);
                    node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
                });

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
        }
    }, [svgData.svg, svgData.link, svgData.node]);

    useEffect(() => {
        //축소 할 때 svg가 계속 innerWidth와 innerHeight 만큼의 너비와 높이를 가지도록 갱신
        svgRef.current.style.scale = `${svgData.scale}`;
        svgRef.current.style.width = window.innerWidth;
        svgRef.current.style.height = window.innerHeight;
        svgRef.current.style.backgroundColor = "red";
    }, [svgData.scale]);

    return <svg ref={svgRef} className={styles.svg_graph} />;
}
