"use client";

import ThreeScene from "@/components/ThreeScene";
import { useTranslations } from "next-intl";
import React from "react";

function Map() {
    const t = useTranslations("Map");

    return (
        <div className="flex justify-center items-center h-screen w-full">
            {/* <div className="mt-32">
                <h1 className="text-4xl font-bold my-2">{t("title")}</h1>
                <p className="max-w-md">{t("description")}</p>
            </div> */}
            <ThreeScene />
        </div>
    );
}

export default Map;
