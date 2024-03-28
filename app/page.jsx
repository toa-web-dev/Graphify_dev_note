import Graph from "./components/Graph.jsx";
import Guide from "./components/Guide";
import { getGraphStructure } from "./util/getGraphStructure";

export default async function app() {
    const data = await getGraphStructure();
    return (
        <>
            {/* 여기서 getGraphStructure()의 반환값을 메모해서 Graph 컴포넌트에 props로 전달하면 메모이제이션 가능? */}
            <Graph graphData={data} />
            <Guide nodesData={data.nodes} />
        </>
    );
}
