import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Daniel Cruz Arciniega - Portfolio",
    description: "Portfolio website of Daniel Cruz Arciniega",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "es")) {
        return notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages({ locale });

    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </ThemeProvider>
        </>
    );
}
