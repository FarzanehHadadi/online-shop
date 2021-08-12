import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../redux/actions/main";
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

const SingleProductPage = ({
  single_product_loading: loading,
  single_product_error: error,
  single_product: product,
  fetchSingleProduct,
}) => {
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
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className=" section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>available :</span>
              {stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>

            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};
const mapStateToProps = (state) => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = state.products_reducer;
  return {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  };
};
const mapDispatchToProps = (dispatch) => {
  // const { new_url } = ownProps;
  // console.log("ownProps", new_url);
  return {
    fetchSingleProduct: (new_url) => dispatch(fetchSingleProduct(new_url)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage);
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
