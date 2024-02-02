// import { fetchdata } from "../util/fetchGraphdata.js";
import data from "../util/nodeList.json";

export async function getGraphStructure() {
    const nodes = [];
    const links = [];
    // const data = await fetchdata("graph_view");
    for (const node of data) {
        nodes.push({ id: node.id, label: node.label });
        if (node.target_array && node.target_array.length !== 0) {
            node.target_array.forEach((el) => {
                links.push({ source: node.id, target: el });
            });
        }
    }
    return { nodes, links };
}
