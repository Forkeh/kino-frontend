import { Iseat } from "@/models/seat";
import Ticket from "../core/Ticket";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EdgeFadeGradient from "../core/EdgeFadeGradient";

interface Props {
    selectedSeats: Iseat[];
}

export default function TicketsDisplay({ selectedSeats }: Props) {
    return (
        <div className="relative">
            <EdgeFadeGradient color="from-slate-500" />
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
