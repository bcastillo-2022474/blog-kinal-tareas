import "./App.css";
import Navbar from "./components/Navbar";
import { BlogPost, Project } from "./types";
import TitleCard from "./components/TitleCard.tsx";
import CardProject from "./components/CardProject.tsx";
import { useLoaderData } from "react-router-dom";

function App() {
  const { posts } = useLoaderData() as { posts: Record<string, BlogPost> };

  const projects: Project[] = Object.entries(posts).map(([key, value]) => ({
    ...value,
    post_url: `/${key}`,
  }));

  return (
    <>
      <Navbar />
      <div className="px-5 md:px-12 flex flex-col gap-5">
        <TitleCard />
        {projects.map(
          (
            { large_title, description, date, tags, github, url, post_url },
            index,
          ) => (
            <CardProject
              post_url={post_url}
              key={index}
              large_title={large_title}
              description={description}
              date={date}
              tags={tags}
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
