import React from "react";
import styled from "styled-components";
import {AppContext} from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`;

const getCoinsToDisplay = coinList => {
    return Object.keys(coinList).slice(0, 100)
}

export const CoinGrid = props => {
    return(
        <AppContext.Consumer>
            {({coinList}) => (
                <CoinGridStyled>
                    {getCoinsToDisplay(coinList).map(coinKey => (
                        <CoinTile key={coinKey} coinKey={coinKey} />
                    ))}
                </CoinGridStyled>
            )}
        </AppContext.Consumer>
    );
}


export default CoinGrid;