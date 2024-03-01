// import React from "react";
// import ReactApexChart from "react-apexcharts";

// class PieChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     // Dummy data
//     const chartData = [44, 55, 13, 43, 22];
    
//     const chartOptions = {
//       labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
//       chart: {
//         type: 'pie',
//       },
//     };

//     this.setState({
//       chartData,
//       chartOptions,
//     });
//   }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type='pie'
//         width='100%'
//         height='300px'  // Adjust the height as needed
//       />
//     );
//   }
// }

// export default PieChart;
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = (props) => {
  const [chartData, setChartData] = useState([44, 55, 13, 43, 22]);
  const [chartOptions, setChartOptions] = useState({
         labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
          chart: {
            type: 'pie',
          },
        });

  useEffect(() => {
    // Update state when props change
    setChartData([props.errno,props.inst,props.auth,props.login,props.passAtt, props.total]);
    setChartOptions(props.chartOptions);
  }, [chartData, chartOptions]);

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type='pie'
      width='100%'
      height='300px'  // Adjust the height as needed
    />
  );
};

export default PieChart;
