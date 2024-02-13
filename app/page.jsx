"use client";
import styles from "./style/App.module.scss";
import Graph from "./components/Graph.jsx";
export default function app() {
    const Guide = () => (
        <div className={styles.guide}>
            <ul>
                <li>노드를 클릭해 내용을 확인할 수 있습니다.</li>
                <li>드래그하여 이동 할 수 있습니다.</li>
                <li>마우스의 휠을 돌려 확대/축소 할 수 있습니다.</li>
            </ul>
        </div>
    );
    return (
        <>
            {/* 여기서 getGraphStructure()의 반환값을 메모해서 Graph 컴포넌트에 props로 전달하면 메모이제이션 가능? */}
            <Graph />
            <Guide />
        </>
    );
}
