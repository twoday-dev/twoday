import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";
import * as React from "react";
import globalStylesUrl from "~/styles/global.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
};

export default function App() {
  return (
    <Document>
      <div className="app">
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header>
        <div className="container">
          <span></span>
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <Link to="/twoday/christmas-elf-name-generator">Home</Link>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/twoday-dev/twoday/tree/main/packages/christmas-elf-name-generator"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://remix.run/docs"
                >
                  Remix Docs
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container">
        <div className="christmas-tree">🎄</div>
        {children}
      </main>
      <footer>
        <p>
          &copy;{" "}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twoday.com"
          >
            twoday
          </a>
        </p>
      </footer>
    </>
  );
}
