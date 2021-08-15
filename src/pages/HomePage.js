import { React, lazy, Suspense } from "react";
import { Hero, Services, Contact } from "../components";
import Loading from "../components/Loading";

const FeaturedProducts = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/FeaturedProducts")), 1000);
  });
});

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Suspense fallback={<Loading />}>
        <FeaturedProducts />
      </Suspense>
      <Services></Services>
      <Contact />
    </main>
  );
};

export default HomePage;
