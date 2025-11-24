import styles from "@/app/login/login.module.css";
import {useRouter} from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };
    return (
        <>
            <div>
            <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
            </button>
        </div>
        </>
    )
}