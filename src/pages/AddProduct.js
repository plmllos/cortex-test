import { React, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ContextApi } from "../App"

export default function AddProduct() {

    const { items } = useContext(ContextApi)
    const navigate = useNavigate()
    const [newProduct, setNewProduct] = useState(items)
    const [dataProduct, setDataProduct] = useState({
        id: "",
        title: "",
        description: "",
        price: ""
      })

    const handleChange = (e) => {
        const { name, value } = e.target
        setDataProduct( prevData => ({
            ...prevData,
            [name] : value
        }))
    }

    useEffect(() => {
        fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: dataProduct.id,
                title: dataProduct.title,
                description: dataProduct.description,
                price: dataProduct.price
            })
        })
            .then(res => res.json())
            .then(data => {
                setNewProduct(data)
            })
    }, [dataProduct, items])

    const handleSubmit = (e) => {
        e.preventDefault()
        items.push(newProduct)
        setDataProduct({
            title: "",
            description: "",
            price: "",
        })
        navigate(-1)
    }

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit} >  
                <label htmlFor="title"> Name your product </label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter name"
                    value={dataProduct.title}
                    onChange={handleChange}
                />
                <label htmlFor="price"> Enter price </label>
                <input 
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={dataProduct.price}
                    onChange={handleChange}
                />
                <label htmlFor="description"> Describe your product </label>
                <textarea 
                    type="textarea"
                    id="description"
                    name="description"
                    placeholder="Describe your product"
                    value={dataProduct.description}
                    onChange={handleChange}
                />
                <button> Add Product </button>
            </form>
        </div>
    )
}
