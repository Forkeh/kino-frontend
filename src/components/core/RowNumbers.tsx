interface Props {
    rowNumbers: number[];
    auditoriumSide: "left" | "right";
}

export default function RowNumbers({ rowNumbers, auditoriumSide }: Props) {
    const side = auditoriumSide === "left" ? "items-end" : "items-start";

    return (
        <aside className={`flex flex-col ${side} justify-between text-xs`}>
            {rowNumbers.map((rowNum) => (
                <span className="h-5" key={rowNum}>
                    {rowNum}
                </span>
            ))}
        </aside>
    );
}
