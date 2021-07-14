import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, []);
  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        history.push("/");
      }, 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    id: sku,
    images,
    name,
    stock,
    price,
    description,
    company,
    reviews,
    stars,
    colors,
  } = product;
  console.log(product);
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className=" section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <section className="product-center">
          <ProductImages images={images} />
          <div className="content">
            <h2>{name}</h2>
            <Stars />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
          </div>
          <p className="info">
            available : <span>{stock > 0 ? "In stock" : "Out of stock"}</span>
          </p>
          <p className="info">
            SKU : <span>{sku}</span>
          </p>
          <p className="info">
            brand : <span>{company}</span>
          </p>

          <hr />
          {stock > 0 && <AddToCart />}
        </section>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
