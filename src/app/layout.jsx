"use client";
import { Provider } from "react-redux";
import store from "../store/index";
import Image from "next/image";
import "./globals.css";

// export const metadata = {
//   title: "Строительный калькулятор",
//   description: "Строительный калькулятор",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body id="app">
        <div>
          <header>
            <a className="header" href="/">
              <span>Строительный калькулятор</span>
            </a>
          </header>
          <Provider store={store}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
