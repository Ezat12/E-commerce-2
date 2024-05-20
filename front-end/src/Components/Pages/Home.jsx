import React from "react";

import BackGround from "../../background-websiet/BackGround";
import DisplayVegetable from "../../dispaly-vegetable/DisplayVegetable";
import DisplayProducts from "../../display-products/DisplayProducts";
import Footer from "../../Footer/Footer";

function Home() {
  return (
    <div>
      <BackGround />
      <DisplayVegetable />
      <DisplayProducts />
      <Footer />
    </div>
  );
}

export default Home;
