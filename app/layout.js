import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Em Construção... | Clone TabNews",
  description:
    "Site em construção. Acompanhe o total atualizado de publicações feitas no TabNews oficial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={googleSans.className}>
      <body>{children}</body>
    </html>
  );
}
