"use client";
import { useEffect, useState } from "react";

import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrism from "@mapbox/rehype-prism";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const MarkdownComponent = ({ content }) => {
    const [parsedContent, setParsedContent] = useState("");
    useEffect(() => {
        const result = unified()
            .use(remarkGfm)         // GFM(github flavored markdown)을 추가,적용합니다.
            .use(remarkToc)         // 마크다운에 이동가능한 목차를 생성합니다.
            .use(remarkParse)       // 마크다운을 구문트리로 변환합니다.
            .use(remarkRehype)      // remark->rehype 양식으로 변환합니다.
            .use(rehypeStringify)   // HTML 문자열을 생성합니다.
            .use(rehypeSlug)        // HTML 헤더 태그에 id를 할당합니다.
            .use(rehypePrism)       // code 태그에 class를 할당합니다.
            .processSync(content);
        setParsedContent(result.value);
        Prism.highlightAll();
    }, []);
    return <div dangerouslySetInnerHTML={{ __html: parsedContent }}></div>;
};

export default MarkdownComponent;
