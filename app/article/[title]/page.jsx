"use client";
import articleData from "@/app/article.json";
import { useParams } from "next/navigation";
import styles from "@/app/style/Article.module.scss";

export default function article() {
    // 메인페이지의 노드를 클릭하면 해당 글의 정보를 파라미터로 전달받아 게시글을 렌더링 함
    const params = useParams();
    const title = decodeURIComponent(params.title);
    console.log(articleData);
    const Content = () => {
        return <div dangerouslySetInnerHTML={{ __html: articleData.content }} />;
    };
    return (
        <>
            <main className={styles.page}>
                <article>
                    <h1>{title}</h1>
                    <Content></Content>
                </article>
            </main>
        </>
    );
}
