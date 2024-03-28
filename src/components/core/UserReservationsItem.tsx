import { IReservation } from "@/models/reservation.ts";
import { POSTER_URL } from "@/pages/MovieDetailsPage.tsx";
import { IoTicket } from "react-icons/io5";
import Button from "./Button";

type Props = {
    reservation: IReservation;
};

const options: Intl.DateTimeFormatOptions = {
    //dateStyle: "full",
    year: "numeric",
    month: "long",
    day: "numeric",
    //timeStyle: "short",
    hour: "numeric",
    minute: "numeric",
};

export default function UserReservationsItem({ reservation }: Props) {
    console.log(reservation.screening.startTime);

    return (
        <>
            <article className="flex gap-2 rounded-md bg-[var(--backgroundColor)] p-4 shadow-md">
                <div className="">
                    <img src={POSTER_URL + reservation.screening.movie.poster} className="max-w-32 rounded-md shadow-md" />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <h2 className="font-bold">{reservation.screening.movie.title}</h2>
                    <p>{reservation.screening.movie.runtime} min.</p>
                    <p>{new Intl.DateTimeFormat("en-US", options).format(new Date(reservation.screening.startTime))}</p>
                    <p className="mb-auto">Number of tickets: {reservation.seats.length}</p>
                    <Button style="secondary" icon={<IoTicket size={20} />}>
                        Ticket Seats
                    </Button>
                </div>
            </article>
        </>
    );
}
