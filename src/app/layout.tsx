import "./globals.css";

export const metadata = {
  title: "Atelier Estate",
  description: "Tu nuevo hogar a largo plazo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
