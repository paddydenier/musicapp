import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import BandsPage from "./pages/BandsPage";

function App() {

    return (

        <BrowserRouter>

            <div className="p-4 bg-black text-white flex gap-4">

                <Link to="/users">
                    Users
                </Link>

                <Link to="/bands">
                    Bands
                </Link>

            </div>

            <Routes>

                <Route
                    path="/users"
                    element={<UsersPage />}
                />

                <Route
                    path="/bands"
                    element={<BandsPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;