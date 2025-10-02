// TypeScript interfaces for the data structures
export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    links?: {
        playStore?: string;
        appStore?: string;
        github?: string;
    };
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    location?: string;
    extras?: string;
    description?: string;
}

export interface Certification {
    title: string;
    issuer: string;
    year: string;
    number: string;
    link?: string;
}

export interface Language {
    language: string;
    level: string;
}

export interface SiteInfoResponse {
    new_count: number;
}

export interface SiteInfoData {
    visits: number;
    cv_downloads: number;
}
