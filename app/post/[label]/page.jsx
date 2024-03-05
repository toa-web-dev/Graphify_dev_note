"use client";
import { fetchData } from "@/app/util/fetchData.js";
import styles from "@/app/style/Post.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/app/components/MarkdownRenderer.jsx";
import { underscoreToSpace } from "@/app/util/replaceEncodeUrl";
import Link from "next/link";

const query = `?label=eq.`;
export default function Article() {
    const param = useParams();
    const [postContent, setPostContent] = useState(null);
    useEffect(() => {
        const path = underscoreToSpace(param.label);
        const queryString = query + path;
        (async () => {
            const data = await fetchData("post", queryString);
            setPostContent(...data);
        })();
    }, []);
    return (
        <>
            {postContent && (
                <main className={styles.page}>
                    <div className={styles.btn_home}>
                        <Link href="/">← 뒤로가기</Link>
                    </div>
                    <article>
                        {postContent.is_completed ? null : <div>아직 작성중인 글입니다.</div>}
                        <h1 className={styles.title}>{postContent.title}</h1>
                        <div className={styles.createdAt}>{postContent.createdAt}</div>
                        <MarkdownRenderer
                            className={styles.contents}
                            createdAt={postContent.createdAt}
                            content={postContent.content}
                        />
                    </article>
                </main>
            )}
        </>
    );
}
