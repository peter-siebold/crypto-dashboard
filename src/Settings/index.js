import React from "react";
import WelcomeMessage from "./WelcomeMessage";
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";
import  CoinGrid  from "./CoinGrid";

export default ({name}) => {
    return (
        <Page name="settings">
            <WelcomeMessage name={name} />
            <CoinGrid topSection />
            <ConfirmButton />
            <CoinGrid />
        </Page>
    )
}