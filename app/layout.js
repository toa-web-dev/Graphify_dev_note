// import { Inter } from 'next/font/google'
import "./style/globals.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Graphify_dev_note",
    description: "지식을 도식화 하자!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* <body className={inter.className}>{children}</body> */}
            <body>{children}</body>
        </html>
    );
}
