import { BASE_API_URL } from "./constants";
import { GeoJSONFeatureCollection, SiteInfoData, SiteInfoResponse } from "./types";


export async function incrementCVCounter(): Promise<SiteInfoResponse> {
    const res = await fetch(`${BASE_API_URL}/counter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cvDownload" }),
    });

    if (!res.ok) {
        throw new Error("Failed to increment CV download counter");
    }

    return res.json();
}

export async function fetchSiteInfo(): Promise<SiteInfoData> {
    const res = await fetch(`${BASE_API_URL}/counter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "get" }),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch site information");
    }

    return res.json();
}

export async function fetchCoordinates(dateFilter: number): Promise<GeoJSONFeatureCollection> {
    const res = await fetch(`${BASE_API_URL}/get-coords?range=${dateFilter}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch coordinates");
    }
    
    return res.json();
}