import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {
  const { products_loading, products_error, featured_products } = useSelector(
    (state) => state.products_reducer
  );
  if (products_loading) {
    return <Loading />;
  } else if (products_error) {
    return (
      <div className="section-center">
        <div className="title">
          <h3>Featured Products</h3>
          <div className="underline"></div>
        </div>
        <Error />
      </div>
    );
  } else {
    return (
      <Wrapper className="section">
        <div className="title">
          <h3>Featured Products</h3>
          <div className="underline"></div>
        </div>
        <div className="section-center featured">
          {featured_products.slice(0, 3).map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
