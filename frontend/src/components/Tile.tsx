type Variant = "dark" | "light";

interface TileProps {
  variant: Variant;
  title: string;
  value: string;
}

export default function Tile({ variant, title, value }: TileProps) {
  const backgroundColor = variant === "dark" ? "bg-gray-900" : "bg-white";
  const mainColor = variant === "dark" ? "text-white" : "text-gray-900";
  const secondaryColor = variant === "dark" ? "text-white" : "text-gray-500";

  return (
    <div
      className={`rounded-[12px] ${backgroundColor} p-[20px] flex flex-col gap-[12px]`}
    >
      <p className={`text-preset-4 ${secondaryColor}`}> {title} </p>
      <p className={`text-preset-1 ${mainColor}`}> ${value} </p>
    </div>
  );
}
