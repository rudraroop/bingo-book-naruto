import { useContext, useState, useEffect } from "react";
import { characterContext } from "./CharacterContext";

export default function CharacterCard({character, rank}){

    const {addItemToCart, removeItemFromCart, cartItems} = useContext(characterContext)
    const [addRemoveToggle, setAddRemoveToggle] = useState(() => {
        let inCart = cartItems.find(char => char._id === character._id);
        return !inCart;
    });
    
    function characterPrice(){
        
        if (rank === "Kage")
            return 12.99;

        else if (rank === "Jonin")
            return 7.99;

        else//chunin
            return 4.99;

    }

    function characterImage(){

        if (character.name === "Tsunade")
            return (<img src="https://i.pinimg.com/736x/04/ab/9e/04ab9e0999d607cc570a1b949c9c2580.jpg" />);

        else if (character.name === "Naruto Uzumaki")
            return (<img src="https://cdn.vox-cdn.com/thumbor/UswYUb9Ve-sg9EN1f0KMAkOUizE=/0x0:1280x721/1200x800/filters:focal(544x281:748x485)/cdn.vox-cdn.com/uploads/chorus_image/image/70124512/naruto.0.jpg" />);

        else
            return (<img src={character.images[0]} />);
    }

    function handleClick(){

        if (addRemoveToggle){
            addItemToCart({...character, determinedRank: rank}, characterPrice());
            setAddRemoveToggle(false);
        }

        else{
            removeItemFromCart(character._id);
            setAddRemoveToggle(true);
        }

    }

    return (
        <div className="character-card">
            {characterImage()}
            <div className="card-body">
                <h3>{character.name}</h3>
                <p>Price: {characterPrice()}</p>
                {addRemoveToggle ? <button className="add-button" onClick={handleClick}>Add</button> : <button className="remove-button" onClick={handleClick}>Remove</button>}
            </div>
        </div>
    )

}