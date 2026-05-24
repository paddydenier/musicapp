import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import BandsPage from "./pages/BandsPage";
import InstrumentsPage from "./pages/InstrumentsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function Navbar() {
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");

        navigate("/login");
    };

    return (
        <div className="p-4 bg-black text-white flex gap-4 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/users">Users</Link>
                    <Link to="/bands">Bands</Link>
                    <Link to="/instruments">Instruments</Link>

                    <div className="ml-auto flex items-center gap-4">
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-blue-300 hover:underline"
                        >
                            {username}
                        </button>

                        <button
                            onClick={logout}
                            className="bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </div>
    );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                {/* public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* protected routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bands"
                    element={
                        <ProtectedRoute>
                            <BandsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instruments"
                    element={
                        <ProtectedRoute>
                            <InstrumentsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;