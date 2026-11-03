import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import TopBanner from "./components/TopBanner/TopBanner";
import Navbar from "./components/Navbar/Navbar";
import NewsletterBox from "./components/NewsletterBox/NewsletterBox";
import Footer from "./components/Footer/Footer";
import Shop from "./pages/CategoryPage/CategoryPage";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import LoginModal from "./pages/Login/Login";
import SignupModal from "./pages/Signup/Signup";
import CheckoutPage from "./pages/Checkout/Checkout";
import OnSalePage from "./pages/OnSale";
import NewArrivalsPage from "./pages/NewArrivals";
import BrandsPage from "./pages/Brands";
import MensClothesPage from "./pages/MensClothes";
import WomensClothesPage from "./pages/WomensClothes";
import KidsClothesPage from "./pages/KidsClothes";

function App() {
  return (
    <div>
      <TopBanner />
      
      <Navbar />
      {/* < ProductDetails/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={< ProductDetails/>} />
        <Route path="/productcategory" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/on-sale" element={<OnSalePage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/shop/mens" element={<MensClothesPage />} />
        <Route path="/shop/womens" element={<WomensClothesPage />} />
        <Route path="/shop/kids" element={<KidsClothesPage />} />
        {/* <Route path="/signup" element={<SignupModal/>} />
        <Route path="/login" element={<LoginModal/>} /> */}
      </Routes>

      <NewsletterBox />
      
      <Footer />
    </div>
  );
}

export default App;
