import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/tasks"); // Redirige immédiatement vers "/tasks"
    }, [router]);

    return null;
};

export default Home;
