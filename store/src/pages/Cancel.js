import { Link } from "react-router-dom";

export default function Cancel(){
    return (
        <div className="cancel-page">
            <h1>Payment Cancelled</h1>
            <h2>Return to Cart?</h2>
            <Link to="/cart"><button>Cart</button></Link>
        </div>
    )
}