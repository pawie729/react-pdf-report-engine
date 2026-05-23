import { useState, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "./PDFReport";
import { workOrders, assets, inventory, materialRequests } from "./data";
import "./App.css";

const TABS = [
  { key: "workorders", label: "Work Orders", count: workOrders.length },
  { key: "assets", label: "Assets", count: assets.length },
  { key: "inventory", label: "Inventory", count: inventory.length },
  { key: "materialrequests", label: "Material Requests", count: materialRequests.length },
];

const statusColor = {
  Open: "badge-blue", "In Progress": "badge-purple", Completed: "badge-green", "On Hold": "badge-gray",
  Approved: "badge-green", Pending: "badge-yellow", Issued: "badge-blue", Rejected: "badge-red",
  Active: "badge-green", "Under Maintenance": "badge-orange",
  Critical: "badge-red", High: "badge-orange", Medium: "badge-yellow", Low: "badge-green",
};

const Badge = ({ label }) => <span className={`badge ${statusColor[label] || "badge-gray"}`}>{label}</span>;

function WorkOrdersGrid({ data, search }) {
  const filtered = useMemo(() => data.filter(r =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  ), [data, search]);
  return (
    <table className="grid-table"><thead><tr>
      {["WO #","Title","Asset","Priority","Status","Assignee","Due Date","Est. Cost"].map(h=><th key={h}>{h}</th>)}
    </tr></thead><tbody>
      {filtered.map((r,i)=><tr key={i}>
        <td className="id-cell">{r.id}</td><td>{r.title}</td><td className="muted">{r.asset}</td>
        <td><Badge label={r.priority}/></td><td><Badge label={r.status}/></td>
        <td>{r.assignee}</td><td className="muted">{r.due}</td>
        <td className="num-cell">${r.cost.toLocaleString()}</td>
      </tr>)}
    </tbody></table>
  );
}

function AssetsGrid({ data, search }) {
  const filtered = useMemo(() => data.filter(r =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  ), [data, search]);
  return (
    <table className="grid-table"><thead><tr>
      {["Asset ID","Name","Category","Location","Status","Last Service","Next Service","Value"].map(h=><th key={h}>{h}</th>)}
    </tr></thead><tbody>
      {filtered.map((r,i)=><tr key={i}>
        <td className="id-cell">{r.id}</td><td>{r.name}</td><td className="muted">{r.category}</td>
        <td className="muted">{r.location}</td><td><Badge label={r.status}/></td>
        <td className="muted">{r.lastService}</td><td className="muted">{r.nextService}</td>
        <td className="num-cell">${r.value.toLocaleString()}</td>
      </tr>)}
    </tbody></table>
  );
}

function InventoryGrid({ data, search }) {
  const filtered = useMemo(() => data.filter(r =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  ), [data, search]);
  return (
    <table className="grid-table"><thead><tr>
      {["Item ID","Name","Category","Stock","Reorder Lvl","Unit","Location","Unit Cost","Supplier"].map(h=><th key={h}>{h}</th>)}
    </tr></thead><tbody>
      {filtered.map((r,i)=><tr key={i}>
        <td className="id-cell">{r.id}</td><td>{r.name}</td><td className="muted">{r.category}</td>
        <td className={r.stock<=r.reorderLevel?"num-cell warn-cell":"num-cell ok-cell"}>{r.stock}</td>
        <td className="muted">{r.reorderLevel}</td><td className="muted">{r.unit}</td>
        <td className="muted">{r.location}</td><td className="num-cell">${r.unitCost.toFixed(2)}</td>
        <td className="muted">{r.supplier}</td>
      </tr>)}
    </tbody></table>
  );
}

function MaterialRequestsGrid({ data, search }) {
  const filtered = useMemo(() => data.filter(r =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  ), [data, search]);
  return (
    <table className="grid-table"><thead><tr>
      {["MR #","Requested By","Work Order","Item","Qty","Unit","Status","Request Date","Required Date","Total Cost"].map(h=><th key={h}>{h}</th>)}
    </tr></thead><tbody>
      {filtered.map((r,i)=><tr key={i}>
        <td className="id-cell">{r.id}</td><td>{r.requestedBy}</td><td className="wo-cell">{r.workOrder}</td>
        <td>{r.item}</td><td className="num-cell">{r.qty}</td><td className="muted">{r.unit}</td>
        <td><Badge label={r.status}/></td><td className="muted">{r.requestDate}</td>
        <td className="muted">{r.requiredDate}</td><td className="num-cell">${r.totalCost.toLocaleString()}</td>
      </tr>)}
    </tbody></table>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("workorders");
  const [search, setSearch] = useState("");
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});

  const stats = {
    workorders: [
      {label:"Total",value:workOrders.length,cls:""},
      {label:"Open",value:workOrders.filter(r=>r.status==="Open").length,cls:"stat-blue"},
      {label:"In Progress",value:workOrders.filter(r=>r.status==="In Progress").length,cls:"stat-purple"},
      {label:"Completed",value:workOrders.filter(r=>r.status==="Completed").length,cls:"stat-green"},
      {label:"Est. Cost",value:"$"+workOrders.reduce((s,r)=>s+r.cost,0).toLocaleString(),cls:""},
    ],
    assets: [
      {label:"Total",value:assets.length,cls:""},
      {label:"Active",value:assets.filter(r=>r.status==="Active").length,cls:"stat-green"},
      {label:"Under Maint.",value:assets.filter(r=>r.status==="Under Maintenance").length,cls:"stat-orange"},
      {label:"Total Value",value:"$"+assets.reduce((s,r)=>s+r.value,0).toLocaleString(),cls:""},
    ],
    inventory: [
      {label:"Total SKUs",value:inventory.length,cls:""},
      {label:"Low Stock",value:inventory.filter(r=>r.stock<=r.reorderLevel).length,cls:"stat-red"},
      {label:"Inv. Value",value:"$"+inventory.reduce((s,r)=>s+(r.stock*r.unitCost),0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,","),cls:""},
    ],
    materialrequests: [
      {label:"Total",value:materialRequests.length,cls:""},
      {label:"Pending",value:materialRequests.filter(r=>r.status==="Pending").length,cls:"stat-orange"},
      {label:"Approved",value:materialRequests.filter(r=>r.status==="Approved").length,cls:"stat-green"},
      {label:"Total Value",value:"$"+materialRequests.reduce((s,r)=>s+r.totalCost,0).toLocaleString(),cls:""},
    ],
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">F</div>
          <div><div className="logo-name">FieldOps</div><div className="logo-sub">CMMS</div></div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Modules</div>
          {TABS.map(tab=>(
            <button key={tab.key} className={`nav-item ${activeTab===tab.key?"active":""}`}
              onClick={()=>{setActiveTab(tab.key);setSearch("");}}>
              <span className="nav-label">{tab.label}</span>
              <span className="nav-count">{tab.count}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-pill">
            <div className="user-avatar">AU</div>
            <div><div className="user-name">Admin User</div><div className="user-role">System Admin</div></div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <h1 className="page-title">{TABS.find(t=>t.key===activeTab)?.label}</h1>
            <span className="page-date">{dateStr}</span>
          </div>
          <div className="topbar-right">
            <div className="search-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="search-input" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <PDFDownloadLink
              document={<PDFReport workOrders={workOrders} assets={assets} inventory={inventory} materialRequests={materialRequests}/>}
              fileName={`fieldops-report-${now.toISOString().slice(0,10)}.pdf`}
              className="export-btn">
              {({loading})=><>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {loading?"Preparing…":"Export PDF"}
              </>}
            </PDFDownloadLink>
          </div>
        </header>

        <div className="stats-bar">
          {(stats[activeTab]||[]).map((s,i)=>(
            <div key={i} className="stat-chip">
              <span className={`stat-value ${s.cls}`}>{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="grid-wrap">
          {activeTab==="workorders" && <WorkOrdersGrid data={workOrders} search={search}/>}
          {activeTab==="assets" && <AssetsGrid data={assets} search={search}/>}
          {activeTab==="inventory" && <InventoryGrid data={inventory} search={search}/>}
          {activeTab==="materialrequests" && <MaterialRequestsGrid data={materialRequests} search={search}/>}
        </div>
      </main>
    </div>
  );
}
