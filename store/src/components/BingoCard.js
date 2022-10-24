function BingoCard(props){

    const {character} = props;
    console.log(character);

    function images(){
        return character.images.map(url => <img src={url}/>)
    }

    function jutsu(){
        let list = "";
        for (let i = 0 ; i < character.jutsu.length ; i++)
            list += `${character.jutsu[i].split("(")[0]} - `;
        
        if (list){
            return (
                <div className="character-jutsu">
                    <h3>Known Jutsu</h3> 
                    <p>- {list}</p>
                </div>
            )
        }
        
        else
            return (<p>No known non-standard Jutsu of major concern</p>);

    }

    function chakraNature(){
        let list = "";
        for (let i = 0 ; i < character.personalInfo["nature type"].length ; i++)
            list += `${character.personalInfo["nature type"][i].split("(")[0]} - `;
        
        if (list){
            return (
                <div className="character-chakra-nature">
                    <h3>Chakra Nature Type</h3> 
                    <p>- {list}</p>
                </div>
            )
        }
        
        else
            return (<p>Chakra Nature Unknown</p>);

    }

    return (
        <div className="bingo-card">
            <h1>{character.name}</h1>
            <h3>Rank: {character.determinedRank}</h3>
            <div className="character-images">
                {images()}
            </div>
            <div className="character-summary">
                <h3>Summary</h3>
                <p>{character.summary}</p>
            </div>
            {jutsu()}
            {chakraNature()}
        </div>
    )

}

export default BingoCard;