"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Options from "./Options";

const components: { key: string; href: string }[] = [
    {
        key: "summary",
        href: "#home",
    },
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
    {
        key: "contact",
        href: "#footer",
    },
];

export function Navigation() {
    const { locale } = useParams() as { locale: string };
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex w-full py-8 px-12 
                        ${
                            isScrolled
                                ? "bg-background/95 xl:backdrop-blur-sm xl:border-b border-gray-200 xl:shadow-sm"
                                : "bg-transparent"
                        }`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Desktop navigation */}
                <div className="hidden xl:flex justify-center items-center space-x-10 border-b-2 border-primary">
                    {components.map((component) => (
                        <div key={component.key}>
                            <a
                                href={
                                    component.href.startsWith("#")
                                        ? component.href
                                        : `/${locale}${component.href}`
                                }
                                className="text-lg hover:text-primary/70 transition-colors"
                                onClick={(e) =>
                                    handleScrollToSection(e, component.href)
                                }
                            >
                                {t(component.key)}
                            </a>
                        </div>
                    ))}
                </div>
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
                        {components.map((component) => (
                            <div key={component.key}>
                                <a
                                    href={
                                        component.href.startsWith("#")
                                            ? component.href
                                            : `/${locale}${component.href}`
                                    }
                                    className="block py-2 px-4 text-lg hover:text-primary/70 transition-colors"
                                    onClick={(e) =>
                                        handleScrollToSection(e, component.href)
                                    }
                                >
                                    {t(component.key)}
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
