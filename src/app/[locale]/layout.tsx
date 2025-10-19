import { NextIntlClientProvider } from "next-intl";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

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
                    <GlobalProvider>
                        <Navigation />
                        <main className="font-sans min-h-screen px-4 sm:px-6 lg:px-8">
                            {children}
                        </main>
                        <Footer />
                    </GlobalProvider>
                </NextIntlClientProvider>
            </ThemeProvider>
        </>
    );
}
