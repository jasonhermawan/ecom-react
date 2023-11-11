import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import axios from "axios";
import ProductCard from "../../components/productCard";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import "./productDetail.css";

const ProductDetail = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productImage, setProductImage] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productStock, setProductStock] = useState();
  const [qty, setQty] = useState(1);

  const [otherProducts, setOtherProducts] = useState([]);

  const params = useParams();

  const getProductDetail = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product?id=${params.itemid}`)
      .then((res) => {
        let productImg = `${import.meta.env.VITE_API_URL}/public/products/${
          res.data[0].product_images[0].image
        }`;
        setProductName(res.data[0].name);
        setProductDescription(res.data[0].description);
        setProductImage(productImg);
        setProductPrice((res.data[0].price).toLocaleString("id"));
        setProductStock(res.data[0].stock);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const getOtherProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/`)
      .then((res) => {
        setOtherProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOtherProducts();
  }, []);

  const printOtherProducts = () => {
    return otherProducts.map((val) => {
      return (
        <ProductCard
          key={val.id}
          name={val.name}
          image={`${import.meta.env.VITE_API_URL}/public/products/${
            val.product_images[0].image
          }`}
          price={val.price.toLocaleString("id")}
          storename={val.account.username}
          onClick={() =>
            navigate(`/detail/${val.accountid}/${val.name}/${val.id}`)
          }
        />
      );
    });
  };

  console.log(productDescription);

  useEffect(() => {
    getProductDetail();
  }, [printOtherProducts()]);

  return (
    <Layout>
      <div id="product-detail-page">
        <div id="detail-section">
          <div id="product-detail">
            <div id="product-image-section">
              <div id="image-container">
                <img src={productImage} alt="" />
              </div>
            </div>
            <div id="product-text">
              <h3 className="product-name">{productName}</h3>
              <div className="product-stats">
                <div className="rating">
                  <i class="bx bxs-star"></i>
                  <p>4.9</p>
                </div>
                <div className="sold">
                  <p>18 sold</p>
                </div>
              </div>
              <h1 className="product-price">Rp {productPrice}</h1>
              <hr />
              <p className="product-desc">
                {productDescription ? productDescription : "No Description"}
              </p>
            </div>
          </div>
          <div id="checkout-card-container">
            <div id="checkout-card">
              <h3 className="checkout-title">One step closer</h3>
              <div className="counter">
                <div className="counter-btn">
                  <NumberInput
                    size="md"
                    maxW={24}
                    defaultValue={1}
                    min={1}
                    max={productStock}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <p>Stock : {productStock}</p>
              </div>
              <h3 className="checkout-subtotal">
                Subtotal: <b>Rp {productPrice}</b>
              </h3>
              <div id="checkout-btn-container">
                <button className="add-cart-btn">Add to Cart</button>
                <button className="buy-btn">Buy</button>
              </div>
            </div>
          </div>
        </div>
        <div className="other-products">
          <h1>Other products</h1>
          <div id="other-products-container">
            {printOtherProducts()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
