"use client";

import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const components: { key: string; href: string }[] = [
    {
        key: "home",
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
];

export function Navigation() {
    const { locale } = useParams() as { locale: string };
    const t = useTranslations("Navigation");

    return (
        <div className="flex w-full justify-between py-8 px-12">
            <div></div>
            <nav className="flex justify-center items-center space-x-10 border-b-2 border-primary">
                {components.map((component) => (
                    <div key={component.key}>
                        <Link href={`/${locale}${component.href}`}>
                            {t(component.key)}
                        </Link>
                    </div>
                ))}
            </nav>

            <nav className="flex justify-center items-center space-x-2">
                <LanguageSwitcher />
                <ModeToggle />
            </nav>
        </div>
    );
}
