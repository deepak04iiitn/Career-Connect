import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// Helper function to format date in dd/mm/yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Get dates for the last 10 days in dd/mm/yyyy format (latest first)
const getLastTenDays = () => {
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
};

export default function Trends() {
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse] = await Promise.all([axios.get("/backend/naukri")]);

        const jobsData = jobsResponse.data.map(item => ({
          ...item,
          date: formatDate(new Date(item.time)),
        }));

        // Get last 10 days in dd/mm/yyyy format (latest first)
        const lastTenDays = getLastTenDays();

        // Count number of jobs for each of the last 10 days
        const jobsCountPerDay = lastTenDays.map(day =>
          jobsData.filter(job => job.date === day).length
        );

        // Set the bar chart data with labels (dates) and data (jobs count)
        setBarChartData({
          labels: lastTenDays,
          datasets: [{
            label: 'Jobs posted in the last 10 days (Bar Chart)',
            data: jobsCountPerDay,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        });

        // Set the line chart data with labels (dates) and data (jobs count)
        setLineChartData({
          labels: lastTenDays,
          datasets: [{
            label: 'Jobs posted in the last 10 days (Line Chart)',
            data: jobsCountPerDay,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: 'rgba(54, 162, 235, 1)'
          }]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const config = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Job Trends Over the Last 10 Days</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full">
        {/* Bar Chart */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
          className="p-8 bg-white shadow-lg rounded-lg h-96"
        >
          <h2 className="text-center font-bold text-xl mb-4">Jobs posted in the last 10 days (Bar Chart)</h2>
          <Bar data={barChartData} options={config} />
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
          className="p-8 bg-white shadow-lg rounded-lg h-96"
        >
          <h2 className="text-center font-bold text-xl mb-4">Jobs posted in the last 10 days (Line Chart)</h2>
          <Line data={lineChartData} options={config} />
        </motion.div>
      </div>
      <motion.footer
        className="mt-8 text-center text-gray-600"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>&copy; {new Date().getFullYear()} TrendingJobs4All. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
}
