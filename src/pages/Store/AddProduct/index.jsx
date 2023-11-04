import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './addProduct.css'

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!(localStorage.getItem("role") === "store")) {
      navigate("/")
    }
  })

  const onAddProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      if (name && price && image && stock) {
        await axios.post(`${import.meta.env.VITE_API_URL}/product/add`, {
          token,
          name,
          price,
          image,
          description,
          stock,
          category
        })
        setName("");
        setPrice();
        setImage("");
        setDescription("");
        setStock();
        setCategory("");
        navigate("/")
        alert("Product added");
      } else {
        alert("Fill in the form completely")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
   <Layout>
      <div id="add-product-page">
        <h1>Add Product</h1>
        <fieldset>
          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Name</h3>
              <p>Product name with maximum 70 characters. <br /> Tips: include your product's brand, color, material, or type.</p>
            </div>
            <div className="add-input">
              <input defaultValue={name} type="text" placeholder='Ex. Baju Supreme hitam original bahan halus dan berkualitas' onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Description</h3>
              <p>Product description with maximum 2000 characters. <br /> Tips: include your product's features, benefit, how to use, etc.</p>
            </div>
            <div className="add-input">
              <textarea defaultValue={description} name="" id="" cols="30" rows="10"  onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Category</h3>
              <p></p>
            </div>
            <div className="add-input">
              <select defaultValue={category} name="" id=""  onChange={(e) => setCategory(e.target.value)}>
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
              <h3>Product Image</h3>
            </div>
            <div className="add-input">
              <input defaultValue={image} type="text" placeholder='Input image url here ...'  onChange={(e) => setImage(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Stock</h3>
            </div>
            <div className="add-input">
              <input defaultValue={stock} type="number" placeholder='Ex. 100'  onChange={(e) => setStock(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Price</h3>
            </div>
            <div className="add-input">
              <input defaultValue={price} type="number" placeholder='Ex. 100000'  onChange={(e) => setPrice(e.target.value)}/>
            </div>
          </div>
        </fieldset>
        <div id='form-button'>
          <button className='cancel-btn'>Cancel</button>
          <button className='add-product-btn' onClick={() => onAddProduct()}>Add Product</button>
        </div>
      </div>
   </Layout>
  )
}

export default AddProductPage