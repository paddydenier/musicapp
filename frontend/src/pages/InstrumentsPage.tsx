import { useEffect, useState } from "react";

import { api } from "../api/api";

import type {
    InstrumentResponse
} from "../types/api";

import InstrumentCard
    from "../components/instruments/InstrumentCard";

export default function InstrumentsPage() {

    const [instruments, setInstruments] =
        useState<InstrumentResponse[]>([]);

    useEffect(() => {

        api.get("/instruments")
            .then(response => {

                setInstruments(response.data);

            });

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="
                text-5xl
                font-bold
                text-purple-600
                mb-8
            ">
                Instruments
            </h1>

            <div className="grid gap-4">

                {instruments.map(instrument => (

                    <InstrumentCard
                        key={instrument.id}
                        instrument={instrument}
                    />

                ))}

            </div>

        </div>
    );
}