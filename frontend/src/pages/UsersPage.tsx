import { useEffect, useState } from "react";

import { api } from "../api/api";

import type { UserResponse } from "../types/api";

import UserCard from "../components/users/UserCard";

export default function UsersPage() {

    const [users, setUsers] = useState<UserResponse[]>([]);

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

                    <UserCard
                        key={user.id}
                        user={user}
                    />

                ))}

            </div>
        </div>
    );
}