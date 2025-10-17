import * as THREE from "three";

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


// GeoJSON types
export interface GeoJSONFeature {
  type: 'Feature';
  geometry: GeoJSONGeometry;
  properties?: any;
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface GeoJSONGeometryCollection {
  type: 'GeometryCollection';
  geometries: GeoJSONGeometry[];
}

export interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
}

export interface GeoJSONMultiPoint {
  type: 'MultiPoint';
  coordinates: [number, number][];
}

export interface GeoJSONLineString {
  type: 'LineString';
  coordinates: [number, number][];
}

export interface GeoJSONMultiLineString {
  type: 'MultiLineString';
  coordinates: [number, number][][];
}

export interface GeoJSONPolygon {
  type: 'Polygon';
  coordinates: [number, number][][];
}

export interface GeoJSONMultiPolygon {
  type: 'MultiPolygon';
  coordinates: [number, number][][][];
}

export type GeoJSONGeometry =
  | GeoJSONPoint
  | GeoJSONMultiPoint
  | GeoJSONLineString
  | GeoJSONMultiLineString
  | GeoJSONPolygon
  | GeoJSONMultiPolygon;

export type GeoJSON = GeoJSONFeature | GeoJSONFeatureCollection | GeoJSONGeometryCollection | GeoJSONGeometry;

export interface DrawThreeGeoParams {
  json: GeoJSON;
  radius: number;
  materialOptions: THREE.PointsMaterialParameters;
}