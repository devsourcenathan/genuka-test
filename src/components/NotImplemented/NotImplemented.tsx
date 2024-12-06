import Link from 'next/link'
import React from 'react'

type props = {
    title: string
}
const NotImplemented = (props: props) => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800">Page en cours de construction</h1>
                <p className="text-gray-600 mt-2">
                    La page <span className="font-medium">{props.title}</span> n&apos;est pas encore implémentée.
                </p>
                <div className="mt-4">
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                        Retourner à l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotImplemented