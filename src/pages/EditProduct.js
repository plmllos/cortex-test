import { React, useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ContextApi } from "../App"

export default function EditProduct() {
    const params = useParams();
    const navigate = useNavigate()
    const { items, editProduct } = useContext(ContextApi)

    const [editedProduct, setEditedProduct] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
    });

    useEffect(() => {
    
        const productToEdit = items.find((item) => item.id === parseInt(params.id))

        if (productToEdit) {
        setEditedProduct(productToEdit);
        }
    }, [params.id, items])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editProduct(editedProduct)
        console.log(editedProduct)
        navigate('/')
    }

    return (
        <div className="form-container">
            <Link to="/"> <button className="go-back"> Go back </button> </Link>
            <h2>Edit Product</h2>
            { editProduct ? ( 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title"> Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={editedProduct.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="price"> Price: </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                    />
                    <label htmlFor="description"> Description: </label>
                    <textarea
                        name="description"
                        id="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                    />
                    <button type="submit"> Save Changes </button>
                </form>
            ) : <h2> Loading... </h2>}
        </div>
    )
}
