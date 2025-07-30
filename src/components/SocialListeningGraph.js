"use client"

import { useEffect, useRef, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import * as d3 from "d3"
import cloud from "d3-cloud"
import SentimentBarChart from "./SentimentBarChart"
import "./SocialListeningGraph.css"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function SocialListeningGraph() {
  const [showDashboard, setShowDashboard] = useState(true)
  const svgRef = useRef(null)

  // Bar Chart Data
  const barChartData = {
    labels: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "Tripadvisor",
      "Youtube",
      "Pinterest",
      "Youtube",
      "Reddit",
      "TikTok",
      "Whatsapp",
      "Telegram",
    ],
    datasets: [
      {
        label: "Last 30 days",
        data: [25000, 45000, 70000, 60000, 58000, 60000, 58000, 45000, 70000, 60000, 58000, 60000],
        backgroundColor: "rgba(147, 51, 234, 0.9)",
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
      {
        label: "MoM",
        data: [23000, 42000, 68000, 57000, 55000, 57000, 55000, 42000, 68000, 57000, 55000, 57000],
        backgroundColor: "rgba(147, 51, 234, 0.5)",
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "NUMBER OF MENTIONS",
          color: "#9ca3af",
          font: {
            size: 10,
          },
        },
        ticks: {
          callback: (value) => {
            if (value >= 1000) {
              return value / 1000 + "K"
            }
            return value
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        min: 0,
        max: 7,
        ticks: {
          autoSkip: false,
        },
      },
    },
  }

  // Donut Chart Data
  const donutChartData = {
    labels: ["Instagram", "LinkedIn", "Twitter/X", "Facebook"],
    datasets: [
      {
        data: [35, 35, 35, 25],
        backgroundColor: [
          "rgba(217, 70, 239, 0.8)", // Instagram - purple
          "rgba(251, 146, 60, 0.8)", // LinkedIn - orange
          "rgba(96, 165, 250, 0.8)", // Twitter - blue
          "rgba(75, 85, 99, 0.8)", // Facebook - gray
        ],
        borderWidth: 0,
        borderRadius: 0,
        hoverOffset: 0,
        weight: 1,
      },
    ],
  }

  // Donut Chart Options
  const donutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  }

  // Platform Data for Donut Chart Labels
  const platformData = [
    { name: "Instagram", value: "35%", change: "+12%", changeLabel: "MoM", color: "rgba(217, 70, 239, 0.8)" },
    { name: "LinkedIn", value: "35%", change: "+12%", changeLabel: "MoM", color: "rgba(251, 146, 60, 0.8)" },
    { name: "Twitter/X", value: "35%", change: "+12%", changeLabel: "MoM", color: "rgba(96, 165, 250, 0.8)" },
    { name: "Facebook", value: "25%", change: "+12%", changeLabel: "MoM", color: "rgba(75, 85, 99, 0.8)" },
  ]

  const sentimentData = [
    {
      type: "Positive",
      value: "95%",
      change: "+29%",
      changeLabel: "MoM",
      color: "green",
      icon: "🟢",
    },
    {
      type: "Negative",
      value: "1%",
      change: "-5%",
      changeLabel: "MoM",
      color: "red",
      icon: "🔴",
    },
    {
      type: "Neutral",
      value: "4%",
      change: "+29%",
      changeLabel: "MoM",
      color: "yellow",
      icon: "🟡",
    },
  ]

  // Word Cloud Setup
  useEffect(() => {
    if (!svgRef.current) return

    const width = svgRef.current.clientWidth
    const height = 300

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    // Word cloud data
    const words = [
      { text: "service", size: 70, color: "#dc2626" },
      { text: "value", size: 60, color: "#9d174d" },
      { text: "experience", size: 55, color: "#e11d48" },
      { text: "location", size: 50, color: "#db2777" },
      { text: "activities", size: 45, color: "#4f46e5" },
      { text: "staff", size: 40, color: "#7c3aed" },
      { text: "food", size: 38, color: "#f97316" },
      { text: "quality", size: 35, color: "#16a34a" },
      { text: "poor", size: 45, color: "#9d174d" },
      { text: "great", size: 35, color: "#16a34a" },
      { text: "facilities", size: 30, color: "#0ea5e9" },
      { text: "limited", size: 40, color: "#f59e0b" },
      { text: "worth", size: 10, color: "#16a34a" },
      { text: "amenities", size: 35, color: "#0ea5e9" },
      { text: "options", size: 30, color: "#9d174d" },
      { text: "variety", size: 10, color: "#f97316" },
      { text: "drinks", size: 25, color: "#f97316" },
      { text: "peaceful", size: 25, color: "#16a34a" },
      { text: "general", size: 25, color: "#f59e0b" },
      { text: "perfect", size: 10, color: "#16a34a" },
      { text: "beautiful", size: 20, color: "#16a34a" },
      { text: "luxurious", size: 20, color: "#0ea5e9" },
      { text: "paradise", size: 10, color: "#16a34a" },
      { text: "professional", size: 20, color: "#16a34a" },
      { text: "attentive", size: 15, color: "#16a34a" },
      { text: "views", size: 15, color: "#16a34a" },
      { text: "private", size: 15, color: "#16a34a" },
      { text: "outstanding", size: 15, color: "#16a34a" },
      { text: "accommodating", size: 15, color: "#16a34a" },
      { text: "beach", size: 15, color: "#0ea5e9" },
      { text: "located", size: 15, color: "#0ea5e9" },
      { text: "surroundings", size: 15, color: "#16a34a" },
      { text: "top-notch", size: 15, color: "#16a34a" },
      { text: "prime", size: 15, color: "#f59e0b" },
      { text: "getaway", size: 15, color: "#16a34a" },
      { text: "dreamy", size: 15, color: "#0ea5e9" },
      { text: "exceeded", size: 10, color: "#16a34a" },
      { text: "expectations", size: 15, color: "#16a34a" },
      { text: "personalized", size: 15, color: "#16a34a" },
      { text: "scenic", size: 10, color: "#16a34a" },
      { text: "gorgeous", size: 15, color: "#16a34a" },
      { text: "relaxing", size: 15, color: "#16a34a" },
      { text: "friendly", size: 10, color: "#16a34a" },
      { text: "stunning", size: 15, color: "#16a34a" },
      { text: "convenient", size: 15, color: "#16a34a" },
    ]

    // Create layout
    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .fontSize((d) => d.size)
      .on("end", draw)

    layout.start()

    function draw(words) {
      d3.select(svgRef.current)
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", (d) => d.color)
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y})`)
        .text((d) => d.text)
    }
  }, [])

  return (
    <>
    <div className="dashboard-container">
      <button className="dashboard-button" onClick={() => setShowDashboard(!showDashboard)}>
        {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
      </button>

      {showDashboard && (
        <div className="dashboard-grid">
          {/* Platform Mentions Chart */}
          <div className="dashboard-card">
            <div className="chart-scroll-container">
              <div className="chart-container">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>
          </div>

          {/* Platform Distribution Chart */}
          <div className="dashboard-card">
            <div className="chart-container donut-container">
              <Doughnut data={donutChartData} options={donutChartOptions} />

              {/* Platform labels */}
              <div className="donut-labels">
                {platformData.map((platform, index) => (
                  <div key={index} className={`platform-label platform-label-${index}`}>
                    <div className="platform-name">{platform.name}</div>
                    <div className="platform-stats">
                      <span className="platform-value">{platform.value}</span>
                      <span className="platform-change">{platform.change}</span>
                      <span className="platform-change-label">{platform.changeLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Sentiment Analysis</h2>
              <div className="card-actions">
                <div className="tabs">
                  <button className="tab-active">All Mentions</button>
                  <button>Alerts</button>
                </div>
                <button className="icon-button">⋮</button>
              </div>
            </div>
            <div className="card-content">
              <div className="channel-buttons">
                <button className="channel-button">All Channels</button>
                <button className="channel-button">12 Channels</button>
              </div>
              <div className="sentiment-grid">
                <div className="sentiment-chart">
                  <SentimentBarChart />
                </div>
                <div className="sentiment-summary">
                  {sentimentData.map((item, index) => (
                    <div key={index} className="sentiment-item">
                      <div className="sentiment-type">{item.type}</div>
                      <div className="sentiment-value">{item.value}</div>
                      <div className="sentiment-change-container">
                        <span className={`sentiment-change sentiment-${item.color}`}>{item.change}</span>
                        <span className="sentiment-change-label">{item.changeLabel}</span>
                      </div>
                      <div className="sentiment-icon">{item.icon}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Trending Topics</h2>
              <div className="card-actions">
                <div className="tabs">
                  <button className="tab-active">Word Cloud</button>
                  <button>Trends</button>
                </div>
                <button className="icon-button">⋮</button>
              </div>
            </div>
            <div className="card-content">
              <div className="sentiment-legend">
                <div className="legend-item">
                  <div className="legend-color legend-positive"></div>
                  <span>Positive</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-neutral"></div>
                  <span>Neutral</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-negative"></div>
                  <span>Negative</span>
                </div>
              </div>
              <div className="word-cloud-container">
                <svg ref={svgRef} className="word-cloud"></svg>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </div>
    </>
  )
}
