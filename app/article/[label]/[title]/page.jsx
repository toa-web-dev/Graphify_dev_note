"use client";
// import data from "@/app/util/article.json";
import { fetchData } from "@/app/util/fetchData.js";
import styles from "@/app/style/Article.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function Article() {
    const param = useParams();
    const [articleData, setArticleData] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await fetchData("article", param.label);
            setArticleData(...data);
        })();
    }, []);
    const Contents = () => {
        return <div dangerouslySetInnerHTML={{ __html: articleData.contents }} />;
    };
    return (
        <>
            <main className={styles.page}>
                <article>
                    {articleData && (
                        <>
                            <h1>{articleData.title}</h1>
                            <Contents></Contents>
                        </>
                    )}
                </article>
            </main>
        </>
    );
}
