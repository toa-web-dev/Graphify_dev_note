"use client";
import { fetchData } from "@/app/util/fetchData.js";
import styles from "@/app/style/Post.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/app/components/MarkdownRenderer.jsx";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const anonKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Article() {
    const param = useParams();
    const [postContent, setPostContent] = useState(null);
    useEffect(() => {
        const path = param.label;
        (async () => {
            const data = await fetchData("post", `?select=content&label_fk=eq.${param.label}`);
            setPostContent(...data);
        })();
    }, []);

    return (
        <>
            <main className={styles.page}>
                <article>
                    {postContent && <MarkdownRenderer content={postContent.content} />}
                </article>
            </main>
        </>
    );
}
