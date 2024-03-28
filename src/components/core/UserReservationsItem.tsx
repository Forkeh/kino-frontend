import { IReservation } from "@/models/reservation.ts";
import { POSTER_URL } from "@/pages/MovieDetailsPage.tsx";
import { IoTicket } from "react-icons/io5";
import Ticket from "./Ticket";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
                <section>
                    <img src={POSTER_URL + reservation.screening.movie.poster} className="max-w-32 rounded-md shadow-md" />
                </section>
                <section className="flex w-full flex-col gap-2 text-sm">
                    <h2 className="font-bold">{reservation.screening.movie.title}</h2>
                    <p>{reservation.screening.movie.runtime} min.</p>
                    <p>{reservation.screening.auditorium.name}</p>
                    <p className="mb-auto">{new Intl.DateTimeFormat("en-US", options).format(new Date(reservation.screening.startTime))}</p>

                    <Popover>
                        <PopoverTrigger>
                            <div className="flex w-full justify-center rounded-md bg-red-600 p-3 font-bold text-white shadow-md transition-all hover:bg-red-400 active:scale-95 max-w-40 mx-auto">
                                <IoTicket size={20} />
                                {reservation.seats.length} {reservation.seats.length > 1 ? "Tickets" : "Ticket"}
                            </div>
                            <PopoverContent className="w-fit border-red-700 bg-orange-100 p-4 backdrop-blur-sm">
                                <div className="flex flex-col items-center gap-2">
                                    {reservation.seats
                                        .sort((a, b) => {
                                            if (a.rowNumber === b.rowNumber) {
                                                return a.seatNumber - b.seatNumber;
                                            }
                                            return a.rowNumber - b.rowNumber;
                                        })
                                        .map((seat) => (
                                            <Ticket key={seat.id} seat={seat} />
                                        ))}
                                </div>
                            </PopoverContent>
                        </PopoverTrigger>
                    </Popover>
                </section>
            </article>
        </>
    );
}
