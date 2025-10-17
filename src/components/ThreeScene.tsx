"use client";

import { drawThreeGeo } from "@/lib/threeGeo";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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

    fetch('/datasets/countries.json')
      .then(response => response.text())
      .then(text => {
        const data = JSON.parse(text);
        console.log(data);
        const countries = drawThreeGeo({
          json: data,
          radius: 2,
          materalOptions: {
            color: 0x80FF80
          }
        });
        scene.add(countries);
      })
      .catch(error => console.log(error));

    //const lat = 51.5081;
    //const lon = -0.1278;

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
