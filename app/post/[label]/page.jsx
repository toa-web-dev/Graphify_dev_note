import { fetchData } from "@/app/util/fetchData.js";
import styles from "@/app/style/Post.module.scss";
import MarkdownRenderer from "@/app/components/MarkdownRenderer.jsx";
import { underscoreToSpace } from "@/app/util/replaceEncodeUrl";
import Link from "next/link";

const query = `?label=eq.`;

async function getData(label) {
    const path = underscoreToSpace(label);
    const queryString = query + path;
    const data = await fetchData("post", queryString);
    return data;
}

export default async function Article({ params: { label } }) {
    const data = await getData(label);
    const postData = data[0];
    return (
        <>
            <main className={styles.page}>
                <div className={styles.btn_home}>
                    <Link href="/">← 뒤로가기</Link>
                </div>
                <article>
                    {postData.is_completed ? null : <div>아직 작성중인 글입니다.</div>}
                    <h1 className={styles.title}>{postData.title}</h1>
                    <div className={styles.createdAt}>{postData.createdAt}</div>
                    <MarkdownRenderer
                        className={styles.contents}
                        createdAt={postData.createdAt}
                        content={postData.content}
                    />
                </article>
            </main>
        </>
    );
}
