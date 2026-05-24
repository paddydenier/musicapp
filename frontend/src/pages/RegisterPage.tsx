import { useState } from "react";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        await api.post("/users", {
            firstName,
            lastName,
            username,
            phoneNumber,
            password
        });

        navigate("/login");
    };

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
        ">

            <div className="
                bg-white
                p-8
                rounded-2xl
                shadow
                w-full
                max-w-md
            ">

                <h1 className="
                    text-4xl
                    font-bold
                    text-purple-600
                    mb-6
                ">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                >

                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="border rounded-xl p-3"
                    />

                    <button
                        type="submit"
                        className="
                            bg-purple-600
                            text-white
                            rounded-xl
                            p-3
                            font-semibold
                        "
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-purple-600"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}