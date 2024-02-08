import { fetchData } from "../util/fetchData.js";
export async function getGraphStructure() {
    const nodes = [];
    const links = [];
    const data = await fetchData("graph_data_view");
    for (const item of data) {
        nodes.push({ id: item.source, label: item.source });
        if (item.targets && item.targets.length !== 0) {
            item.targets.forEach((el) => {
                links.push({ source: item.source, target: el });
            });
        }
    }
    console.log("nodes: ", nodes, "links: ", links);
    return { nodes, links };
}
