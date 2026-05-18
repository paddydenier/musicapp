import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import BandsPage from "./pages/BandsPage";
import InstrumentsPage from "./pages/InstrumentsPage";

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

                <Link to="/instruments">
                    Instruments
                </Link>


            </div>

            <Routes>

                <Route
                    path="/"
                    element={<UsersPage />}
                />

                <Route
                    path="/users"
                    element={<UsersPage />}
                />

                <Route
                    path="/bands"
                    element={<BandsPage />}
                />

                <Route
                    path="/instruments"
                    element={<InstrumentsPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;