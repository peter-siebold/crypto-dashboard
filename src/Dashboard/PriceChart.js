import highchartsConfig from "./HighChartsConfig";
import React from "react";
import {Tile} from "../Shared/Tile";
import {AppContext} from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";
import HighChartsTheme  from "./HighChartsTheme";
import ChartSelect from "./ChartSelect";

ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

export const PriceChart = () => {
    return (
        <AppContext.Consumer>
            {({historical, changeChartSelect}) => (
                <Tile>
                    <ChartSelect 
                        defaultValue={'months'}
                        onChange={ e => changeChartSelect(e.target.value)}
                        >
                        <option value="days">Days</option>
                        <option value="months">Months</option>
                        <option value="weeks">Weeks</option>
                    </ChartSelect>
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