import { React, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ContextApi } from "../App"

export default function ProductItem() {
    const { items, deleteProduct } = useContext(ContextApi)
    const [ loadNum, setLoadNum ] = useState(9)
   
    const nineElements = items.slice(0, loadNum)

    const allElements = nineElements.map(item => (
        <div key={item.id} className="item-container">
            <Link to={`/product/${item.id}`}>
                <img src={item.thumbnail} alt={item.title}/> 
            </Link>
            <div className="item-info">
                <h3> {item.title} </h3>
                <p> {item.price} $ </p>
            </div>
            <div className="item-buttons">
                <Link to={`/product/${item.id}`}> <button> View Details </button> </Link>
                <Link to={`/product/edit/${item.id}`}> <button> Edit Product </button> </Link>
                <button id={item.id} onClick={deleteProduct} className="delete"> Delete </button>
            </div>
        </div>
    ))
        
    function loadMore() {
        setLoadNum(prevNum => prevNum + 9)
    }

    return (
        <div>
            <div className="item-list">
                { allElements }
            </div> 
            { loadNum < items.length && <button className="load-more" onClick={loadMore}> Load more... </button>}
        </div>
    )
}
