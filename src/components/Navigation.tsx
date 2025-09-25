"use client";

import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useParams } from "next/navigation";

const components: { title: string; href: string }[] = [
    {
        title: "Home",
        href: "/",
    },
];

export function Navigation() {
    const { locale } = useParams() as { locale: string };

    return (
        <div className="flex w-full justify-between py-4 px-12">
            <nav className="flex justify-center items-center space-x-2">
                {components.map((component) => (
                    <div key={component.title}>
                        <Link href={`/${locale}${component.href}`}>
                            {component.title}
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
