import "./globals.css";
import { Oswald, Freeman } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oswald.className}>
      <body>
        {children}
      </body >
    </html >
  );
}
