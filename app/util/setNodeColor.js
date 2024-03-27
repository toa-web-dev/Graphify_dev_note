export default function setNodeColor(category) {
    let mainCategory = "";
    let color = "gray";
    if (category !== null) mainCategory = category[0];

    switch (mainCategory) {
        case "Javascript":
            color = "#F7DF1E";
            break;
        case "React":
            color = "#1f77b4";
            break;
        default:
            color = "#DDDDDD";
            break;
    }
    return color;
}
