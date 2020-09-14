import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useVerifyAuth() {
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/auth/login", "/login");
        if (!localStorage.getItem("authToken")) {
            router.push("/auth/login", "/login");
        }
    }, [router]);
}
