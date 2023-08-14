import { useLoaderData, Outlet, Link } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { getArticleItemsFromQiita } from "../utils/articles.server";
import { getExperienceFromDatabase } from "../utils/experience.server";
import { getCertificatesFromDatabase } from "../utils/certificates.server";
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

// Get data on the server side.
export const loader = async () => {
  const jsonFromQiita = await getArticleItemsFromQiita();
  const filterJsonFromQiita = jsonFromQiita.map(item => ({
    title: item.title,
    url: item.url,
    id: item.id,
  }));
  const experienceFromDatabase = await getExperienceFromDatabase();
  const certificatesFromDatabase = await getCertificatesFromDatabase();
  const combinedJson = {
    nickname: "danny",
    myname: "Daisuke Yamamoto",
    displayExperience: experienceFromDatabase,
    displayItems: filterJsonFromQiita,
    displayCerts: certificatesFromDatabase,
    twitterProfile: "https://twitter.com/dai_s_a_n",
    githubProfile: "https://github.com/danny-yamamoto"
  };
  return json(combinedJson);
};

export default function Index() {
  const data = useLoaderData();
  const articles = data.displayItems;
  const experiences = data.displayExperience;
  const certs = data.displayCerts;
  return (
    <div>

      {/* Introduction Section */}
      <section id="intro">
        <h1>{data.myname}</h1>
        <Outlet />
        <p>Welcome to my portfolio</p>
      </section>

      {/* Experience Section */}
      <section id="">
        <h2>Experience</h2>
        <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>{experience.id}: {experience.position} @ {experience.company}</li>
        ))}
        </ul>
      </section>

      {/* Articles Section */}
      <section id="articles">
        <h2>Top 10 Articles</h2>
        <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link target="_blank" to={`${article.url}`}>{article.title}</Link>
          </li>
        ))}
        </ul>
      </section>

      {/** Certificates Section */}
      <section>
        <h2>Certificates</h2>
        <ul>
        {certs.map((certs) => (
          <li key={certs.blockchainId}>{certs.title}</li>
        ))}
        </ul>
      </section>

      <footer>
        <p>&copy; 2023 danny. All rights reserved.</p>
        <div className="social-links">
          <Link target="_blank" to={data.githubProfile}><i className="fab fa-github"></i></Link>
          <Link target="_blank" to={data.twitterProfile}><i className="fab fa-twitter"></i></Link>
        </div>  
      </footer>
    </div>
  );
}
