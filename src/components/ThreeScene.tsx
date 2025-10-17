"use client";

import { fetchCoordinates } from "@/lib/actions";
import { drawThreeGeo } from "@/lib/threeGeo";
import { GeoJSONFeatureCollection } from "@/lib/types";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const coordinates = [
    [-74.006, 40.7128], // New York
    [-0.1278, 51.5074], // London
    [139.6917, 35.6895], // Tokyo
];

// Convert to GeoJSON
const geoJsonData: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: coordinates.map((coord, index) => ({
        type: "Feature" as "Feature",
        geometry: {
            type: "Point" as "Point",
            coordinates: coord as [number, number],
        },
        properties: {
            id: index,
            name: `Point ${index + 1}`,
        },
    })),
};

export default function ThreeScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.2);
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
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
        });
        const edges = new THREE.EdgesGeometry(geometry, 1);
        const line = new THREE.LineSegments(edges, lineMat);
        scene.add(line);

        camera.position.z = 5;

        // create circular sprite texture for round points
        const createCircleTexture = (size = 128, color = "#ffffff") => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext("2d")!;
            ctx.clearRect(0, 0, size, size);
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            // texture.encoding = THREE.sRGBEncoding;
            texture.needsUpdate = true;
            return texture;
        };
        const circleTex = createCircleTexture(128, "#ffffff");

        fetch("/datasets/countries.json")
            .then((response) => response.text())
            .then((text) => {
                const data = JSON.parse(text);
                const countries = drawThreeGeo({
                    json: data,
                    radius: 2,
                    materialOptions: {
                        color: 0x80ff80,
                    },
                });
                scene.add(countries);
            })
            .catch((error) => console.log(error));

        // Fetch coordinates
        fetchCoordinates()
            .then((data) => {
                const points = drawThreeGeo({
                    json: data,
                    radius: 2,
                    materialOptions: {
                        color: 0x0000ff, // tint for the sprite
                        size: 0.05,
                        sizeAttenuation: true,
                        map: circleTex,
                        transparent: true,
                        alphaTest: 0.1,
                    },
                });
                scene.add(points);
            })
            .catch((error) => console.log(error));

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
    }, []);

    return <div ref={mountRef} />;
}
