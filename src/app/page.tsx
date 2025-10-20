"use client";

import Loader from "@/components/Loader";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const lang = navigator.language || "en";
        const locale = lang.startsWith("es") ? "es" : "en";
        window.location.replace(`/${locale}/`);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Loader />
        </div>
    );
}
