import { IReservation } from "@/models/reservation.ts";
import { POSTER_URL } from "@/pages/MovieDetailsPage.tsx";
import { IoTicket } from "react-icons/io5";
import Button from "./Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Ticket from "./Ticket";

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
    return (
        <>
            <article className="flex w-96 gap-2 rounded-md bg-[var(--backgroundColor)] p-4 shadow-md">
                <div className="">
                    <img src={POSTER_URL + reservation.screening.movie.poster} className="max-w-32 rounded-md shadow-md" />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                    <h2 className="font-bold">{reservation.screening.movie.title}</h2>
                    <p>{reservation.screening.movie.runtime} min.</p>
                    <p className="mb-auto">{new Intl.DateTimeFormat("en-US", options).format(new Date(reservation.screening.startTime))}</p>

                    <HoverCard>
                        <HoverCardTrigger>
                            <div className="flex justify-center">
                                <Button style="secondary" icon={<IoTicket size={20} />}>
                                    {reservation.seats.length} {reservation.seats.length > 1 ? "Tickets" : "Ticket"}
                                </Button>
                            </div>
                            <HoverCardContent className="bg-orange-100 backdrop-blur-sm w-fit p-4 border-red-700">
                                <div className="flex flex-col items-center gap-2">
                                    {reservation.seats
                                        .sort((a, b) => {
                                            if (a.rowNumber === b.rowNumber) {
                                                return a.seatNumber - b.seatNumber;
                                            }
                                            return a.rowNumber - b.rowNumber;
                                        })
                                        .map((seat) => (
                                            <Ticket seat={seat} />
                                        ))}
                                </div>
                            </HoverCardContent>
                        </HoverCardTrigger>
                    </HoverCard>
                </div>
            </article>
        </>
    );
}
