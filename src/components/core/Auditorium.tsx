import { useEffect, useState } from "react";
import { getReservedSeatsByScreeningId, getSeatsByAuditoriumId } from "@/services/apiFacade.ts";
import { Iseat } from "@/models/seat.ts";
import { toast } from "@/components/ui/use-toast";
import Seat from "@/components/core/Seat.tsx";
import { IScreening } from "@/models/screening";
import RowNumbers from "./RowNumbers";

// probs = screening object
type Props = {
    screening: IScreening;
    handleSeatClick: (seat: Iseat) => void;
};

export default function Auditorium({ screening, handleSeatClick }: Props) {
    const [seats, setSeats] = useState<Iseat[] | null>(null);
    const [reservedSeats, setReservedSeats] = useState<Iseat[] | null>(null);

    useEffect(() => {
        getSeatsByAuditoriumId(screening.auditorium.id)
            .then((seats) => {
                setSeats(seats);
            })
            .catch(() => {
                toast({
                    title: "Error fetching seats!",
                    description: "We could not find any seats for this auditorium, please reload page, or try again later.",
                    variant: "destructive",
                });
            });

        getReservedSeatsByScreeningId(screening.id)
            .then((reserved) => {
                setReservedSeats(reserved);
            })
            .catch(() => {
                toast({
                    title: "Error fetching Reserved seats!",
                    description: "We could not find any reserved seats for this auditorium, please reload page, or try again later.",
                    variant: "destructive",
                });
            });
    }, []);

    const lastSeat = seats?.[seats.length - 1];
    const numberOfRows = lastSeat?.rowNumber;
    const seatsPerRow = lastSeat?.seatNumber;

    const rowNumbersArr = numberOfRows ? Array.from(Array(numberOfRows), (_, i) => i + 1) : [];

    return (
        // cols = seatsPerRow
        // rows = numberOfRows
        <>
            <div className="flex flex-col items-center rounded-lg bg-[var(--backgroundColor)] p-3 shadow-lg min-w-96">
                <div className=" mb-5 flex h-5 w-full items-center justify-center rounded-sm bg-gray-600 text-sm text-white">Screen</div>
                {seats && reservedSeats && (
                    <section className="flex justify-center">
                        <RowNumbers rowNumbers={rowNumbersArr} auditoriumSide="left" />
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`,
                                gridGap: "0.25rem",
                                width: "90%",
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}
                        >
                            {seats?.map((seat) => (
                                <Seat
                                    key={seat.id}
                                    seat={seat}
                                    onSeatClick={handleSeatClick}
                                    disabled={reservedSeats.some((reserved) => reserved.id == seat.id)}
                                />
                            ))}
                        </div>
                        <RowNumbers rowNumbers={rowNumbersArr} auditoriumSide="right" />
                    </section>
                )}
            </div>
        </>
    );
}
