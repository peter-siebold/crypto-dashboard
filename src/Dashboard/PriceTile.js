import React from "react";
import styled, {css} from "styled-components";
import {SelectableTile} from "../Shared/Tile";
import {fontSize3, fontSizeBig, greenBoxShadow} from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import {AppContext} from "../App/AppProvider";

const JustifyRight = styled.div`
    justify-self: right;
`;

const JustifyLeft = styled.div`
    justify-self: left;
`;

const TickerPrice = styled.div`
    ${fontSizeBig}
`;

const ChangePct = styled.div`
    color: green;
    ${props => props.red && css`
        color:red;
    `}
`;

const numberFormat = number => {
    return  + (number + "").slice(0,7)
}

const ChangePercent = ({data}) => {
    return (
        <JustifyRight> 
            <ChangePct red={numberFormat(data.CHANGEPCT24HOUR) < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)} 
            </ChangePct>
        </JustifyRight>
    )
}

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        grid-gap:5px;
        ${fontSize3}
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items:right;
    `}
    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events:none;
    `}
`;

const PriceTileNormal = ({sym, data, currentFavorite, setCurrentFavorite}) =>{
    return(
        <PriceTileStyled onClick={setCurrentFavorite} currentFavorite={currentFavorite}>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <ChangePercent data={data}/>
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    )
}
const PriceTileCompact = ({sym, data, currentFavorite, setCurrentFavorite}) => {
    return (
        <PriceTileStyled onClick={setCurrentFavorite} compact currentFavorite={currentFavorite}>
            <JustifyLeft> {sym} </JustifyLeft>
            <ChangePercent data={data}/>
            <div>
                ${numberFormat(data.PRICE)}
            </div>
        </PriceTileStyled>
    );
}
export const PriceTile = ({price, index}) => {
    let sym = Object.keys(price)[0];
    let data = price[sym]["USD"];
    let TileClass = index < 5 ? PriceTileNormal : PriceTileCompact;
    return (
        <AppContext.Consumer>
            {({currentFavorite, setCurrentFavorite}) => (
                <TileClass 
                    sym={sym} 
                    data={data} 
                    currentFavorite={currentFavorite === sym} 
                    setCurrentFavorite={() => setCurrentFavorite(sym)}
                /> 
            )}
        </AppContext.Consumer>
    )
}

export default PriceTile;