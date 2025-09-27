"use client";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const lang = navigator.language || "en";
        const locale = lang.startsWith("es") ? "es" : "en";
        window.location.replace(`/${locale}/`);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center justify-center text-primary">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid 
                            border-current border-e-transparent align-[-0.125em] text-surface
                            motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-text-foreground"
                    role="status"
                >
                    <span className="!absolute -m-px! h-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
                        Loading...
                    </span>
                </div>
            </div>
        </div>
    );
}
