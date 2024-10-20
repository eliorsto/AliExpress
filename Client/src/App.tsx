import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import { NextUIProvider } from "@nextui-org/react";
import { Home } from "./pages/Home/Home";
import { setCards, setCurrentSearch, setFullName, setToken } from "./store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductPage from "./pages/productPage/ProductPage";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";

export const useScrapeData = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getData = async (search: string, page: number = 1) => {
    setLoading(true);
    dispatch(setCurrentSearch(search));

    try {
      const res = await axios.post("http://localhost:3002/", {
        search,
        page,
      });

      if (res.data) {
        dispatch(setCards(res.data));
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return { getData, loading };
};

function App() {
  const { showAuth, token } = useSelector((state: any) => state.user);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const validateUser = async () => {
      const refreshToken = localStorage.getItem('clone_token');

      try {
        if (refreshToken && !token) {
          const res = await axios.post(`http://localhost:5000/auth/replace`, {}, {
            headers: {
              refreshToken
            }
          });

          if (res.status === 200) {
            dispatch(setToken(res.data.token));
            dispatch(setFullName(res.data.fullName));
          }

        }
      } catch (err: any) {
        console.error(err.message);
      }
      setLoad(true);
    }

    validateUser();
  }, []);

  return load && (
    <>
      <NextUIProvider
        className={`dark text-foreground bg-background h-full w-full ${showAuth && "overflow-hidden"
          }`}
      >
        <Router>
          <div className="flex flex-col min-h-screen ">
            <NavBar />
            {showAuth && !token && <Auth />}
            <main className="flex-grow">
              <Routes>
                <Route path="/shopping-cart" element={<ShoppingCart />} />
                <Route path="/" element={<Home />} />
                <Route path="/product" element={<ProductPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NextUIProvider>
    </>
  );
}

export default App;
