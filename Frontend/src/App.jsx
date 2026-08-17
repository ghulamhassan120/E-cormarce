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

function App() {
  return (
    <div>
      <TopBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetail" element={< ProductDetails/>} />
        <Route path="/productcategory" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        {/* <Route path="/signup" element={<SignupModal/>} />
        <Route path="/login" element={<LoginModal/>} /> */}
      </Routes>

      <NewsletterBox />
      <Footer />
    </div>
  );
}

export default App;
