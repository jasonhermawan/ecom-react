import React, { useEffect, useState } from 'react'
import Layout from '../../../Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accountid, setAccountId] = useState();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [])

  const getAccountData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/check/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsername(response.data.username)
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setRole(response.data.role);
      if (!(response.data.role === "store")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAccountData();
  }, [])

  const [currentName, setCurrentName] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [currentDescription, setCurrentDescription] = useState();
  const [currentStock, setCurrentStock] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  const getProduct = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/product?id=${id}`)
    .then((res) => {
      setAccountId(`${res.data[0].accountid}`)
      setCurrentName(`${res.data[0].name}`);
      setCurrentPrice(`${res.data[0].price}`);
      setCurrentImage(`${res.data[0].image}`);
      setCurrentDescription(`${res.data[0].description}`);
      setCurrentStock(`${res.data[0].stock}`);
      setCurrentCategory(`${res.data[0].category}`);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getProduct();
  }, [])

  const [newName, setNewName] = useState(currentName);
  const [newPrice, setNewPrice] = useState(currentPrice);
  const [newImage, setNewImage] = useState(currentImage);
  const [newDescription, setNewDescription] = useState(currentDescription);
  const [newStock, setNewStock] = useState(currentStock);
  const [newCategory, setNewCategory] = useState(currentCategory);

  const onUpdateProduct = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/product/update/${accountid}/${id}`, {
        name: newName,
        price: newPrice,
        image: newImage,
        stock: newStock,
        category: newCategory,
        description: newDescription,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNewName();
      setNewPrice();
      setNewImage();
      setNewDescription();
      setNewStock();
      setNewCategory();
      getProduct();
      alert("Update Success")
      navigate("/store/manage")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div id="add-product-page">
        <h1>Edit Product</h1>
        <fieldset>
          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Name</h3>
              <p>Product name with maximum 70 characters. <br /> Tips: include your product's brand, color, material, or type.</p>
            </div>
            <div className="add-input">
              <input defaultValue={currentName} type="text" placeholder='Ex. Baju Supreme hitam original bahan halus dan berkualitas' onChange={(e) => setNewName(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Description</h3>
              <p>Product description with maximum 2000 characters. <br /> Tips: include your product's features, benefit, how to use, etc.</p>
            </div>
            <div className="add-input">
              <textarea defaultValue={currentDescription} name="" id="" cols="30" rows="10"  onChange={(e) => setNewDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Category</h3>
              <p></p>
            </div>
            <div className="add-input">
              <select defaultValue={currentCategory} name="" id=""  onChange={(e) => setNewCategory(e.target.value)}>
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
              <input defaultValue={currentImage} type="text" placeholder='Input image url here ...'  onChange={(e) => setNewImage(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Stock</h3>
            </div>
            <div className="add-input">
              <input defaultValue={currentStock} type="number" placeholder='Ex. 100'  onChange={(e) => setNewStock(e.target.value)}/>
            </div>
          </div>

          <div className="add-product-section">
            <div className="add-details">
              <h3>Product Price</h3>
            </div>
            <div className="add-input">
              <input defaultValue={currentPrice} type="number" placeholder='Ex. 100000'  onChange={(e) => setNewPrice(e.target.value)}/>
            </div>
          </div>
        </fieldset>
        <div id='form-button'>
          <button className='cancel-btn' onClick={() => navigate("/store/manage")}>Cancel</button>
          <button className='add-product-btn' onClick={() => onUpdateProduct()}>Update Product</button>
        </div>
      </div>
    </Layout>
  )
}

export default EditProductPage