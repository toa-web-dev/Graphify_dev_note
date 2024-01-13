const nodes = [];
const links = [];
export function getTreeHierarchy(node) {
    // nodeList의 JSON 데이터를 탐색 알고리즘을 사용해 그래프에 사용되는 노드와 링크를 반환한다.
    nodes.push({ nodeName: node.nodeName, title: node.title });
    if (node.children) {
        for (const child of node.children) {
            links.push({ source: node.nodeName, target: child.nodeName });
            getTreeHierarchy(child);
        }
    }
    console.log(nodes, "links: ",links);
}
export { nodes, links };
