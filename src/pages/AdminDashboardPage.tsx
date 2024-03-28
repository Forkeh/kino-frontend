import { Link } from "react-router-dom";
import { MdMovieEdit } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";

export default function AdminDashboardPage() {
    return (
        <section className="animate-fade-in">
            <h2 className={"my-10 text-center text-5xl font-extrabold sm:my-16"}>Admin Dashboard</h2>
            <div className="mx-auto flex max-w-5xl flex-col flex-wrap items-center justify-start gap-7 sm:flex-row sm:justify-evenly">
                <Link to={"movie"} className="group">
                    <article className="flex h-40 w-fit scale-75 flex-col items-center justify-center gap-4 sm:scale-100">
                        <div>
                            <MdMovieEdit
                                size={130}
                                className="drop-shadow-md transition-all group-hover:rotate-3 group-hover:scale-105 group-hover:text-teal-500"
                            />
                        </div>
                        <h3 className="rounded-md bg-red-600 p-3 text-2xl font-bold text-white shadow-md transition-all hover:bg-red-400 active:scale-95">
                            Add Movie
                        </h3>
                    </article>
                </Link>
                <Link to={"screening"} className="group">
                    <article className="flex h-40 w-fit scale-75 flex-col items-center justify-center gap-4 sm:scale-100">
                        <div>
                            <BiCameraMovie
                                size={130}
                                className="drop-shadow-md transition-all group-hover:rotate-3 group-hover:scale-105 group-hover:text-teal-500"
                            />
                        </div>
                        <h3 className="rounded-md bg-red-600 p-3 text-2xl font-bold text-white shadow-md transition-all hover:bg-red-400 active:scale-95">
                            Create Screening
                        </h3>
                    </article>
                </Link>
                <Link to={"reservations"} className="group">
                    <article className="flex h-40 w-fit scale-75 flex-col items-center justify-center gap-4 sm:scale-100">
                        <div>
                            <IoTicketOutline
                                size={130}
                                className="drop-shadow-md transition-all group-hover:rotate-3 group-hover:scale-105 group-hover:text-teal-500"
                            />
                        </div>
                        <h3 className="rounded-md bg-red-600 p-3 text-2xl font-bold text-white shadow-md transition-all hover:bg-red-400 active:scale-95">
                            See Reservations
                        </h3>
                    </article>
                </Link>
            </div>
        </section>
    );
}
