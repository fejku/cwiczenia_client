import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import Waga from "../../../interfaces/Waga";
import moment from "moment";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
// Chart.defaults.global.legend!.display = false;
Chart.defaults.global.elements!.line!.tension = 0;

interface Props {
  wagi: Waga[];
}

const WykresWagi2: React.FC<Props> = ({ wagi }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChartRef = chartRef.current.getContext("2d");

      if (myChartRef) {
        new Chart(myChartRef, {
          type: "line",
          data: {
            //Bring in data
            labels: wagi.map((waga) => moment(waga.data).format("YYYY-MM-DD")),
            datasets: [
              {
                label: "Wagi rano",
                data: wagi.map((waga) => (waga.wagaRano ? waga.wagaRano : null)),
                fill: false,
                borderColor: "#6610f2",
              },
              {
                label: "Wagi wieczorem",
                data: wagi.map((waga) => (waga.wagaWieczor ? waga.wagaWieczor : null)),
                fill: false,
                borderColor: "#E0E0E0",
              },
            ],
          },
          options: {
            //Customize chart options
            spanGaps: true,
 
            layout: {
              padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15,
              },
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                  },
                },
              ],
            },
          },
        });
      }
    }
  }, [wagi]);

  return (
    <div style={{ flex: "1" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WykresWagi2;
