import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Container className="bg-[#FFF]">
        <Header />
      </Container>

      <Outlet />

      <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]">
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
