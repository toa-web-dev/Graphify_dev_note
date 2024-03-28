/**
 * @param {string} category
 * @returns string
 */
export default function setNodeColor(category) {
    let color = "";
    switch (category) {
        case "Javascript":
            color = "#F7DF1E";
            break;
        case "React":
            color = "#61DAFB";
            break;
        case "Next.js":
            color = "#000000";
            break;
        default:
            color = "#DDDDDD";
            break;
    }
    return color;
}
