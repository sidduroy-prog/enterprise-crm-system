import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await api.get("/dashboard/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

  const pieData = stats.leadsByStatus.map((item) => ({ name: item._id, value: item.count }));

  return (
    <div>
      <Navbar />
      <div style={{ padding: "24px" }}>
        <h2>Dashboard</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>{stats.totalLeads}</h3>
            <p>Total Leads</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.wonLeads}</h3>
            <p>Won Leads</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.lostLeads}</h3>
            <p>Lost Leads</p>
          </div>
          <div style={styles.card}>
            <h3>{stats.conversionRate}%</h3>
            <p>Conversion Rate</p>
          </div>
        </div>

        <div style={{ width: "100%", height: 300, marginTop: "32px" }}>
          <h3>Leads by Status</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No lead data yet. Add some leads to see the chart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  cards: { display: "flex", gap: "16px", flexWrap: "wrap" },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    minWidth: "140px",
    textAlign: "center",
  },
};

export default Dashboard;
