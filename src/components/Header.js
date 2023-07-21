import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/"> Products </Link>
                <Link to="/product/add/"> Add Product </Link>
            </nav>
      </header>
    )
}
