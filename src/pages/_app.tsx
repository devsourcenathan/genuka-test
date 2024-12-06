import NavBar from '@/components/Layout/NavBar';
import type { AppProps } from 'next/app';
import "@/styles/globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Genuka Technical Test",
    description: "Genuka Technical Test",
};
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <NavBar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
