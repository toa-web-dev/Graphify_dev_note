"use client";
import Graph from "./components/Graph.jsx";
export default function app() {
    return (
        <>
            {/* 여기서 getGraphStructure()의 반환값을 메모해서 Graph 컴포넌트에 props로 전달하면 메모이제이션 가능? */}
            <Graph />
        </>
    );
}
