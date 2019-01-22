import highchartsConfig from "./HighChartsConfig";
import React from "react";
import {Tile} from "../Shared/Tile";
import {AppContext} from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";
import HighChartsTheme  from "./HighChartsTheme";

ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

export const PriceChart = () => {
    return (
        <AppContext.Consumer>
            {({historical}) => (
                <Tile>
                { historical ?
                    <ReactHighCharts config={highchartsConfig(historical)} />
                    : <div>loading historical data..</div>
                }
                </Tile>
            )}
            
        </AppContext.Consumer>
    )
}


export default PriceChart;