import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "./WeeklySheet.css";

const WeeklySheet = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8800/weekly-timesheet");
        const data = await response.json();
        updateCharts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Function to update charts with the fetched data
    const updateCharts = (data) => {
      // Aggregate total hours by week
      const weeklySummary = data.reduce((acc, item) => {
        const weekNumber = item.week_number;
        if (acc[weekNumber]) {
          acc[weekNumber] += parseFloat(item.total_hours);
        } else {
          acc[weekNumber] = parseFloat(item.total_hours);
        }
        return acc;
      }, {});

      // Bar Chart
      const barChart = echarts.init(barChartRef.current);
      const barChartOption = {
        title: {
          text: "Weekly Bar Chart",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: Object.keys(weeklySummary).map(String),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Bar Chart",
            type: "bar",
            data: Object.values(weeklySummary),
          },
        ],
      };
      barChart.setOption(barChartOption);

      // Pie Chart
      const pieChart = echarts.init(pieChartRef.current);
      const pieChartData = Object.entries(weeklySummary).map(
        ([week, totalHours]) => ({
          value: totalHours,
          name: `Week ${week}`,
        })
      );
      const pieChartOption = {
        title: {
          text: "Weekly Pie Chart",
          left: "center",
        },
        series: [
          {
            name: "Pie Chart",
            type: "pie",
            radius: "50%",
            data: pieChartData,
          },
        ],
      };
      pieChart.setOption(pieChartOption);
    };

    // Fetch data when the component mounts
    fetchData();

    // Clean up
    return () => {
      const barChart = echarts.getInstanceByDom(barChartRef);
      const pieChart = echarts.getInstanceByDom(pieChartRef);
      barChart && barChart.dispose();
      pieChart && pieChart.dispose();
    };
  }, []);

  return (
    <div className="weekly-sheet-container">
      <div className="chart-card" ref={barChartRef}></div>
      <div className="chart-card" ref={pieChartRef}></div>
    </div>
  );
};

export default WeeklySheet;
