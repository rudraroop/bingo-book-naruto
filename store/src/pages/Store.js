import { useContext } from "react";
import CharacterCard from "../components/CharacterCard";
import { characterContext } from "../components/CharacterContext";

export default function Store(){

    const {characters, loaded} = useContext(characterContext);

    return (
        <div className="store-page">
            <h1 class="rank-title">Rank: Kage</h1>
            <div className="rank-section">
                {loaded ? characters.Kage.map(el => <CharacterCard key={el._id} character={el} rank={"Kage"} />) : <h3>Loading...</h3>}
            </div>
            <h1 class="rank-title">Rank: Jōnin</h1>
            <div className="rank-section">
                {loaded ? characters.Jonin.map(el => <CharacterCard key={el._id} character={el} rank={"Jonin"} />) : <h3>Loading...</h3>}
            </div>
        </div>
    )
}
