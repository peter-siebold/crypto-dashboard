import React from "react";
import {AppContext} from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";

const PriceGridElem = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top:40px;
`;

export const PriceGrid = () => {
    return(
        <AppContext.Consumer>
            {({prices}) =>(
                <PriceGridElem>
                    {prices.map((price, index) => (
                        <PriceTile key={`priceTile-${index}`} index={index} price={price} />
                    ))}
                </PriceGridElem>
            )}
        </AppContext.Consumer>
    )
}

export default PriceGrid;