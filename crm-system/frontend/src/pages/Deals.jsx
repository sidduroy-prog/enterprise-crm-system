import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const STAGES = ["Prospecting", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ title: "", lead: "", value: "" });
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const [dealsRes, leadsRes] = await Promise.all([api.get("/deals"), api.get("/leads")]);
    setDeals(dealsRes.data);
    setLeads(leadsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/deals", form);
    setForm({ title: "", lead: "", value: "" });
    setShowForm(false);
    fetchData();
  };

  const moveStage = async (id, stage) => {
    await api.put(`/deals/${id}`, { stage });
    fetchData();
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Sales Pipeline</h2>
          <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
            {showForm ? "Cancel" : "+ Add Deal"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} style={styles.form}>
            <input name="title" placeholder="Deal Title" value={form.title} onChange={handleChange} required style={styles.input} />
            <select name="lead" value={form.lead} onChange={handleChange} required style={styles.input}>
              <option value="">Select Lead</option>
              {leads.map((l) => (
                <option key={l._id} value={l._id}>{l.name} - {l.company}</option>
              ))}
            </select>
            <input name="value" type="number" placeholder="Deal Value ($)" value={form.value} onChange={handleChange} style={styles.input} />
            <button type="submit" style={styles.saveBtn}>Save Deal</button>
          </form>
        )}

        <div style={styles.board}>
          {STAGES.map((stage) => (
            <div key={stage} style={styles.column}>
              <h4>{stage}</h4>
              {deals.filter((d) => d.stage === stage).map((deal) => (
                <div key={deal._id} style={styles.dealCard}>
                  <strong>{deal.title}</strong>
                  <p>{deal.lead?.name}</p>
                  <p>${deal.value}</p>
                  <select value={deal.stage} onChange={(e) => moveStage(deal._id, e.target.value)} style={{ width: "100%" }}>
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  addBtn: { background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" },
  form: { display: "flex", gap: "8px", margin: "16px 0", flexWrap: "wrap" },
  input: { padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" },
  saveBtn: { background: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" },
  board: { display: "flex", gap: "12px", marginTop: "20px", overflowX: "auto" },
  column: { background: "#e2e8f0", borderRadius: "8px", padding: "12px", minWidth: "200px", flex: 1 },
  dealCard: { background: "#fff", borderRadius: "6px", padding: "10px", marginTop: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
};

export default Deals;
