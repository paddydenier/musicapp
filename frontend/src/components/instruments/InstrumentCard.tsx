import type { InstrumentResponse } from "../../types/api";

type Props = {
    instrument: InstrumentResponse;
};

export default function InstrumentCard({
    instrument
}: Props) {

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow
            p-6
        ">

            <h2 className="text-2xl font-semibold">
                {instrument.name}
            </h2>

            <p className="text-gray-500 mt-2">
                Instrument ID: {instrument.id}
            </p>

        </div>
    );
}