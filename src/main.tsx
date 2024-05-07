import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Post from "./pages/Post.tsx";

const loadPosts = async () => {
  // load json file in public folder
  const response = await fetch("/posts.json");
  console.log(response);
  const posts = await response.json();
  return { posts };
};

function Layout() {
  return (
    <div className="flex justify-center h-dvh w-full overflow-y-hidden">
      <div className="grow h-full text-sm bg-gradient-to-r dark:bg-gradient-to-l from-slate-300 to-slate-600 dark:from-slate-500 dark:to-slate-800"></div>
      <div className="min-w-[300px] w-full max-w-[800px] dark:bg-slate-700 bg-slate-200 overflow-y-scroll pb-5">
        <Outlet />
      </div>
      <div className="grow h-full text-sm bg-gradient-to-l dark:bg-gradient-to-r from-slate-300 to-slate-600 dark:from-slate-500 dark:to-slate-800"></div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/HRS-frontend",
        loader: loadPosts,
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
