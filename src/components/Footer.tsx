"use client";

import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("Footer");
    return (
        <footer id="footer" className="bg-primary text-white mt-12">
            <div className="max-w-7xl mx-auto py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                    &copy; {new Date().getFullYear()} Daniel Cruz Arciniega.
                    <p>{t("location")}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-md font-semibold">{t("socialMedia")}</h3>
                    <a
                        href={`https://${t("linkedin")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-primary/50 transition-colors"
                    >
                        {t("linkedin")}
                    </a>
                </div>
                <div className="text-center sm:text-right">
                    <h3 className="text-md font-semibold">{t("contact")}</h3>
                    <a
                        href={`mailto:${t("email")}`}
                        className="block hover:text-primary/50 transition-colors"
                    >
                        {t("email")}
                    </a>
                    <p>(+52) 4423516835</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
