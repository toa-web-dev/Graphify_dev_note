"use client";
// import data from "@/app/util/article.json";
// import { fetchData } from "@/app/util/fetchData.js";
import styles from "@/app/style/Article.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MarkdownRenderer from "@/app/components/MarkdownRenderer.jsx";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const anonKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Article() {
    const param = useParams();
    const [postContent, setPostContent] = useState(null);
    useEffect(() => {
        (async () => {
            let URL = `${apiUrl}/post?select=content&id=eq.1`;
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    "Content-Type": "text/html",
                    apikey: anonKey,
                },
            });
            const data = await response.json();
            setPostContent(...data);
        })();
    }, []);
    return (
        <>
            <main className={styles.page}>{postContent && <MarkdownRenderer content={postContent.content} />}</main>
        </>
    );
}
