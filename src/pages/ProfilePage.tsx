import { useAuth } from "@/contexts/AuthProvider";
import UserReservations from "@/components/core/UserReservations.tsx";

export default function ProfilePage() {
    const auth = useAuth();

    return (
        <>
            <h1 className=" mb-10 mt-16 text-center text-5xl font-extrabold sm:text-left">Your profile</h1>
            <section className="mb-16 flex max-w-xs flex-col gap-2 rounded-md">
                <h2 className="text-2xl font-bold">Information</h2>
                <p className=" flex justify-between font-bold">
                    Username: <span className={"block font-normal"}>{auth.username}</span>
                </p>
                <p className="flex justify-between font-bold">
                    Email: <span className={"block font-normal"}>{auth.email}</span>
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-3">Reservations</h2>
                <UserReservations />
            </section>
        </>
    );

    //TODO: Show reservations
}
