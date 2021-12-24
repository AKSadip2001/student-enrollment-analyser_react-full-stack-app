import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/table/DataTable";
import LineChart2 from "../../components/charts/line-chart/LineChart2";
import AreaChart2 from "../../components/charts/area-chart/AreaChart2";

export default function RevenueOfSets() {
const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get("/revenue-of-sets").then((response) => {
        setData(response.data);
    });
  }, []);

  const header = [
    "YearNthSemester",
    "CSE",
    "EEE",
    "PS",
    "SETS",
    "CSE%",
    "EEE%",
    "PS%",
    "SETS%"
  ];

    return (
        <div className="school_revenue_pageContainer">

      <div className="school_revenue_tblChart_container">
        <div className="sr_table_container">
        <h4>Department wise revenue in SETS</h4>
          <DataTable data={data} header={header}></DataTable>
        </div>
        <div className="lineChart_container">
        <h4>CSE Revenue and Change %</h4>
           <LineChart2 data={data}></LineChart2>
        </div>
        <div className="areaChart_container">
        <h4>EEE Department</h4>
            <AreaChart2 data={data}></AreaChart2>
        </div>
      </div>
    </div>
    )
}
