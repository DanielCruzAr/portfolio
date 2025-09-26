"use client";

import { ModeToggle } from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
    }
];

export function Navigation() {
    const { locale } = useParams() as { locale: string };
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex w-full py-8 px-12 
                        ${
                            isScrolled
                                ? "bg-background/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
                                : "bg-transparent"
                        }`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center items-center space-x-10 border-b-2 border-primary">
                    {components.map((component) => (
                        <div key={component.key}>
                            <a
                                href={
                                    component.href.startsWith("#")
                                        ? component.href
                                        : `/${locale}${component.href}`
                                }
                                className="text-lg hover:text-primary/70 transition-colors"
                                onClick={(e) => {
                                    if (component.href.startsWith("#")) {
                                        e.preventDefault();
                                        const element = document.querySelector(
                                            component.href
                                        );
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            });
                                        }
                                    }
                                }}
                            >
                                {t(component.key)}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-4 right-8 flex justify-center items-center space-x-4">
                <LanguageSwitcher />
                <ModeToggle />
            </div>
        </nav>
    );
}
