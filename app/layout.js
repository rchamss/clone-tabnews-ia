import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Bem vindo a nova era.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={googleSans.className}>
      <body>{children}</body>
    </html>
  );
}
