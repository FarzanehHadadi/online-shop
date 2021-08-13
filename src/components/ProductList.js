import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useSelector(
    (state) => state.filter_reducer
  );
  if (products.length < 1) {
    return <h5>sorry, no products matched your search</h5>;
  }
  if (!grid_view) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;
