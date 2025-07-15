import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import ProductList from "../../components/ProductList";
import "../../App.css"; // animasi notifikasi

function Home({ user }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const isReturning = localStorage.getItem("hasLoggedOut");

    if (user && isReturning === "true") {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 3000);
      localStorage.removeItem("hasLoggedOut");
    }
  }, [user]);

  return (
    <>
      {showWelcome && (
        <div className="welcome-notification">Selamat datang, {user?.name}!</div>
      )}
      <Banner />
      <Categories />
      <ProductList />
    </>
  );
}

export default Home;
