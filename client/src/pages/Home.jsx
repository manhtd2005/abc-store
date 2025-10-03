import React from "react";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import ProductRelated from "../components/common/ProductRelated";
import Newletterbox from "../components/common/Newletterbox";
const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <ProductRelated />
      <Newletterbox />
    </div>
  );
};

export default Home;
