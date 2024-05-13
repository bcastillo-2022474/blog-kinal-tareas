import {IconPlayerPause, IconPlayerPlay} from "@tabler/icons-react";
import {useState} from "react";
import AnimatedWord from "./AnimatedWord.tsx";

function TitleCard() {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div className="w-full px-8 py-10 rounded-lg dark:text-slate-100 bg-slate-300 dark:bg-slate-800/50 relative text-slate-800">
      <button
        onClick={() => {
          setIsAnimating(!isAnimating);
        }}
        className="text-rose-300 cursor-pointer absolute top-5 right-5"
      >
        {isAnimating ? <IconPlayerPause /> : <IconPlayerPlay />}
      </button>
      <h1 className="text-5xl font-bold">Bienvenido a mi blog</h1>
      <p className="text-lg h-[3.50rem]">
        Profe Braulio{" "}
        <span className="font-bold">
          <AnimatedWord shouldRenderAnimation={isAnimating} />
        </span>
      </p>
    </div>
  );
}

export default TitleCard;