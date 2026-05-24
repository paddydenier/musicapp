import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await api.post("/auth/login", {
                username,
                password
            });

            // OLD VERSION: direct localStorage usage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userId", res.data.userId);

            navigate("/users");

        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">

                <h1 className="text-4xl font-bold text-purple-600 mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="grid gap-4">

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-xl p-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-xl p-3"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={loading}
                        className="bg-purple-600 text-white rounded-xl p-3 font-semibold disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>
            </div>
        </div>
    );
}