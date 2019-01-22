import React from "react";
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";

export default ({name}) => {
    return (
        <Page name="dashboard">
           <PriceGrid />
        </Page>
    )
}