import { React, useState, useEffect, createContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ProductItem from "./pages/ProductItem"
import ProductDetail from "./pages/ProductDetail"
import EditProduct from "./pages/EditProduct"
import AddProduct from "./pages/AddProduct"

const ContextApi = createContext()

export default function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setItems(data.products))
  }, [])

  function deleteProduct(e) {
    const productId = e.target.id;
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        setItems(prevItems => prevItems.filter(item => item.id !== data.id))
      })
  }

  return (
    <BrowserRouter>
      <ContextApi.Provider value={{items, deleteProduct}}>
        <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<ProductItem />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route path="/product/add/" element={<AddProduct />} />
            </Route>
        </Routes>
      </ContextApi.Provider>
    </BrowserRouter>
  )
}

export { ContextApi }
