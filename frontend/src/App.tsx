import { useEffect, useState } from "react";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    instruments: string[];
};

function App() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        fetch("http://localhost:8080/user/v1/getUsers")
            .then(response => response.json())
            .then(data => setUsers(data));

    }, []);

    return (
        <div>
            <h1>Users</h1>

            {users.map(user => (
                <div key={user.id}>

                    <h2>
                        {user.firstName} {user.lastName}
                    </h2>

                    <p>
                        Instruments:
                        {" "}
                        {user.instruments.join(", ")}
                    </p>

                </div>
            ))}
        </div>
    );
}

export default App;