import React from "react";
import _ from "lodash";

const cc = require("cryptocompare")
export const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: "dashboard",
            favorites: ["BTC", "ETH", "XMR", "DOGE"],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
        }
    }

    componentDidMount= () => {
        this.fetchCoins();
        this.fetchPrices();
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites})
        }
    }

    isInFavorites = key => _.includes(this.state.favorites, key);

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({
            coinList
        });
    }
    fetchPrices = async () => {
        if(this.state.firstVisit){
            return;
        }
        let prices = await this.prices();
        this.setState({prices});
    }

    prices = async () => {
        let returnData = [];
        for(let i = 0; i < this.state.favorites.length;i++){
            try{
                let priceData = await cc.priceFull(this.state.favorites[i], "USD");
                returnData.push(priceData);
            } catch(e) {
                console.warn("Fetch price error ", e);
            }
        }
        return returnData;
    }
    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym
        });
        localStorage.setItem("cryptoDash", JSON.stringify({ 
            ...JSON.parse(localStorage.getItem("cryptoDash")),
            currentFavorite: sym,
        }))
    }
    savedSettings = () => {
        let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
        if(!cryptoDashData){
            return { page: "settings", firstVisit: true}

        }
        const {favorites, currentFavorite} = cryptoDashData;
        return { favorites, currentFavorite }
    }
    /**
     *
     *
     * @memberof AppProvider
     */
    setPage = page => this.setState({page});
    /**
     *
     *
     * @memberof AppProvider
     */
    setFilteredCoins = filteredCoins => this.setState({filteredCoins})
    /**
     *
     *
     * @memberof AppProvider
     */
    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: "dashboard",
            currentFavorite,
        }, () => {
            this.fetchPrices();
        });
        localStorage.setItem("cryptoDash", JSON.stringify({ 
            favorites: this.state.favorites,
            currentFavorite,
        }))
    }
    render() {
        return(
            <AppContext.Provider value={this.state}>
                { this.props.children }
            </AppContext.Provider>
        )
    }
}

export default AppProvider;