"use client";

import { fetchCoordinates } from "@/lib/actions";
import { createGlowMarkerTexture, drawThreeGeo } from "@/lib/threeGeo";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GeoJSONFeatureCollection } from "@/lib/types";

// TEST DATA
/*
// Example coordinates (longitude, latitude)
const coordinates: [number, number][] = [
    [-74.006, 40.7128], // New York
    [-0.1278, 51.5074], // London
    [139.6917, 35.6895], // Tokyo
];

// Convert to GeoJSON
const geoJsonData: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: coordinates.map((coord, index) => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: coord,
        },
        properties: {
            id: index,
            name: `Point ${index + 1}`,
        },
    })),
};
*/

export default function ThreeScene() {
    const mountRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [countries, setCountries] = useState<GeoJSONFeatureCollection | null>(
        null
    );
    const [points, setPoints] = useState<THREE.Object3D | null>(null);

    useEffect(() => {
        // create circular sprite texture for round points
        const canvas = document.createElement("canvas");
        const markerTex = createGlowMarkerTexture(canvas);

        fetch("/datasets/countries.json")
            .then((response) => response.text())
            .then((text) => {
                const data = JSON.parse(text);
                setCountries(data);
            })
            .catch((error) => console.log(error));

        // Fetch coordinates
        fetchCoordinates()
            .then((data) => {
                const points = drawThreeGeo({
                    json: data,
                    radius: 2,
                    materialOptions: {
                        size: 0.09,
                        sizeAttenuation: true,
                        map: markerTex,
                        transparent: true,
                        alphaTest: 0.1,
                    },
                });
                setPoints(points);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (!countries || !points) return;

        // This function can be used to update the scene when countries or points change
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(
            theme === "dark" ? 0x000000 : 0xffffff
        );
        const fogColor = theme === "dark" ? 0x000000 : 0xffffff;
        scene.fog = new THREE.FogExp2(fogColor, 0.2);
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current!.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Create a sphere to represent the Earth
        const geometry = new THREE.SphereGeometry(2);
        const lineMat = new THREE.LineBasicMaterial({
            color: theme === "dark" ? 0xffffff : 0x000000,
            transparent: true,
            opacity: 0.4,
        });
        const edges = new THREE.EdgesGeometry(geometry, 1);
        const line = new THREE.LineSegments(edges, lineMat);
        scene.add(line);

        camera.position.z = 5;

        const countriesGeo = drawThreeGeo({
            json: countries,
            radius: 2,
            materialOptions: {
                color: theme === "dark" ? 0xffffff : 0x000000,
            },
        });
        
        scene.add(countriesGeo);
        scene.add(points);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            // Earth-like rotation: primarily around Y-axis with slight tilt
            // line.rotation.y += 0.005; // Main rotation around Y-axis (day/night cycle)
            // line.rotation.x += 0.0001; // Very slight wobble on X-axis
            renderer.render(scene, camera);
            controls.update();
        };
        animate();

        return () => {
            mountRef.current!.removeChild(renderer.domElement);
        };
    }, [theme, countries, points]);

    return <div ref={mountRef} />;
}
