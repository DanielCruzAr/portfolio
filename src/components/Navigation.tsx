"use client";

import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Options from "./Options";

const items: { key: string; href: string }[] = [
    {
        key: "home",
        href: "/",
    },
    {
        key: "map",
        href: "/map",
    },
    {
        key: "contact",
        href: "#footer",
    },
];

const homeItems: { key: string; href: string }[] = [
    {
        key: "experience",
        href: "#experience",
    },
    {
        key: "projects",
        href: "#projects",
    },
    {
        key: "skills",
        href: "#skills",
    },
    {
        key: "education",
        href: "#education",
    },
    {
        key: "certifications",
        href: "#certifications",
    },
    {
        key: "languages",
        href: "#languages",
    },
];

export function Navigation() {
    const { locale } = useParams() as { locale: string };
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const getMobileMenuItems = () => {
        if (pathname === "/en/" || pathname === "/es/") {
            return [...items, ...homeItems];
        }
        return items;
    };

    const handleScrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex w-full py-8 px-12 
                        ${
                            isScrolled
                                ? "bg-background/95 xl:backdrop-blur-sm xl:border-b border-gray-200 xl:shadow-sm"
                                : "bg-transparent"
                        }`}
        >
            <div className="hidden xl:block max-w-7xl mx-auto">
                {/* Desktop navigation */}
                <div className="flex justify-center items-center space-x-10 border-b-2 border-primary">
                    {items.map((item, index) => (
                        <div
                            key={item.key}
                            className="flex items-center cursor-pointer hover:text-primary/70 transition-colors"
                        >
                            <a
                                href={`/${locale}${item.href}`}
                                className="text-2xl font-medium"
                                onClick={(e) =>
                                    handleScrollToSection(e, item.href)
                                }
                            >
                                {t(item.key)}
                            </a>
                        </div>
                    ))}
                </div>
                {(pathname === "/en/" || pathname === "/es/") && (
                <div className="flex items-center space-x-4">
                    {homeItems.map((item) => (
                        <div
                            key={item.key}
                        >
                            <a
                                href={item.href}
                                className="block py-2 px-2 hover:text-primary/70 transition-colors"
                                onClick={(e) => handleScrollToSection(e, item.href)}
                            >
                                {t(item.key)}
                            </a>
                        </div>
                    ))}
                </div>
                )}
            </div>

            {/* Mobile navigation - can be added later if needed */}
            <div className="xl:hidden absolute top-4 left-8 flex justify-start">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-lg cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 z-10 bg-background/95 backdrop-blur-sm shadow-sm flex flex-col w-[150px]">
                        {getMobileMenuItems().map((item) => (
                            <div key={item.key}>
                                <a
                                    href={
                                        item.href.startsWith("#")
                                            ? item.href
                                            : `/${locale}${item.href}`
                                    }
                                    className="block py-2 px-4 text-lg hover:text-primary/70 transition-colors"
                                    onClick={(e) =>
                                        handleScrollToSection(e, item.href)
                                    }
                                >
                                    {t(item.key)}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Options />
        </nav>
    );
}
