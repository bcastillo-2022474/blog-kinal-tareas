import {Link} from "react-router-dom";
import {IconBrandGithub, IconCalendar, IconUnlink} from "@tabler/icons-react";
import {Project} from "../types";
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

export default CardProject;