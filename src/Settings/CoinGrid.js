import React from "react";
import styled from "styled-components";
import {AppContext} from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

const getLowerSectionCoins = (coinList, filteredCoins) => {
    return (filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0,100)
}

const getCoinsToDisplay = (coinList, topSection, favorites, filterCoins) => {
    return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins)
}

export const CoinGrid = ({topSection}) => {
    return(
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) => (
                <CoinGridStyled>
                    {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => (
                        <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
                    ))}
                </CoinGridStyled>
            )}
        </AppContext.Consumer>
    );
}


export default CoinGrid;