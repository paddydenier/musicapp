import { useEffect, useState } from "react";

import { api } from "../api/api";

import type { BandResponse } from "../types/api";

import BandCard from "../components/bands/BandCard";

export default function BandsPage() {

    const [bands, setBands] = useState<BandResponse[]>([]);

    useEffect(() => {

        api.get("/bands")
            .then(response => {

                setBands(response.data);

            });

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-5xl font-bold text-purple-600 mb-8">
                Bands
            </h1>

            <div className="grid gap-4">

                {bands.map(band => (

                    <BandCard
                        key={band.id}
                        band={band}
                    />

                ))}

            </div>
        </div>
    );
}