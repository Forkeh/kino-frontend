import ScreeningDate from "./ScreeningDate";
import { useEffect, useState } from "react";
import { IScreening } from "@/models/screening";
import { getMovieScreeningsInCinema } from "@/services/apiFacade";
import { useKino } from "@/contexts/KinoProvider";
import { DATE_TIME_OPTIONS, TODAY, upcomingWeekDates } from "@/utils/dateUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EdgeFadeGradient from "@/components/core/EdgeFadeGradient";

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
            <section className="flex items-end justify-between">
                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Showings in {kino}</h2>
                <img className="w-32 drop-shadow-md" src="/cat_showings.png" alt="cat showings" />
            </section>
            <section className="rounded-lg bg-[var(--backgroundColor)] p-3 shadow-lg">
                <div className="relative flex w-full justify-center">
                    {/* // Gradient fade effect, parent needs to be relative */}
                    <EdgeFadeGradient color="from-[rgb(255,220,174)]" width={"w-[90%]"} />
                    <Carousel className="ml-0 w-[90%]">
                        <CarouselPrevious variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                        <CarouselContent className="mx-1 pl-0">
                            {week.map((date) => {
                                const s = screenings?.filter((screen) => {
                                    const currDate = new Date(screen.startTime);
                                    return new Intl.DateTimeFormat("en-GB", DATE_TIME_OPTIONS).format(currDate) == date;
                                }) as IScreening[];
                                return (
                                    <CarouselItem key={date} className="basis-20 pl-0 sm:basis-36">
                                        <ScreeningDate date={date} screenings={s} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselNext variant={"ghost"} className="transition-all hover:scale-125 hover:bg-white active:scale-100" />
                    </Carousel>
                </div>
            </section>
            {!screenings && <div className="mt-3 text-center font-bold">No showings for this movie</div>}
        </>
    );
}
