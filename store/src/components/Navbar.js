import {useState} from 'react';
import {Modal} from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavbarComponent() {


    return (
        <nav>
            <Link to="/"><button>Bingo Book Store</button></Link>
            <Link to="/cart"><button>Cart</button></Link>
        </nav>
    )

}

export default NavbarComponent;