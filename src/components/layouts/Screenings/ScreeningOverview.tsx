import ScreeningDate from "./ScreeningDate";
import { useEffect, useState } from "react";
import { IScreening } from "@/models/screening";
import { getMovieScreeningsInCinema } from "@/services/apiFacade";
import { useKino } from "@/contexts/KinoProvider";
import { DATE_TIME_OPTIONS, TODAY, upcomingWeekDates } from "@/utils/dateUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Props = {
    movieId: number;
};

export default function ScreeningOverview({ movieId }: Props) {
    const [screenings, setScreenings] = useState<IScreening[] | null>(null);
    const { id, kino } = useKino();

    const week = upcomingWeekDates();

    useEffect(() => {
        const endDate = new Date(TODAY);
        endDate.setDate(endDate.getDate() + 6);

        getMovieScreeningsInCinema(movieId, id, TODAY.toISOString(), endDate.toISOString())
            .then((data) => setScreenings(data))
            .catch((e) => console.log(e));
    }, [kino]);

    return (
        <>
            <h2 className="my-8 text-2xl font-bold sm:text-3xl">Showings in {kino}</h2>
            <section className="relative flex w-full justify-center">
                {/* // Gradient fade effect, parent needs to be relative */}
                <div className="pointer-events-none absolute z-10 h-full w-[90%] bg-[linear-gradient(90deg,rgba(255,220,174,1)0%,rgba(0,0,0,0)5%,rgba(0,0,0,0)95%,rgba(255,220,174,1)100%)]"></div>

                <Carousel className="ml-0 w-[90%]">
                    <CarouselPrevious variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                    <CarouselContent className="pl-0 mx-1">
                        {week.map((date) => {
                            const s = screenings?.filter((screen) => {
                                const currDate = new Date(screen.startTime);

                                return new Intl.DateTimeFormat("en-GB", DATE_TIME_OPTIONS).format(currDate) == date;
                            }) as IScreening[];

                            return (
                                <CarouselItem key={date} className="basis-20 sm:basis-36 pl-0">
                                    <ScreeningDate date={date} screenings={s} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselNext variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                </Carousel>
            </section>
        </>
    );
}
