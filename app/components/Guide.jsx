import styles from "../style/Guide.module.scss";
import setNodeColor from "../util/setNodeColor";

export default function Guide({ nodesData }) {
    const categorySet = new Set(nodesData.flatMap((el) => el.category));
    categorySet.delete(null);
    const categoryArray = [...categorySet];
    return (
        <div className={styles.guide}>
            <h4>사용 안내</h4>
            <ul>
                <li>노드를 클릭해 내용을 확인할 수 있습니다.</li>
                <li>드래그하여 이동 할 수 있습니다.</li>
                <li>마우스의 휠을 돌려 확대/축소 할 수 있습니다.</li>
            </ul>
            <h5>카테고리</h5>
            <ul>
                {categoryArray.map((el) => {
                    return (
                        <li key={el}>
                            <div className={styles.node} style={{ backgroundColor: setNodeColor(el) }}></div>
                            <div>
                                <span>{el}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
