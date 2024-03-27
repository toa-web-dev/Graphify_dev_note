// import { Inter } from 'next/font/google'
import "./style/globals.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "개발 노트를 한눈에, Graphify_dev_note",
    description:
        "개발 학습을 위해 블로깅하는 문서를 네트워크 그래프로 시각화하여 개념을 정리하고 다른 내용과의 연관성을 쉽게 확인 할 수 있는 프로젝트입니다.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
