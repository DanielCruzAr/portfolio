"use client";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const t = useTranslations("Home");

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <main className="font-sans min-h-screen px-4 sm:px-6 lg:px-8">
                <Navigation />
                <div className="max-w-4xl mx-auto overflow-hidden mt-32 sm:px-6 lg:px-8">
                    {/* Summary Section */}
                    <section id="home" className="flex justify-between mb-10">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">
                                {t("name")}
                            </h1>
                            <p className="text-xl mb-4">{t("title")}</p>
                            <p className="max-w-2xl leading-relaxed">
                                {t("summary")}
                            </p>
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("experienceTitle")}
                        </h2>
                        <div className="space-y-6">
                            {t
                                .raw("experienceList")
                                .map((exp: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-muted-foreground/10 border-l-4 border-primary/30 pl-6 pr-2 py-4 rounded-lg"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                            <h3 className="text-xl font-semibold">
                                                {exp.title}
                                            </h3>
                                            <span className="text-sm">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="font-medium mb-1">
                                            {exp.company}
                                        </p>
                                        <p className="leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("projectsTitle")}
                        </h2>
                        <div className="space-y-6">
                            {t
                                .raw("projectsList")
                                .map((project: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-muted-foreground/10 border-l-4 border-primary/30 pl-6 pr-2 py-4 rounded-lg"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">
                                            {project.name}
                                        </h3>
                                        <p className="mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map(
                                                (
                                                    tech: string,
                                                    techIndex: number
                                                ) => (
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
                                                        href={
                                                            project.links
                                                                .playStore
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        Google Play
                                                    </a>
                                                )}
                                                {project.links.appStore && (
                                                    <a
                                                        href={
                                                            project.links
                                                                .appStore
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 underline"
                                                    >
                                                        App Store
                                                    </a>
                                                )}
                                                {project.links.github && (
                                                    <a
                                                        href={
                                                            project.links.github
                                                        }
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
                    <section id="skills" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("skillsTitle")}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {t
                                .raw("skillCategories")
                                .map((category: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-muted-foreground/10 border-l-4 border-primary/30 pl-6 pr-2 py-4 rounded-lg"
                                    >
                                        <h3 className="text-lg font-semibold mb-4">
                                            {category.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map(
                                                (
                                                    skill: string,
                                                    skillIndex: number
                                                ) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg border"
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
                    <section id="education" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("educationTitle")}
                        </h2>
                        <div className="space-y-6">
                            {t
                                .raw("educationList")
                                .map((edu: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-muted-foreground/10 border-l-4 border-primary/30 pl-6 pr-2 py-4 rounded-lg"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                            <h3 className="text-xl font-semibold">
                                                {edu.degree}
                                            </h3>
                                            <span className="text-sm">
                                                {edu.period}
                                            </span>
                                        </div>
                                        <p className="font-medium mb-1">
                                            {edu.institution}
                                        </p>
                                        <p className="font-medium">
                                            {edu.extras}
                                        </p>
                                        <p className="text-sm">
                                            {edu.location}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Certifications Section */}
                    <section id="certifications" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("certificationsTitle")}
                        </h2>
                        <div className="space-y-6">
                            {t
                                .raw("certificationsList")
                                .map((cert: any, index: number) => (
                                    <div
                                        key={index}
                                        className="bg-muted-foreground/10 border-l-4 border-primary/30 pl-6 pr-2 py-4 rounded-lg"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                            <h3 className="text-xl font-semibold">
                                                {cert.title}
                                            </h3>
                                            <span className="text-sm">
                                                {cert.year}
                                            </span>
                                        </div>
                                        <p className="font-medium mb-1">
                                            {cert.issuer}
                                        </p>
                                        <p className="mb-1">
                                            {t("certificationNumber")}:{" "}
                                            {cert.number}
                                        </p>
                                        {cert.link && (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {t("viewCertificate")}
                                            </a>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* Languages Section */}
                    <section id="languages" className="mb-10">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2">
                            {t("languagesTitle")}
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {t
                                .raw("languagesList")
                                .map((lang: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-muted-foreground/10 p-4 rounded-lg"
                                    >
                                        <span className="font-medium">
                                            {lang.language}
                                        </span>
                                        <span className="text-blue-600">
                                            {lang.level}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
