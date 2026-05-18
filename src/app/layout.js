import CanvasSection from "@/components/common/CanvasSection";
import "./globals.css";
import LenisScroll from "@/components/common/LenisScroll";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} cz-shortcut-listen="true">
        <LenisScroll>
          <CanvasSection />
          {children}
        </LenisScroll>
      </body>
    </html>
  );
}
