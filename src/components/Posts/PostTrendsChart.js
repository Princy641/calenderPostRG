"use client"

import { useState } from "react"
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { ImageIcon, Link2, Video } from "lucide-react"

import "./postTrendsChart.css"
export default function PostTrendsChart() {
  const [selectedChannels, setSelectedChannels] = useState("all")

  const data = [
    {
      platform: "Facebook",
      imageTextPost: 2000,
      linkPromoPost: 1000,
      videoTextPost: 1100,
      imageTextPostPrev: 2200,
      linkPromoPostPrev: 1200,
      videoTextPostPrev: 1600,
    },
    {
      platform: "Instagram",
      imageTextPost: 1600,
      linkPromoPost: 800,
      videoTextPost: 600,
      imageTextPostPrev: 1800,
      linkPromoPostPrev: 700,
      videoTextPostPrev: 700,
    },
    {
      platform: "Twitter",
      imageTextPost: 2100,
      linkPromoPost: 900,
      videoTextPost: 1000,
      imageTextPostPrev: 2200,
      linkPromoPostPrev: 1100,
      videoTextPostPrev: 1700,
    },
    {
      platform: "LinkedIn",
      imageTextPost: 1500,
      linkPromoPost: 700,
      videoTextPost: 800,
      imageTextPostPrev: 1600,
      linkPromoPostPrev: 800,
      videoTextPostPrev: 700,
    },
    {
      platform: "Pinterest",
      imageTextPost: 1600,
      linkPromoPost: 800,
      videoTextPost: 600,
      imageTextPostPrev: 1700,
      linkPromoPostPrev: 700,
      videoTextPostPrev: 700,
    },
    {
      platform: "Tripadvisor",
      imageTextPost: 1500,
      linkPromoPost: 700,
      videoTextPost: 800,
      imageTextPostPrev: 1600,
      linkPromoPostPrev: 800,
      videoTextPostPrev: 700,
    },
    {
      platform: "Snapchat",
      imageTextPost: 2000,
      linkPromoPost: 1000,
      videoTextPost: 1100,
      imageTextPostPrev: 2200,
      linkPromoPostPrev: 1200,
      videoTextPostPrev: 1600,
    },
    {
      platform: "TikTok",
      imageTextPost: 1600,
      linkPromoPost: 800,
      videoTextPost: 600,
      imageTextPostPrev: 1800,
      linkPromoPostPrev: 700,
      videoTextPostPrev: 700,
    },
    {
      platform: "YouTube",
      imageTextPost: 2000,
      linkPromoPost: 1000,
      videoTextPost: 1100,
      imageTextPostPrev: 2200,
      linkPromoPostPrev: 1200,
      videoTextPostPrev: 1600,
    },
    {
      platform: "Reddit",
      imageTextPost: 2000,
      linkPromoPost: 1000,
      videoTextPost: 1100,
      imageTextPostPrev: 2200,
      linkPromoPostPrev: 1200,
      videoTextPostPrev: 1600,
    },
    {
      platform: "Snapfish",
      imageTextPost: 1600,
      linkPromoPost: 800,
      videoTextPost: 600,
      imageTextPostPrev: 1800,
      linkPromoPostPrev: 700,
      videoTextPostPrev: 700,
    },
    {
      platform: "Tumblr",
      imageTextPost: 1600,
      linkPromoPost: 800,
      videoTextPost: 600,
      imageTextPostPrev: 1800,
      linkPromoPostPrev: 700,
      videoTextPostPrev: 700,
    },
  ]

  const metrics = [
    {
      icon: <ImageIcon />,
      label: "Image Text Post",
      count: "2580",
      change: "+29%",
      color: "#38bdf8"
    },
    {
      icon: <Link2 />,
      label: "Link / Promo Post",
      count: "1800",
      change: "-5%",
      color: "#a78bfa"
    },
    {
      icon: <Video />,
      label: "Video Text Post",
      count: "1155",
      change: "+29%",
      color: "#2dd4bf"
    }
  ]

  return (
    <div className="post-trends-container">
      <div className="header-row">
        <h2 className="title">
          <strong>Post Trends</strong> - Trending up by 5.2% for last month
        </h2>
        <div className="tabs">
          <span className="active-tab">All Mentions</span>
          <span className="inactive-tab">Alerts</span>
        </div>
      </div>

      <div className="channel-buttons">
        <button className={selectedChannels === "all" ? "channel-btn active" : "channel-btn"} onClick={() => setSelectedChannels("all")}>All Channels</button>
        <button className={selectedChannels === "12" ? "channel-btn active" : "channel-btn"} onClick={() => setSelectedChannels("12")}>12 Channels</button>
      </div>

      <div className="chart-wrapper">
        <div className="chart-box">
          <BarChart width={1000} height={400} data={data} barGap={2} barCategoryGap={20}>
            <XAxis dataKey="platform" />
            <YAxis label={{ value: "MENTIONS", angle: -90, position: "insideLeft", offset: -15 }} width={60} />
            <Tooltip />
            <Legend />
            <Bar dataKey="imageTextPost" stackId="a" fill="#38bdf8" name="Image Text Post" />
            <Bar dataKey="linkPromoPost" stackId="a" fill="#a78bfa" name="Link/Promo Post" />
            <Bar dataKey="videoTextPost" stackId="a" fill="#2dd4bf" name="Video Text Post" />
            <Bar dataKey="imageTextPostPrev" stackId="b" fill="#93c5fd" name="Image Text Post (Prev)" />
            <Bar dataKey="linkPromoPostPrev" stackId="b" fill="#c4b5fd" name="Link/Promo Post (Prev)" />
            <Bar dataKey="videoTextPostPrev" stackId="b" fill="#99f6e4" name="Video Text Post (Prev)" />
          </BarChart>
        </div>

        <div className="metrics-box">
          {metrics.map((m, i) => (
            <div className="metric" key={i}>
              <div className="icon" style={{ color: m.color }}>{m.icon}</div>
              <div className="metric-info">
                <p className="metric-label">{m.label}</p>
                <p className="metric-count" style={{ color: m.color }}>{m.count}</p>
                <p className={`metric-change ${m.change.startsWith("+") ? "up" : "down"}`}>
                  {m.change} <span className="mom">MoM</span>
                </p>
              </div>
              <img src={i === 0 ? "/image-icon.png" : i === 1 ? "/link-icon.png" : "/video-icon.png"} alt="icon" className="metric-image" />
            </div>
          ))}
        </div>
      </div>
      {/* <PostsTable/> */}
    </div>
  )
}
