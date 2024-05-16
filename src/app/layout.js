import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "Строительный калькулятор",
  description: "Строительный калькулятор",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body id="app">
        <div>
          <header>
            <a className="header" href="/">
              <Image
                className="logo"
                src="/logo.svg"
                alt="Vite logo"
                width={150}
                height={50}
              />
              <span>Строительный калькулятор</span>
            </a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
