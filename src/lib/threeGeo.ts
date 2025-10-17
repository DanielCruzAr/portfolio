import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { DrawThreeGeoParams, GeoJSON, GeoJSONGeometry } from "./types";

/* Draw GeoJSON

Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
and draws the geoJSON geometries.

*/

export function drawThreeGeo({
    json,
    radius,
    materialOptions,
}: DrawThreeGeoParams): THREE.Object3D {
    const container = new THREE.Object3D();
    container.userData.update = (t: number) => {
        for (let i = 0; i < container.children.length; i++) {
            container.children[i].userData.update?.(t);
        }
    };

    container.rotation.x = -Math.PI * 0.5; // KLUDGY HACK to fix orientation
    const x_values: number[] = [];
    const y_values: number[] = [];
    const z_values: number[] = [];
    const json_geom = createGeometryArray(json);

    //Re-usable array to hold coordinate values. This is necessary so that you can add
    //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.
    let coordinate_array: [number, number][] = [];
    for (let geom_num = 0; geom_num < json_geom.length; geom_num++) {
        const geom = json_geom[geom_num];

        if (geom.type == "Point") {
            convertToSphereCoords(geom.coordinates, radius);
            drawParticle(
                x_values[0],
                y_values[0],
                z_values[0],
                materialOptions
            );
        } else if (geom.type == "MultiPoint") {
            for (
                let point_num = 0;
                point_num < geom.coordinates.length;
                point_num++
            ) {
                convertToSphereCoords(geom.coordinates[point_num], radius);
                drawParticle(
                    x_values[0],
                    y_values[0],
                    z_values[0],
                    materialOptions
                );
            }
        } else if (geom.type == "LineString") {
            coordinate_array = createCoordinateArray(geom.coordinates);

            for (
                let point_num = 0;
                point_num < coordinate_array.length;
                point_num++
            ) {
                convertToSphereCoords(coordinate_array[point_num], radius);
            }
            drawLine(x_values, y_values, z_values, materialOptions);
        } else if (geom.type == "Polygon") {
            for (
                let segment_num = 0;
                segment_num < geom.coordinates.length;
                segment_num++
            ) {
                coordinate_array = createCoordinateArray(
                    geom.coordinates[segment_num]
                );

                for (
                    let point_num = 0;
                    point_num < coordinate_array.length;
                    point_num++
                ) {
                    convertToSphereCoords(coordinate_array[point_num], radius);
                }
                drawLine(x_values, y_values, z_values, materialOptions);
            }
        } else if (geom.type == "MultiLineString") {
            for (
                let segment_num = 0;
                segment_num < geom.coordinates.length;
                segment_num++
            ) {
                coordinate_array = createCoordinateArray(
                    geom.coordinates[segment_num]
                );

                for (
                    let point_num = 0;
                    point_num < coordinate_array.length;
                    point_num++
                ) {
                    convertToSphereCoords(coordinate_array[point_num], radius);
                }
                drawLine(x_values, y_values, z_values, materialOptions);
            }
        } else if (geom.type == "MultiPolygon") {
            for (
                let polygon_num = 0;
                polygon_num < geom.coordinates.length;
                polygon_num++
            ) {
                for (
                    let segment_num = 0;
                    segment_num < geom.coordinates[polygon_num].length;
                    segment_num++
                ) {
                    coordinate_array = createCoordinateArray(
                        geom.coordinates[polygon_num][segment_num]
                    );

                    for (
                        let point_num = 0;
                        point_num < coordinate_array.length;
                        point_num++
                    ) {
                        convertToSphereCoords(
                            coordinate_array[point_num],
                            radius
                        );
                    }
                    drawLine(x_values, y_values, z_values, materialOptions);
                }
            }
        } else {
            throw new Error("The geoJSON is not valid.");
        }
    }

    function createGeometryArray(json: GeoJSON): GeoJSONGeometry[] {
        let geometry_array: GeoJSONGeometry[] = [];

        if (json.type == "Feature") {
            geometry_array.push(json.geometry);
        } else if (json.type == "FeatureCollection") {
            for (
                let feature_num = 0;
                feature_num < json.features.length;
                feature_num++
            ) {
                geometry_array.push(json.features[feature_num].geometry);
            }
        } else if (json.type == "GeometryCollection") {
            for (
                let geom_num = 0;
                geom_num < json.geometries.length;
                geom_num++
            ) {
                geometry_array.push(json.geometries[geom_num]);
            }
        } else {
            throw new Error("The geoJSON is not valid.");
        }
        return geometry_array;
    }

    function createCoordinateArray(
        feature: [number, number][]
    ): [number, number][] {
        //Loop through the coordinates and figure out if the points need interpolation.
        const temp_array: [number, number][] = [];
        let interpolation_array: [number, number][] = [];

        for (let point_num = 0; point_num < feature.length; point_num++) {
            const point1 = feature[point_num];
            const point2 = feature[point_num - 1];

            if (point_num > 0) {
                if (needsInterpolation(point2, point1)) {
                    interpolation_array = [point2, point1];
                    interpolation_array =
                        interpolatePoints(interpolation_array);

                    for (
                        let inter_point_num = 0;
                        inter_point_num < interpolation_array.length;
                        inter_point_num++
                    ) {
                        temp_array.push(interpolation_array[inter_point_num]);
                    }
                } else {
                    temp_array.push(point1);
                }
            } else {
                temp_array.push(point1);
            }
        }
        return temp_array;
    }

    function needsInterpolation(
        point2: [number, number],
        point1: [number, number]
    ): boolean {
        //If the distance between two latitude and longitude values is
        //greater than five degrees, return true.
        const lon1 = point1[0];
        const lat1 = point1[1];
        const lon2 = point2[0];
        const lat2 = point2[1];
        const lon_distance = Math.abs(lon1 - lon2);
        const lat_distance = Math.abs(lat1 - lat2);

        if (lon_distance > 5 || lat_distance > 5) {
            return true;
        } else {
            return false;
        }
    }

    function interpolatePoints(
        interpolation_array: [number, number][]
    ): [number, number][] {
        //This function is recursive. It will continue to add midpoints to the
        //interpolation array until needsInterpolation() returns false.
        let temp_array: [number, number][] = [];
        let point1: [number, number], point2: [number, number];

        for (
            let point_num = 0;
            point_num < interpolation_array.length - 1;
            point_num++
        ) {
            point1 = interpolation_array[point_num];
            point2 = interpolation_array[point_num + 1];

            if (needsInterpolation(point2, point1)) {
                temp_array.push(point1);
                temp_array.push(getMidpoint(point1, point2));
            } else {
                temp_array.push(point1);
            }
        }

        temp_array.push(interpolation_array[interpolation_array.length - 1]);

        if (temp_array.length > interpolation_array.length) {
            temp_array = interpolatePoints(temp_array);
        } else {
            return temp_array;
        }
        return temp_array;
    }

    function getMidpoint(
        point1: [number, number],
        point2: [number, number]
    ): [number, number] {
        const midpoint_lon = (point1[0] + point2[0]) / 2;
        const midpoint_lat = (point1[1] + point2[1]) / 2;
        const midpoint: [number, number] = [midpoint_lon, midpoint_lat];

        return midpoint;
    }

    function convertToSphereCoords(
        coordinates_array: [number, number],
        sphere_radius: number
    ): void {
        const lon = coordinates_array[0];
        const lat = coordinates_array[1];

        x_values.push(
            Math.cos((lat * Math.PI) / 180) *
                Math.cos((lon * Math.PI) / 180) *
                sphere_radius
        );
        y_values.push(
            Math.cos((lat * Math.PI) / 180) *
                Math.sin((lon * Math.PI) / 180) *
                sphere_radius
        );
        z_values.push(Math.sin((lat * Math.PI) / 180) * sphere_radius);
    }

    function drawParticle(
        x: number,
        y: number,
        z: number,
        options: THREE.PointsMaterialParameters
    ): void {
        let geo = new THREE.BufferGeometry();
        geo.setAttribute(
            "position",
            new THREE.Float32BufferAttribute([x, y, z], 3)
        );

        const particle_material = new THREE.PointsMaterial(options);

        const particle = new THREE.Points(geo, particle_material);
        container.add(particle);

        clearArrays();
    }

    function drawLine(
        x_values: number[],
        y_values: number[],
        z_values: number[],
        options: THREE.PointsMaterialParameters
    ): void {
        const lineGeo = new LineGeometry();
        const verts = [];
        for (let i = 0; i < x_values.length; i++) {
            verts.push(x_values[i], y_values[i], z_values[i]);
        }
        lineGeo.setPositions(verts);
        let hue = 0.3 + Math.random() * 0.2;
        if (Math.random() > 0.5) {
            hue -= 0.3;
        }
        const lineMaterial = new LineMaterial({
            color: options.color,
            linewidth: 2,
            dashSize: 0.1,
            gapSize: 0.1,
            dashOffset: 0.0,
            fog: true,
        });

        const line = new Line2(lineGeo, lineMaterial);
        line.computeLineDistances();
        const rate = Math.random() * 0.0002;
        line.userData.update = (t: number) => {
            lineMaterial.dashOffset = t * rate;
        };
        container.add(line);

        clearArrays();
    }

    function clearArrays(): void {
        x_values.length = 0;
        y_values.length = 0;
        z_values.length = 0;
    }

    return container;
}

export function createGlowMarkerTexture(
    canvas: HTMLCanvasElement,
    innerColor = "#23c0c0ff",
    outerColor = "rgba(1, 15, 14, 0)",
    size = 128
) {
    //const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas 2D context");

    const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
    );
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(1, outerColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
