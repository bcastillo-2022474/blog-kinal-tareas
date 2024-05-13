import "./App.css";
import Navbar from "./components/Navbar";
import {Project} from "./types";
import TitleCard from "./components/TitleCard.tsx";
import CardProject from "./components/CardProject.tsx";


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
