import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import Waga from "../../../interfaces/Waga";
import moment from "moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    chart: {
      width: "100%",
    },
  }),
);

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

interface Props {
  wagi: Waga[];
}

const WykresWagi2: React.FC<Props> = ({ wagi }) => {
  const classes = useStyles();

  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChartRef = chartRef.current.getContext("2d");

      if (myChartRef) {
        new Chart(myChartRef, {
          type: "line",
          data: {
            labels: wagi.map((waga) => moment(waga.data).format("YYYY-MM-DD")),
            datasets: [
              {
                label: "Wagi",
                data: wagi.map((waga) => waga.waga),
                fill: false,
                borderColor: "#6610f2",
              },
            ],
          },
          options: {
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
            legend: {
              display: false,
            },
            elements: {
              line: {
                tension: 0,
              },
            },
          },
        });
      }
    }
  }, [wagi]);

  return (
    <div className={classes.root}>
      <canvas ref={chartRef} className={classes.chart} />
    </div>
  );
};

export default WykresWagi2;
