import { useContext, useState } from "react";
import { characterContext } from "../components/CharacterContext";

export default function Cart(){

    const stripeIds = {
        Kage: "YOUR_KEY_HERE",
        Jonin: "YOUR_KEY_HERE"
    }

    //use each cart item's "determinedRank" to get the rank - and also the price

    const {cartItems, removeItemFromCart} = useContext(characterContext);

    function handleClick(id){
        removeItemFromCart(id);
    }

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({items: makeItemsArray()})
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.url)
                window.location.assign(response.url);
        })
    }

    function makeItemsArray(){
        
        let numKage = 0;    let numJonin = 0;

        cartItems.forEach(character => {
            if (character.determinedRank === 'Kage')
                numKage += 1;
            else
                numJonin += 1;
        })

        if (numJonin === 0)
            return [
                {
                    id: stripeIds.Kage,
                    quantity: numKage
                }
            ]

        if (numKage === 0)
            return [
                {
                    id: stripeIds.Jonin,
                    quantity: numJonin
                }
            ]

        return [
            {
                id: stripeIds.Kage,
                quantity: numKage
            },
            {
                id: stripeIds.Jonin,
                quantity: numJonin
            }
        ]

    }

    function cartDisplay(){

        if (cartItems.length === 0) 
            return (<h1>Cart is Empty</h1>);
    
        let cartJSX = [];
        let total = 0;

        for (let i = 0; i < cartItems.length ; i++){
            total += cartItems[i].price;
            cartJSX.push(
                <div key={cartItems[i]._id} className="cart-item">
                    <h3>{cartItems[i].name}</h3>
                    <div className="cart-item-right-end">
                        <button className="remove-button" onClick={() => handleClick(cartItems[i]._id)}>X</button>
                        <h3>${cartItems[i].price}</h3>
                    </div>
                </div>
                )
        }

        cartJSX.push(
            <div key={"cart-end"} className="cart-total">
                <h3>Total: </h3>
                <h3>${total}</h3>
            </div>
        )

        return cartJSX;

    }

    return (
        <div className="cart">
            {cartDisplay()}
            {cartItems.length !== 0 && <button className="checkout-btn" onClick={checkout}>Checkout</button>}
        </div>
    )
}