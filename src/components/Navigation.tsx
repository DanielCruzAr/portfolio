"use client";

import * as React from "react";
import { ModeToggle } from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

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
    }
];

// TODO: make navbar fixed
export function Navigation() {
    const { locale } = useParams() as { locale: string };
    const t = useTranslations("Navigation");

    return (
        <div className="flex w-full justify-between py-8 px-12">
            <div></div>
            <nav className="flex justify-center items-center space-x-10 border-b-2 border-primary">
                {components.map((component) => (
                    <div key={component.key}>
                        <a 
                            href={component.href.startsWith('#') ? component.href : `/${locale}${component.href}`}
                            className="text-lg hover:text-primary/70 transition-colors"
                            onClick={(e) => {
                                if (component.href.startsWith('#')) {
                                    e.preventDefault();
                                    const element = document.querySelector(component.href);
                                    if (element) {
                                        element.scrollIntoView({ 
                                            behavior: "smooth",
                                            block: "start"
                                        });
                                    }
                                }
                            }}
                        >
                            {t(component.key)}
                        </a>
                    </div>
                ))}
            </nav>

            <nav className="flex justify-center items-center space-x-4">
                <LanguageSwitcher />
                <ModeToggle />
            </nav>
        </div>
    );
}
