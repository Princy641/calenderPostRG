import { BarChart, ArrowUp, Info, ArrowUpRight, Play } from 'lucide-react'
import SidebarNavigation from './Sidebar/SidebarNavigation'
import "./Dashboard.css"
import AnalyticsGraphs from "./AnalyticsGraph"


const Dashboard = () => {
  // Sample data for metrics
  const metrics = [
    { title: "Total Followers", value: "92,547", prevValue: "105,700", change: "+12.5%", isPositive: true },
    { title: "Impressions", value: "620", prevValue: "580", change: "+2.5%", isPositive: true },
    { title: "Total Engagement", value: "220K", prevValue: "21.2K", change: "+8K", isPositive: true },
    { title: "Link Clicks", value: "520", prevValue: "500", change: "+2.5%", isPositive: true },
    { title: "Purchases", value: "220", period: "30 days", change: "", isPositive: true },
  ]

  // Sample data for posts
  const posts = [
    {
      id: 1,
      title: "Get ready for Fiesta Friday savings you won't want to miss out on!",
      platform: "facebook",
      status: "Active",
      reach: "32,452",
      impressions: "33,436",
      clicks: "2342",
      purchases: "25",
    },
    {
      id: 2,
      title: "Holiday Special Celebration Event!",
      platform: "instagram",
      status: "Active",
      reach: "30,112",
      impressions: "33,226",
      clicks: "2201",
      purchases: "19",
    },
    {
      id: 3,
      title: "Winter Wonderland Festivities",
      platform: "facebook",
      status: "Active",
      reach: "25,800",
      impressions: "28,450",
      clicks: "2202",
      purchases: "23",
    },
    {
      id: 4,
      title: "Summer Fun Beach Party",
      platform: "instagram",
      status: "Active",
      reach: "15,300",
      impressions: "18,700",
      clicks: "2203",
      purchases: "15",
    },
    {
      id: 5,
      title: "Autumn Harvest Festival",
      platform: "instagram",
      status: "Active",
      reach: "10,000",
      impressions: "12,100",
      clicks: "2205",
      purchases: "10",
      variant: "warning",
    },
  ]

  // Sample data for ads
  const ads = [
    {
      id: 1,
      title: "#HyattCelebratesYou",
      platform: "facebook",
      status: "Active",
      reach: "32,452",
      impressions: "33,436",
      clicks: "2342",
      purchases: "25",
    },
    {
      id: 2,
      title: "#WellnessAtHyatt",
      platform: "instagram",
      status: "Active",
      reach: "11,409",
      impressions: "32,204",
      clicks: "2201",
      purchases: "19",
    },
    {
      id: 3,
      title: "WelcomeSummer",
      platform: "facebook",
      status: "Active",
      reach: "7,603",
      impressions: "21,201",
      clicks: "2202",
      purchases: "23",
    },
    {
      id: 4,
      title: "Perfectly Yours 2.0",
      platform: "instagram",
      status: "Active",
      reach: "13,987",
      impressions: "18,004",
      clicks: "2203",
      purchases: "15",
    },
    {
      id: 5,
      title: "Make the Most of Being Away",
      platform: "instagram",
      status: "Active",
      reach: "8,734",
      impressions: "9,358",
      clicks: "2205",
      purchases: "10",
      variant: "warning",
    },
  ]

  // Date range for the dashboard
  const dateRange = "Last 30 Days: 12 Mar - 11 Apr"

  return (
    <>
      <SidebarNavigation />
      <div className="dashboard-Container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <span className="date-range">{dateRange}</span>
          </div>
          <div className="dashboard-actions">
            <button className="view-events-btn">View Events</button>
            <button className="ask-ai-btn">
              <BarChart size={16} />
              Ask AI
            </button>
          </div>
        </div>

        <p className="dashboard-subtitle">Monitor your hotel's social media performance</p>

        {/* Performance Score Card */}
        <div className="performance-card">
          <div className="performance-header">
            <h2>
              Social Performance Score <Info size={16} />
            </h2>
          </div>

          <div className="performance-content">
            <div className="performance-score-section">
              <div className="score-container">
                <h3 className="performance-score">62%</h3>
                <div className="performance-badges">
                  <span className="badge badge-success">
                    <ArrowUpRight size={14} />
                    +3% MoM
                  </span>
                  <span className="badge badge-success">
                    <ArrowUpRight size={14} />
                    +10% better than competitors
                  </span>
                </div>
              </div>

              <div className="performance-tips">
                <h4>You are doing much better, but here are few things you can do to improve your score further:</h4>
                <ul>
                  <li>
                    Add{" "}
                    <a href="#" className="link">
                      more channels
                    </a>{" "}
                    to increase reach and engagement
                  </li>
                  <li>
                    Add{" "}
                    <a href="#" className="link">
                      auto-response
                    </a>{" "}
                    on social listening
                  </li>
                </ul>
              </div>
            </div>

            <div className="performance-illustration">
              <img src="/placeholder.svg?height=200&width=300" alt="Social media performance illustration" />
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="metrics-container">
          {metrics.map((metric, index) => (
            <div className="metric-card" key={index}>
              <div className="metric-header">
                <span className="metric-title">{metric.title}</span>
                {metric.change && (
                  <span className={`metric-change ${metric.isPositive ? "positive" : "negative"}`}>
                    <ArrowUp size={14} />
                    {metric.change}
                  </span>
                )}
              </div>
              <div className="metric-value">{metric.value}</div>
              {metric.prevValue && <div className="metric-prev">from {metric.prevValue}</div>}
              {metric.period && <div className="metric-period">{metric.period}</div>}
            </div>
          ))}
        </div>

        {/* Charts Section */}

        <AnalyticsGraphs/>

        {/* Posts and Ads Tables - Side by Side Layout */}
        <div className="tables-grid">
          {/* Posts Table */}
          <div className="data-card">
            <div className="data-card-header">
              <h3>Posts</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="posts-filter" defaultChecked />
                  <span className="filter-radio"></span>
                  Top Performing (5)
                </label>
                <label className="filter-option">
                  <input type="radio" name="posts-filter" />
                  <span className="filter-radio"></span>
                  Least Performing (5)
                </label>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="th-posts">Posts</th>
                    <th className="th-channels">Channels</th>
                    <th className="th-status">Status</th>
                    <th className="th-reach">Reach</th>
                    <th className="th-impressions">Impressions</th>
                    <th className="th-clicks">Link Clicks</th>
                    <th className="th-purchases">Purchases</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="td-post">
                        <div className="post-info">
                          <div className="play-button">
                            <Play size={16} />
                          </div>
                          <div className="post-title">{post.title}</div>
                        </div>
                      </td>
                      <td className="td-channel">
                        <div className={`platform-icon ${post.platform}`}>
                          {post.platform === "facebook" ? (
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path
                                fill="#1877F2"
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <linearGradient
                                id="instagram-gradient"
                                x1="0%"
                                y1="100%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#FFDC80" />
                                <stop offset="50%" stopColor="#E4405F" />
                                <stop offset="100%" stopColor="#5851DB" />
                              </linearGradient>
                              <path
                                fill="url(#instagram-gradient)"
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="td-status">
                        <span className={`status-badge ${post.variant || "success"}`}>{post.status}</span>
                      </td>
                      <td className="td-reach">{post.reach}</td>
                      <td className="td-impressions">{post.impressions}</td>
                      <td className="td-clicks">{post.clicks}</td>
                      <td className="td-purchases">{post.purchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="data-card-footer">
              <a href="#" className="view-all-link">
                View All
              </a>
            </div>
          </div>

          {/* Ads Table */}
          <div className="data-card">
            <div className="data-card-header">
              <h3>Ads</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="ads-filter" defaultChecked />
                  <span className="filter-radio"></span>
                  Top Performing (5)
                </label>
                <label className="filter-option">
                  <input type="radio" name="ads-filter" />
                  <span className="filter-radio"></span>
                  Least Performing (5)
                </label>
              </div>
            </div>

            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="th-posts">Posts</th>
                    <th className="th-channels">Channels</th>
                    <th className="th-status">Status</th>
                    <th className="th-reach">Reach</th>
                    <th className="th-impressions">Impressions</th>
                    <th className="th-clicks">Link Clicks</th>
                    <th className="th-purchases">Purchases</th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((ad) => (
                    <tr key={ad.id}>
                      <td className="td-post">
                        <div className="post-info">
                          <div className="play-button">
                            <Play size={16} />
                          </div>
                          <div className="post-title">{ad.title}</div>
                        </div>
                      </td>
                      <td className="td-channel">
                        <div className={`platform-icon ${ad.platform}`}>
                          {ad.platform === "facebook" ? (
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path
                                fill="#1877F2"
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                              />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <linearGradient
                                id="instagram-gradient-ad"
                                x1="0%"
                                y1="100%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#FFDC80" />
                                <stop offset="50%" stopColor="#E4405F" />
                                <stop offset="100%" stopColor="#5851DB" />
                              </linearGradient>
                              <path
                                fill="url(#instagram-gradient-ad)"
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                              />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="td-status">
                        <span className={`status-badge ${ad.variant || "success"}`}>{ad.status}</span>
                      </td>
                      <td className="td-reach">{ad.reach}</td>
                      <td className="td-impressions">{ad.impressions}</td>
                      <td className="td-clicks">{ad.clicks}</td>
                      <td className="td-purchases">{ad.purchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="data-card-footer">
              <a href="#" className="view-all-link">
                View All
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

