import { Iseat } from "@/models/seat";
import Ticket from "../core/Ticket";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Props {
    selectedSeats: Iseat[];
}

export default function TicketsDisplay({ selectedSeats }: Props) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute z-10 h-full w-full bg-[linear-gradient(90deg,rgba(100,116,139,1)0%,rgba(0,0,0,0)5%,rgba(0,0,0,0)95%,rgba(100,116,139,1)100%)]"></div>
            <Carousel>
                <CarouselPrevious variant={"ghost"} />
                <CarouselContent>
                    {selectedSeats
                        .sort((a, b) => {
                            if (a.rowNumber === b.rowNumber) {
                                return a.seatNumber - b.seatNumber;
                            }
                            return a.rowNumber - b.rowNumber;
                        })
                        .map((seat) => (
                            <CarouselItem key={seat.id} className="basis-28 animate-fade-in sm:basis-36">
                                <Ticket seat={seat} />
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselNext variant={"ghost"} />
            </Carousel>
        </div>
    );
}
