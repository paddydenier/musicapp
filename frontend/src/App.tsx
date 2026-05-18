import { useEffect, useState } from "react";
import { api } from "./api/api";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    instruments: string[];
};

function App() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

       api.get("/users")
    .then(response => {
        setUsers(response.data);
    }); 

    }, []);

   return (
    <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-5xl font-bold text-purple-600 mb-8">
            Users
        </h1>

        <div className="grid gap-4">

            {users.map(user => (

                <div
                    key={user.id}
                    className="bg-white rounded-2xl shadow p-6"
                >

                    <h2 className="text-2xl font-semibold">
                        {user.firstName} {user.lastName}
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Instruments:
                        {" "}
                        {user.instruments.join(", ")}
                    </p>

                </div>
            ))}
        </div>
    </div>
); 
}

export default App;