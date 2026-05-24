import type { UserResponse } from "../../types/api";

type Props = {
    user: UserResponse;
};

export default function UserCard({ user }: Props) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-600 mt-2">
                User ID: {user.id}
            </p>

            <div className="mt-4">

                <h3 className="font-semibold">
                    Instruments
                </h3>

                <div className="flex gap-2 mt-2 flex-wrap">

                    {user.instruments.map((instrument) => (

                        <span
                            key={instrument}
                            className="
                                bg-purple-600
                                text-white
                                px-3
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

            <div className="mt-4">

                <h3 className="font-semibold">
                    Bands
                </h3>

                <div className="flex gap-2 mt-2 flex-wrap">

                    {user.bands.map((band) => (

                        <span
                            key={band.id}
                            className="
                                border
                                px-3
                                py-1
                                rounded-full
                                text-sm
                            "
                        >
                            {band.name}
                        </span>

                    ))}
                </div>
            </div>
        </div>
    );
}