export default function LoginPage() {

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
                    Login
                </h1>

                <form className="grid gap-4">

                    <input
                        type="text"
                        placeholder="Username"
                        className="
                            border
                            rounded-xl
                            p-3
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="
                            border
                            rounded-xl
                            p-3
                        "
                    />

                    <button
                        className="
                            bg-purple-600
                            text-white
                            rounded-xl
                            p-3
                            font-semibold
                        "
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}