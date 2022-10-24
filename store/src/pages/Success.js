import { useContext, useState } from "react";
import { characterContext } from "../components/CharacterContext";
import BingoCard from "../components/BingoCard";

export default function Success(){

    const {cartItems} = useContext(characterContext);

    function bingoCards(){
        return cartItems.map(character => <BingoCard key={character._id} character={character}/>)
    }

    return (
        <div className="bingo-book">
            {bingoCards()}
        </div>
    )

}