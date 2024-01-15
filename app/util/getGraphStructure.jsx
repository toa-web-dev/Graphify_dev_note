// import { fetchData } from "../util/fetchGraphData.js";
import data from "../util/nodeList.json";
const nodes = [];
const links = [];
let id = 0;
export async function getGraphStructure() {
    // const data = await fetchData("graph_view");
    for (const el of data) {
        processData(el);
    }
    return { nodes, links };
}

const processData = (data) => {
    nodes.push({ id: id, label: data.label, title: data.title });
    id++;
    if (data.target_array) {
        data.target_array.forEach((el) => {
            links.push({ source: data.label, target: el });
        });
    }
};
