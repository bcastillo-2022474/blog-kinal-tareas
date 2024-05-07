import "./App.css";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconCalendar,
  IconBrandGithub,
  IconUnlink,
} from "@tabler/icons-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function AnimatedWord({ shouldRenderAnimation = true }) {
  const [currentWord, setCurrentWord] = useState("");
  // trigger render
  const currentWordIndex = useRef(0);
  const isInReverse = useRef(false);
  const words = [
    "ya parele con las tareas",
    "ya puso demasiadas tareas",
    "acepteme las tareas :(((",
    "no sea mala onda!!",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!shouldRenderAnimation) return;

    let animationTimeout: number;
    const renderIntervalTime = 100;

    const wait = (time: number) =>
      new Promise((resolve) => {
        animationTimeout = setTimeout(resolve, time);
      });

    async function animateWord() {
      const word = words[wordIndex];
      for (let i = 0; i < word.length; i++) {
        if (isInReverse.current) break;
        if (currentWordIndex.current > i) continue;
        currentWordIndex.current = i;
        setCurrentWord(`${word.slice(0, currentWordIndex.current + 1)}`);
        await wait(renderIntervalTime);
      }
      if (!isInReverse.current) isInReverse.current = true;
      await wait(1000);
      for (let i = word.length; i >= 0; i--) {
        if (!isInReverse.current) break;
        if (currentWordIndex.current < i) continue;

        currentWordIndex.current = i;
        setCurrentWord(`${word.slice(0, currentWordIndex.current)}`);
        await wait(renderIntervalTime);
      }
      await wait(1000);
      isInReverse.current = false;
      setWordIndex(() => (wordIndex !== words.length - 1 ? wordIndex + 1 : 0));
      setCurrentWord("");
    }

    animateWord();

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [wordIndex, shouldRenderAnimation]);

  return <span>{currentWord}</span>;
}

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

function CardProject({
  title,
  date,
  description,
  label,
  github,
  url,
  post_url,
}: Project) {
  const relativeDate = new Intl.RelativeTimeFormat("en-US", {
    // I want it to say `2 days ago` or `2 hours ago`, `2 years ago`
    style: "long",
  });

  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();
  const monthsDiff = Math.round(diff / (1000 * 60 * 60 * 24 * 30));

  return (
    <Link
      to={post_url}
      className="group/card px-10 cursor-pointer py-2 relative flex flex-col gap-2 text-start shadow-lg rounded dark:text-neutral-100 text-slate-900 overflow-hidden bg-slate-100 dark:bg-slate-600 transition-transform hover:scale-105 [&:not(:hover)]:delay-[550ms]"
    >
      <div className="bg-slate-200/50 dark:bg-slate-500/50 absolute top-0 left-0 w-1 h-full group-hover/card:w-full border-2 border-slate-700 dark:border-slate-200 transition-[width] duration-700 rounded-lg -z-10"></div>
      <div className="w-[20px] group-hover/card:w-0 transition-[width] bg-slate-700 dark:bg-slate-200 h-full top-0 left-0 absolute"></div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-lg">{description}</p>
      <p className="flex gap-2 text-slate-500 dark:text-slate-200 text-sm items-center">
        <IconCalendar size={14} />{" "}
        <span>
          Published{" "}
          {Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
          }).format(date)}
        </span>
        <span className="hidden sm:block">
          {relativeDate.format(-monthsDiff, "month")}
        </span>
      </p>
      <div className="flex justify-between">
        {label}
        <div className="flex gap-2">
          <a href={url}>
            <IconUnlink size={24} />
          </a>
          <a href={github}>
            <IconBrandGithub size={24} />
          </a>
        </div>
      </div>
    </Link>
  );
}

type Project = {
  title: string;
  description: string;
  date: Date;
  label: ReactNode;
  github: string;
  url: string;
  post_url: string;
};

function App() {
  const projects: Project[] = [
    {
      title: "Hotel Reservation System Backend",
      post_url: "/HRS-frontend",
      description:
        "API RESTful construida con Node.js, Express.js y MongoDB para un sistema de reservación de hoteles. Maneja la lógica de negocio, autenticación con JWT, autorización por roles y se despliega en Heroku",
      // 2023-03-01
      date: new Date(2024, 2, 1),
      label: (
        <div className="flex gap-2 text-neutral-100 text-xs">
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BIM II
          </span>
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BACKEND
          </span>
        </div>
      ),
      github:
        "https://github.com/kinal-team-1/hotel-reservation-system-backend",
      url: "https://backend-hotel-reservation-sys-d9bcaec0a6ce.herokuapp.com/",
    },
    {
      title: "Hotel Reservation System Frontend",
      post_url: "/HRS-frontend",
      description:
        "aplicación web de React.js y Vite para reservar hoteles. Proporciona una interfaz de usuario atractiva con Tailwind CSS. Se integra con el backend mediante solicitudes HTTP y se despliega en Heroku.",
      date: new Date(2024, 2, 19),
      label: (
        <div className="flex gap-2 text-neutral-100 text-xs">
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BIM II
          </span>
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BACKEND
          </span>
        </div>
      ),
      github:
        "https://github.com/kinal-team-1/hotel-reservation-system-frontend",
      url: "https://demo-hotel-reservation-system-e09f6d9fe848.herokuapp.com/",
    },
    {
      title: "Almacenadora Backend",
      post_url: "/HRS-frontend",
      description:
        "Backend construido con Node.js, Express.js y MongoDB para una aplicación de gestión de tareas.Implementa operaciones CRUD sobre tareas y etiquetas mediante una API RESTful.Se despliega en Heroku y utiliza GitHub Actions para la integración continua.",
      date: new Date(2024, 3, 29),
      label: (
        <div className="flex gap-2 text-neutral-100 text-xs">
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BIM II
          </span>
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BACKEND
          </span>
        </div>
      ),
      github: "https://github.com/kinal-team-1/almacenadora-backend",
      url: "https://almacenadora-kinal-backend-a1957ef7f11d.herokuapp.com/",
    },
    {
      title: "Almacenadora Frontend",
      post_url: "/HRS-frontend",
      description:
        "aplicación web de React.js y Vite para gestionar tareas y etiquetas. Utiliza Tailwind CSS, React Toastify y se integra con un backend mediante solicitudes HTTP",
      date: new Date(2024, 3, 29),
      label: (
        <div className="flex gap-2 text-neutral-100 text-xs">
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BIM II
          </span>
          <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
            BACKEND
          </span>
        </div>
      ),
      github: "https://github.com/kinal-team-1/almacenadora-frontend",
      url: "https://almacenadora-kinal-fr-6406c0b91a72.herokuapp.com/",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="px-5 md:px-12 flex flex-col gap-5">
        <TitleCard />
        {projects.map(
          (
            { title, description, date, label, github, url, post_url },
            index,
          ) => (
            <CardProject
              post_url={post_url}
              key={index}
              title={title}
              description={description}
              date={date}
              label={label}
              github={github}
              url={url}
            />
          ),
        )}
      </div>
    </>
  );
}
export default App;
