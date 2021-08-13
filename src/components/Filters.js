import React from "react";
import styled from "styled-components";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import {
  clearFilters,
  updateFilters,
  load_products,
} from "../redux/actions/filter_actions";

import { useSelector, useDispatch } from "react-redux";

const Filters = () => {
  const {
    text,
    company,
    category,
    price,
    min_price,
    max_price,
    color,
    shipping,
  } = useSelector((state) => state.filter_reducer.filters);
  const { all_products } = useSelector((state) => state.filter_reducer);

  const products = useSelector((state) => state.products_reducer.products);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(load_products(products));
  }, [products]);
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              className="search-input"
              type="text"
              name="text"
              value={text}
              onChange={(e) =>
                dispatch(updateFilters(e.target.name, e.target.value))
              }
              placeholder="Search"
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            {categories.map((c, index) => {
              return (
                <button
                  key={index}
                  className={`${category === c.toLowerCase() && "active"}`}
                  onClick={(e) =>
                    dispatch(updateFilters(e.target.name, e.target.textContent))
                  }
                  name="category"
                  type="button"
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              onChange={(e) =>
                dispatch(updateFilters(e.target.name, e.target.value))
              }
              value={company}
              className="company"
            >
              {companies.map((c, index) => {
                return <option key={index}>{c}</option>;
              })}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                      name="color"
                      onClick={(e) =>
                        dispatch(
                          updateFilters(
                            e.target.name,
                            e.target.getAttribute("data-color")
                          )
                        )
                      }
                      data-color={"all"}
                    >
                      ALL
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    name="color"
                    onClick={(e) =>
                      dispatch(
                        updateFilters(
                          e.target.name,
                          e.target.getAttribute("data-color")
                        )
                      )
                    }
                    style={{ backgroundColor: c }}
                    data-color={c}
                  >
                    {c === color && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p>{formatPrice(price)}</p>
            <input
              type="range"
              onChange={(e) =>
                dispatch(updateFilters(e.target.name, Number(e.target.value)))
              }
              name="price"
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              checked={shipping}
              id="shipping"
              name="shipping"
              onChange={(e) =>
                dispatch(updateFilters(e.target.name, e.target.checked))
              }
            />
          </div>
        </form>
        <button className="clear-btn" onClick={() => dispatch(clearFilters)}>
          {" "}
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};
export default Filters;
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;
