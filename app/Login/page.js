"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                id,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid ID or password");
                console.error("Sign in error:", res.error);
            } else if (res?.ok) {
                router.push("/Dashboard");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-10 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg">
                <h1 className="text-2xl font-semibold">Login</h1>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    type="text"
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-gray-600 mt-4">
                </p>
            </form>
        </div>
    );
}
