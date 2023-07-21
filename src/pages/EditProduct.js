import { React, useEffect, useContext, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ContextApi } from "../App"

export default function EditProduct() {
    const {items} = useContext(ContextApi)
    const params = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: ""
    })

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.id}`)
          .then(res => res.json())
          .then(data => setProduct(data))
      }, [params.id])
    
    function handleChange(e) {
        const { name, value } = e.target
        setProduct((prevData) => ({
          ...prevData,
          [name]: value
        }))
    }

    function handleForm(e) {
        e.preventDefault()
        const updatedItems = [...items];
        const editedProductIndex = updatedItems.findIndex((item) => item.id === params.id);

        if (editedProductIndex !== params.id) {
            updatedItems[editedProductIndex] = product
            
        } else {
            items.push(product)
        }
        navigate(-1)
    }

    return(
        <div className="product-detail-container">
            <Link to="/"> <button className="go-back"> Go back </button> </Link>
            {product ? (
                <form className="product-detail" onSubmit={handleForm}>
                    <input 
                        type="image" 
                        src={product.thumbnail} 
                        alt={product.title}/>
                    <input 
                        type="text" 
                        name="title"
                        placeholder={product.title} 
                        onChange={handleChange} 
                    />  
                    <input 
                        type="text" 
                        name="price" 
                        placeholder={product.price} 
                        onChange={handleChange} 
                        className="product-price"
                    />
                    <textarea 
                        value={product.description} 
                        onChange={handleChange} 
                        name="description" > 
                        {product.description} 
                    </textarea>
                    <button> Commit changes </button>
                </form>
            ) : <h2> Loading... </h2>}
        </div>
    )
}
