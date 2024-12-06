import NavBar from '@/components/Layout/NavBar';
import type { AppProps } from 'next/app';
import "@/styles/globals.css";
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <NavBar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
