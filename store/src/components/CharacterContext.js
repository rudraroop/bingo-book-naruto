import React, {useState, useEffect} from "react";

const characterContext = React.createContext();

function CharacterContextProvider(props){

    const [characters, setCharacters] = useState({});
    const [cartItems, setCartItems] = useState(
        () => JSON.parse(localStorage.getItem("cart-items")) || []
    );  //lazy state initialization
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
    }, [cartItems])

    function addItemToCart(character, price){

        setCartItems(currentCart => [...currentCart, {...character, price: price}]);

    }

    function removeItemFromCart(id) {
        setCartItems(currentCart => currentCart.filter(char => char._id !== id))
    }

    function rankFilter(character, rank){

        let rankArray = character["personalInfo"]["ninja rank"];
        
        //if there is no rank information, not a worthy enemy
        if (rankArray.length === 0)
            return false;
        rankArray = rankArray[rankArray.length-1].split(" ");
        let rankWord = rankArray[rankArray.length-1];
        
        return rankWord === rank;

    }

    useEffect(() => {
        fetch(`https://naruto--api.herokuapp.com/characters/affiliation/Allied Shinobi Forces`).
        then(response => response.json()).
        then(data => setCharacters({
            Kage: data.characters.filter(character => rankFilter(character, "Kage")),
            Jonin: data.characters.filter(character => rankFilter(character, "Jōnin")),
            Chunin: data.characters.filter(character => rankFilter(character, "Chūnin"))
        })).
        then(() => setLoaded(true))
    }, []);


    return (
        <characterContext.Provider value={{characters, loaded, cartItems, addItemToCart, removeItemFromCart}}>
            {props.children}
        </characterContext.Provider>
    )

}

export {characterContext, CharacterContextProvider};