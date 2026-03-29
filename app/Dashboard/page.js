"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/Login");
        }
    }, [status]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

                <h1 className="text-3xl font-semibold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mt-2 text-sm">
                    Logged in as:
                    <span className="font-medium text-gray-700">
                        {" "}{session?.user?.id}
                    </span>
                </p>

                {/* Buttons Section */}
                <div className="flex flex-col gap-4 mt-8">

                    <Link
                        href="/Order"
                        className="w-full py-3 rounded-xl bg-gray-300 text-black font-medium hover:bg-gray-500 transition"
                    >
                        Order
                    </Link>

                    <Link
                        href="/Upload"
                        className="w-full py-3 rounded-xl bg-gray-300 text-black font-medium hover:bg-gray-500 transition"
                    >
                        Upload
                    </Link>

                    {session.user.role === "admin" && (
                        <Link
                            href="/Sales"
                            className="w-full py-3 rounded-xl bg-gray-300 text-black font-medium hover:bg-gray-500 transition"
                        >
                            Check Sales (Admin)
                        </Link>
                    )}
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/Login" })}
                    className="mt-8 w-full py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                    Sign Out
                </button>

            </div>
        </div>
    );
}
