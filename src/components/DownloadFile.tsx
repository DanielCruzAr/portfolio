"use client";

import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext";
import { incrementCVCounter } from "@/lib/actions";

const DownloadFile = () => {
    const { setCvCounter } = useGlobalContext();

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/docs/CV_2025.pdf";
        link.download = "CV_2025.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        incrementCVCounter()
            .then((data) => {
                setCvCounter(data.new_count);
            })
            .catch((error) => {
                console.error("Error incrementing CV counter:", error);
            });
    };

    return (
        <Button
            onClick={handleDownload}
            variant="outline"
            size="icon"
            className="rounded-lg cursor-pointer"
            title="Download CV"
        >
            <Download className="h-[1.2rem] w-[1.2rem]" />
        </Button>
    );
};

export default DownloadFile;
