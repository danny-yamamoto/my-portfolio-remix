import { useLoaderData, Outlet, Link } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { getArticleItemsFromQiita } from "../utils/articles.server";

import stylesUrl from "../style/index.css"

export const links = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"}
  ];
};

export const meta = () => {
  return [
    { title: "danny's Portfolio" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const result = await getArticleItemsFromQiita();
  return json(result)
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div>
      <section id="intro">
        <h1>hoge</h1>
        <Outlet />
        <p>Welcome to my portfolio</p>
      </section>
      <section id="">
        <h2>Experience</h2>
      </section>
      <section id="articles">
        <h2>Top 10 Articles</h2>
        <ul>
        {data.map((article) => (
          <li key={article.id}>
            <Link target="_blank" to={`${article.url}`}>{article.title}</Link>
          </li>
        ))}
        </ul>
      </section>
      <section>
        <h2>Certificates</h2>
      </section>
      <footer>
        <p>&copy; 2023 danny. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com/danny-yamamoto" rel="noreferrer" target="_blank"><i className="fab fa-github"></i></a>
          <a href="https://twitter.com/dai_s_a_n" rel="noreferrer" target="_blank"><i className="fab fa-twitter"></i></a>
        </div>  
      </footer>
    </div>
  );
}
