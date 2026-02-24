import { LazyStarfield } from "@/components/canvas/lazy-starfield";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LazyStarfield />
      <Header />
      <main className="relative z-10 min-h-screen pt-8">{children}</main>
      <Footer />
    </>
  );
}
