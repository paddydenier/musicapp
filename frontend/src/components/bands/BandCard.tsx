import type { BandResponse } from "../../types/api";

type Props = {
    band: BandResponse;
};

export default function BandCard({ band }: Props) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-3xl font-bold">
                {band.name}
            </h2>

            <p className="text-gray-500 mt-2">
                Band ID: {band.id}
            </p>

            <div className="mt-6">

                <h3 className="font-semibold mb-3">
                    Members
                </h3>

                <div className="grid gap-3">

                    {band.members.map(member => (

                        <div
                            key={member.id}
                            className="
                                border
                                rounded-xl
                                p-4
                                bg-gray-50
                            "
                        >

                            <p className="font-medium">
                                {member.firstName} {member.lastName}
                            </p>

                            <div className="flex gap-2 mt-2 flex-wrap">

                                {member.instruments.map(instrument => (

                                    <span
                                        key={instrument}
                                        className="
                                            bg-purple-600
                                            text-white
                                            px-2
                                            py-1
                                            rounded-full
                                            text-sm
                                        "
                                    >
                                        {instrument}
                                    </span>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}