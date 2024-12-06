"use client"
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function NavBar() {

    const [isClient, setIsClient] = useState(false); // Vérifie si le composant est monté côté client
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Le composant est maintenant monté côté client
    }, []);

    if (!isClient) {
        return null; // Ne rend rien tant que ce n'est pas monté côté client
    }
    return (
        <nav className="flex gap-8  border-b border-gray-200 bg-white px-8 pt-8">
            <Link href="/messages" className={`h-full pb-4 ${router.pathname === "/messages" && "border-b-2 border-b-gray-500"}`}>
                <span
                    className={
                        router.pathname === "/messages"
                            ? " text-gray-900 font-bold cursor-pointer"
                            : "text-gray-400 cursor-pointer"
                    }
                >
                    Messages
                </span>
            </Link>
            <Link href="/tasks" className={`h-full pb-4 ${router.pathname === "/tasks" && "border-b-2 border-b-gray-500"}`}>
                <span
                    className={
                        router.pathname === "/tasks"
                            ? " text-gray-900 font-bold cursor-pointer"
                            : "text-gray-400 cursor-pointer"
                    }
                >
                    Todays Task
                </span>
            </Link>
            <Link href="/last-activity" className={`h-full pb-4 ${router.pathname === "/last-activity" && "border-b-2 border-b-gray-500"}`}>
                <span
                    className={
                        router.pathname === "/last-activity"
                            ? "text-gray-900 font-bold cursor-pointer"
                            : "text-gray-400 cursor-pointer"
                    }
                >
                    Last Activity
                </span>
            </Link>
        </nav>
    )
}


