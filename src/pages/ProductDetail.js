import { React, useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ContextApi } from "../App"

export default function ProductDetail() {

    const { items } = useContext(ContextApi)
    const [ product, setProduct ] = useState(items)
    const params = useParams() 

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${params.id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [params.id])

    return (
        <div className="product-detail-container">
            <Link to="/"> <button> Go back </button> </Link>
            {product ? (
                <div className="product-detail">
                    <img src={product.thumbnail} alt={product.title}/>
                    <h2> {product.title} </h2>
                    <p className="product-price"> {product.price} $ </p>
                    <p> {product.description} </p>
                </div>
            ) : <h2> Loading... </h2>}
        </div>
    )
}
