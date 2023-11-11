import React, { useEffect, useState } from "react";
import Layout from "../../../Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addProduct.css";
import pizza from "./pizza.jpeg";
import { useToast } from '@chakra-ui/react'

const AddProductPage = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();

  const toast = useToast();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!(localStorage.getItem("role") === "store")) {
      navigate("/");
    }
  });

  const onAddProduct = async () => {
    console.log(image);
    try {
      if (name && price && image && stock) {
        const formData = new FormData();
        for (const key in image) {
          formData.append("fileupload", image[key]);
        }
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("stock", stock);
        formData.append("category", category);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/product/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName();
        setPrice();
        setImage();
        setDescription();
        setStock();
        setCategory();
        navigate("/store/manage");
        toast({
          title: 'Product added.',
          description: "Product has been added to your store.",
          position: "top",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      } else {
        alert("Fill in the form completely");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div id="add-product-page">
        <h1>Add Product</h1>
        <fieldset>
          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Name</h3>
              <p>
                Product name with maximum 70 characters. <br /> Tips: include
                your product's brand, color, material, or type.
              </p>
            </div>
            <div className="add-input">
              <input
                defaultValue={name}
                type="text"
                placeholder="Ex. Baju Supreme hitam original bahan halus dan berkualitas"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Description</h3>
              <p>
                Product description with maximum 2000 characters. <br /> Tips:
                include your product's features, benefit, how to use, etc.
              </p>
            </div>
            <div className="add-input">
              <textarea
                defaultValue={description}
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Category</h3>
              <p></p>
            </div>
            <div className="add-input">
              <select
                defaultValue={category}
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                <option value="household">Household</option>
                <option value="electronics">Electronics</option>
                <option value="books">Books</option>
                <option value="fashion">Fashion</option>
                <option value="hobbies">Hobbies</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Stock</h3>
            </div>
            <div className="add-input">
              <input
                defaultValue={stock}
                type="number"
                placeholder="Ex. 100"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Price</h3>
            </div>
            <div className="add-input">
              <input
                defaultValue={price}
                type="number"
                placeholder="Ex. 100000"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Image</h3>
            </div>
            <div className="add-input image-upload">
              <label htmlFor="input-file" id="drop-area">
                <input
                  className="image-upload-input"
                  type="file"
                  accept="image/*"
                  id="input-file"
                  defaultValue={image}
                  filename={image}
                  onChange={(e) => setImage(e.target.files)}
                />
                <div id="img-view">
                  <img
                    src=""
                    alt=""
                  />
                </div>
              </label>
              
            </div>
          </div>
        </fieldset>

        <div id="form-button">
          <button
            className="cancel-btn"
            onClick={() => navigate("/store/manage")}
          >
            Cancel
          </button>
          <button className="add-product-btn" onClick={() => onAddProduct()}>
            Add Product
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddProductPage;
