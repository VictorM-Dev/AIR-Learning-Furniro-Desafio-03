import Categories from "../../components/Categories";
import Container from "../../components/Container";
import Hero from "../../components/Hero";
import Inspiration from "../../components/Inspiration";
import Mosaic from "../../components/Mosaic";
import OurProducts from "../../components/OurProducts";

const Home = () => {
  return (
    <div>
      <Container>
        <Hero></Hero>
      </Container>
      <Container>
        <Categories></Categories>
      </Container>
      <Container>
        <OurProducts title="Our Products" font="font-bold"></OurProducts>
      </Container>
      <Container className="bg-inspiration">
        <Inspiration></Inspiration>
      </Container>
      <Container>
        <Mosaic></Mosaic>
      </Container>
    </div>
  );
};
export default Home;
