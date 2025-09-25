"use client";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("Home");

    return (
        <div className="max-w-4xl mx-auto overflow-hidden">
            {/* Summary Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{t("name")}</h1>
                    <p className="text-xl mb-4">{t("title")}</p>
                    <p className="max-w-2xl leading-relaxed">
                        {t("summary")}
                    </p>
                </div>
                <div className="mt-6 sm:mt-0 text-right">
                    <div className="space-y-2">
                        <p>{t("location")}</p>
                        <a
                            href={`mailto:${t("email")}`}
                            className="block hover:text-foreground transition-colors"
                        >
                            {t("email")}
                        </a>
                        <a
                            href={`https://${t("linkedin")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-primary/50 transition-colors"
                        >
                            {t("linkedin")}
                        </a>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                    {t("experienceTitle")}
                </h2>
                <div className="space-y-6">
                    {t.raw("experienceList").map((exp: any, index: number) => (
                        <div
                            key={index}
                            className="border-l-4 border-blue-200 pl-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {exp.title}
                                </h3>
                                <span className="text-gray-600 text-sm">
                                    {exp.period}
                                </span>
                            </div>
                            <p className="text-blue-600 font-medium mb-1">
                                {exp.company}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                    {t("projectsTitle")}
                </h2>
                <div className="space-y-6">
                    {t
                        .raw("projectsList")
                        .map((project: any, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {project.name}
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map(
                                        (tech: string, techIndex: number) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>
                                {project.links && (
                                    <div className="flex gap-4">
                                        {project.links.playStore && (
                                            <a
                                                href={project.links.playStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Google Play
                                            </a>
                                        )}
                                        {project.links.appStore && (
                                            <a
                                                href={project.links.appStore}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                App Store
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Github
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </section>

            {/* Skills Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                    {t("skillsTitle")}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {t
                        .raw("skillCategories")
                        .map((category: any, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    {category.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map(
                                        (skill: string, skillIndex: number) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1 bg-white text-gray-700 text-sm rounded border"
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* Education Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                    {t("educationTitle")}
                </h2>
                <div className="space-y-6">
                    {t.raw("educationList").map((edu: any, index: number) => (
                        <div
                            key={index}
                            className="border-l-4 border-blue-200 pl-6"
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {edu.degree}
                                </h3>
                                <span className="text-gray-600 text-sm">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="text-blue-600 font-medium mb-1">
                                {edu.institution}
                            </p>
                            <p className="text-gray-600 font-medium">
                                {edu.extras}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {edu.location}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Languages Section */}
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
                    {t("languagesTitle")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {t.raw("languagesList").map((lang: any, index: number) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                        >
                            <span className="font-medium text-gray-800">
                                {lang.language}
                            </span>
                            <span className="text-blue-600">{lang.level}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
