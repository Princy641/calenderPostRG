"use client"

import { useRef, useEffect } from "react"
import Chart from "chart.js/auto"

export default function SentimentBarChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      // Create new chart
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Facebook",
            "Instagram",
            "Twitter",
            "LinkedIn",
            "Snapchat",
            "Pinterest",
            "Youtube",
            "Reddit",
            "TikTok",
            "Whatsapp",
            "Telegram",
            "Tiktok",
          ],
          datasets: [
            {
              label: "Positive",
              data: [97, 97, 92, 96, 94, 94, 97, 97, 92, 96, 94, 94],
              backgroundColor: "rgba(16, 185, 129, 0.9)",
              barPercentage: 0.6,
              categoryPercentage: 0.8,
              stack: "Stack 0",
              borderRadius: {
                topLeft: 10,
                topRight: 10,
                bottomLeft: 0,
                bottomRight: 0,
              },
            },
            {
              label: "Neutral",
              data: [2, 2, 5, 2, 4, 3, 2, 2, 5, 2, 4, 3],
              backgroundColor: "rgba(245, 158, 11, 0.9)",
              barPercentage: 0.6,
              categoryPercentage: 0.8,
              stack: "Stack 0",
            },
            {
              label: "Negative",
              data: [1, 1, 3, 2, 2, 3, 1, 1, 3, 2, 2, 3],
              backgroundColor: "rgba(239, 68, 68, 0.9)",
              barPercentage: 0.6,
              categoryPercentage: 0.8,
              stack: "Stack 0",
            },
          ],
        },
        // options: {
        //   responsive: true,
        //   maintainAspectRatio: false,
        //   indexAxis: "x",
        //   plugins: {
        //     legend: {
        //       display: false,
        //     },
        //     tooltip: {
        //       callbacks: {
        //         label: (context) => `${context.dataset.label}: ${context.raw}%`,
        //       },
        //     },
        //   },
        //   scales: {
        //     y: {
        //       stacked: true,
        //       beginAtZero: true,
        //       max: 100,
        //       ticks: {
        //         callback: (value) => value + "%",
        //       },
        //     },
        //     x: {
        //       stacked: true,
        //       grid: {
        //         display: false,
        //       },
        //     },
        //   },
        //   // Add custom plugin to draw text on bars
        //   // plugins: [
        //   //   {
        //   //     id: "textInBar",
        //   //     afterDraw: (chart) => {
        //   //       const ctx = chart.ctx

        //   //       chart.data.datasets.forEach((dataset, datasetIndex) => {
        //   //         const meta = chart.getDatasetMeta(datasetIndex)

        //   //         if (!meta.hidden) {
        //   //           meta.data.forEach((bar, index) => {
        //   //             const value = dataset.data[index]
        //   //             if (value > 0) {
        //   //               // Only draw text if value is greater than 0
        //   //               const position = bar.getCenterPoint()

        //   //               // Set text properties
        //   //               ctx.fillStyle = "white"
        //   //               ctx.textAlign = "center"
        //   //               ctx.textBaseline = "middle"
        //   //               ctx.font = "bold 12px Arial"

        //   //               // Draw text
        //   //               ctx.fillText(value, position.x, position.y)
        //   //             }
        //   //           })
        //   //         }
        //   //       })
        //   //     },
        //   //   },
        //   // ],
        // },
      })
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} height="300" />
}
