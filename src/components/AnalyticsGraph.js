import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "./AnalyticsGraphs.css"

// Dummy data for the charts
const engagementData = [
  {
    period: "12 - 14 Mar",
    Facebook: 110,
    Instagram: 75,
  },
  {
    period: "5 - 21 Mar",
    Facebook: 105,
    Instagram: 70,
  },
  {
    period: "22 - 28 Mar",
    Facebook: 100,
    Instagram: -60,
  },
  {
    period: "29 - 04 Apr",
    Facebook: -40,
    Instagram: 80,
  },
  {
    period: "5 - 11 Apr",
    Facebook: -50,
    Instagram: 75,
  },
]

const followersData = [
  {
    period: "12 - 14 Mar",
    Facebook: 110,
    Instagram: 75,
  },
  {
    period: "5 - 21 Mar",
    Facebook: -30,
    Instagram: 75,
  },
  {
    period: "22 - 28 Mar",
    Facebook: 85,
    Instagram: -50,
  },
  {
    period: "29 - 04 Apr",
    Facebook: 105,
    Instagram: 75,
  },
  {
    period: "5 - 11 Apr",
    Facebook: -40,
    Instagram: 75,
  },
]

const newEngagementData = [
  {
    period: "12 - 14 Mar",
    "Hyatt, London": 50,
    "Hyatt Brand": 140,
    "Avg. Competitors": 50,
  },
  {
    period: "15 - 21 Mar",
    "Hyatt, London": 160,
    "Hyatt Brand": 100,
    "Avg. Competitors": 150,
  },
  {
    period: "22 - 28 Mar",
    "Hyatt, London": 130,
    "Hyatt Brand": 70,
    "Avg. Competitors": 110,
  },
  {
    period: "29 - 04 Apr",
    "Hyatt, London": 120,
    "Hyatt Brand": 140,
    "Avg. Competitors": 130,
  },
  {
    period: "05 - 11 Apr",
    "Hyatt, London": 190,
    "Hyatt Brand": 110,
    "Avg. Competitors": 170,
  },
]

const AnalyticsGraphs = () => {
  return (
    <div className="analytics-container">
      <div className="graph-card">
        <div className="graph-header">
          <h2>Engagement Growth</h2>
          <span className="growth-indicator positive">+18%</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={engagementData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis
              tickFormatter={(tick) => `${tick}%`}
              domain={[-150, 150]}
              ticks={[-150, -100, -50, 0, 50, 100, 150]}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="Facebook" fill="#4285F4" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Instagram" fill="#EA4C89" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-card">
        <div className="graph-header">
          <h2>Followers Growth</h2>
          <span className="growth-indicator positive">+8%</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={followersData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis
              tickFormatter={(tick) => `${tick}%`}
              domain={[-150, 150]}
              ticks={[-150, -100, -50, 0, 50, 100, 150]}
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="Facebook" fill="#4285F4" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Instagram" fill="#EA4C89" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph-card">
        <div className="graph-header">
          <h2>New Engagement</h2>
          <span className="growth-indicator positive">+310</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={newEngagementData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" />
            <YAxis domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Hyatt, London" fill="#36CFC9" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Hyatt Brand" fill="#00A389" radius={[5, 5, 0, 0]} />
            <Bar dataKey="Avg. Competitors" fill="#9254DE" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsGraphs
