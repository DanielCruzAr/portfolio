import React from "react";
import DownloadFile from "./DownloadFile";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";

const Options = () => {
    return (
        <div className="absolute top-4 right-8 flex justify-center items-center space-x-4">
            <LanguageSwitcher />
            <ModeToggle />
            <DownloadFile />
        </div>
    );
};

export default Options;
