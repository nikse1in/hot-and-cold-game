import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Hot and Cold - Word Guessing Game",
    description: "Guess the secret word! The delightfully frustrating word guessing game.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
