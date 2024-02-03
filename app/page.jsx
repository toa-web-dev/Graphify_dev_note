"use client";
import styles from "./style/App.module.scss";
import Graph from "./components/Graph.jsx";
export default function app() {
    return (
        <>
            {/* 여기서 getGraphStructure()의 반환값을 메모해서 Graph 컴포넌트에 props로 전달하면 메모이제이션 가능? */}
            <Graph />
            <span className={styles.guide}>드래그하여 이동하고, 노드를 클릭해 내용을 확인 할 수 있습니다.</span>
        </>
    );
}
