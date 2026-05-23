import {
  Document, Page, Text, View, StyleSheet, Image, Font
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, color: "#1a1a2e", paddingTop: 90, paddingBottom: 60, paddingHorizontal: 32 },

  // Header
  header: { position: "absolute", top: 0, left: 0, right: 0, height: 72, backgroundColor: "#0f172a", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 32 },
  headerLogo: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerLogoBox: { width: 36, height: 36, backgroundColor: "#3b82f6", borderRadius: 6, alignItems: "center", justifyContent: "center" },
  headerLogoText: { color: "#fff", fontSize: 16, fontFamily: "Helvetica-Bold" },
  headerCompany: { color: "#fff", fontSize: 14, fontFamily: "Helvetica-Bold", marginLeft: 10 },
  headerTagline: { color: "#94a3b8", fontSize: 8, marginLeft: 10, marginTop: 2 },
  headerRight: { alignItems: "flex-end" },
  headerTitle: { color: "#fff", fontSize: 11, fontFamily: "Helvetica-Bold" },
  headerDate: { color: "#94a3b8", fontSize: 8, marginTop: 3 },

  // Footer
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, height: 44, backgroundColor: "#0f172a", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 32 },
  footerText: { color: "#64748b", fontSize: 7.5 },
  footerPage: { color: "#94a3b8", fontSize: 7.5 },
  footerCenter: { color: "#3b82f6", fontSize: 7.5 },

  // Content
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#0f172a", marginBottom: 10, marginTop: 4, paddingBottom: 6, borderBottom: "1.5px solid #3b82f6" },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  summaryCard: { flex: 1, backgroundColor: "#f0f9ff", borderRadius: 6, padding: 10, alignItems: "center" },
  summaryValue: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0f172a" },
  summaryLabel: { fontSize: 7.5, color: "#64748b", marginTop: 3 },

  // Table
  table: { width: "100%", marginBottom: 16 },
  tableHeader: { flexDirection: "row", backgroundColor: "#0f172a", borderRadius: 4, marginBottom: 2 },
  tableHeaderCell: { color: "#e2e8f0", fontFamily: "Helvetica-Bold", fontSize: 7.5, padding: "6px 8px" },
  tableRow: { flexDirection: "row", borderBottom: "0.5px solid #e2e8f0", backgroundColor: "#fff" },
  tableRowAlt: { flexDirection: "row", borderBottom: "0.5px solid #e2e8f0", backgroundColor: "#f8fafc" },
  tableCell: { fontSize: 8, color: "#334155", padding: "5px 8px" },

  badge: { borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2, fontSize: 7, fontFamily: "Helvetica-Bold" },
});

const priorityColor = { Critical: "#dc2626", High: "#ea580c", Medium: "#ca8a04", Low: "#16a34a" };
const statusColor = { Open: "#2563eb", "In Progress": "#7c3aed", Completed: "#16a34a", "On Hold": "#64748b", Approved: "#16a34a", Pending: "#ca8a04", Issued: "#2563eb", Rejected: "#dc2626", Active: "#16a34a", "Under Maintenance": "#ea580c" };

const Badge = ({ label }) => {
  const bg = statusColor[label] || priorityColor[label] || "#64748b";
  return (
    <View style={{ backgroundColor: bg + "22", borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 }}>
      <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: bg }}>{label}</Text>
    </View>
  );
};

const Header = ({ title }) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <View style={styles.header} fixed>
      <View style={styles.headerLogo}>
        <View style={styles.headerLogoBox}><Text style={styles.headerLogoText}>F</Text></View>
        <View>
          <Text style={styles.headerCompany}>FieldOps CMMS</Text>
          <Text style={styles.headerTagline}>Maintenance Management System</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerDate}>{dateStr}</Text>
      </View>
    </View>
  );
};

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>Confidential — FieldOps CMMS © {new Date().getFullYear()}</Text>
    <Text style={styles.footerCenter}>Generated on {new Date().toLocaleString()}</Text>
    <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
  </View>
);

// Work Orders Table
const WorkOrdersSheet = ({ data }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <Header title="Work Orders Report" />
    <Footer />
    <View style={styles.summaryRow}>
      {[
        { label: "Total Orders", value: data.length },
        { label: "Open", value: data.filter(d => d.status === "Open").length },
        { label: "In Progress", value: data.filter(d => d.status === "In Progress").length },
        { label: "Completed", value: data.filter(d => d.status === "Completed").length },
        { label: "Total Est. Cost", value: "$" + data.reduce((s, d) => s + d.cost, 0).toLocaleString() },
      ].map((c, i) => (
        <View key={i} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{c.value}</Text>
          <Text style={styles.summaryLabel}>{c.label}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.sectionTitle}>Work Orders</Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        {["WO #", "Title", "Asset", "Priority", "Status", "Assignee", "Due Date", "Est. Cost"].map((h, i) => (
          <Text key={i} style={[styles.tableHeaderCell, { flex: [0.8, 2.2, 1.5, 0.8, 1, 1.2, 1, 0.8][i] }]}>{h}</Text>
        ))}
      </View>
      {data.map((row, i) => (
        <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
          <Text style={[styles.tableCell, { flex: 0.8, color: "#3b82f6", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
          <Text style={[styles.tableCell, { flex: 2.2 }]}>{row.title}</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>{row.asset}</Text>
          <View style={[styles.tableCell, { flex: 0.8 }]}><Badge label={row.priority} /></View>
          <View style={[styles.tableCell, { flex: 1 }]}><Badge label={row.status} /></View>
          <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.assignee}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.due}</Text>
          <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold" }]}>${row.cost.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Assets Table
const AssetsSheet = ({ data }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <Header title="Asset Register Report" />
    <Footer />
    <View style={styles.summaryRow}>
      {[
        { label: "Total Assets", value: data.length },
        { label: "Active", value: data.filter(d => d.status === "Active").length },
        { label: "Under Maintenance", value: data.filter(d => d.status === "Under Maintenance").length },
        { label: "Total Asset Value", value: "$" + data.reduce((s, d) => s + d.value, 0).toLocaleString() },
      ].map((c, i) => (
        <View key={i} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{c.value}</Text>
          <Text style={styles.summaryLabel}>{c.label}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.sectionTitle}>Assets</Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        {["Asset ID", "Name", "Category", "Location", "Status", "Last Service", "Next Service", "Value"].map((h, i) => (
          <Text key={i} style={[styles.tableHeaderCell, { flex: [0.8, 2, 1.3, 1.5, 1.2, 1, 1, 0.8][i] }]}>{h}</Text>
        ))}
      </View>
      {data.map((row, i) => (
        <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
          <Text style={[styles.tableCell, { flex: 0.8, color: "#3b82f6", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{row.name}</Text>
          <Text style={[styles.tableCell, { flex: 1.3 }]}>{row.category}</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>{row.location}</Text>
          <View style={[styles.tableCell, { flex: 1.2 }]}><Badge label={row.status} /></View>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.lastService}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{row.nextService}</Text>
          <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold" }]}>${row.value.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  </Page>
);

// Inventory Table
const InventorySheet = ({ data }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <Header title="Inventory Report" />
    <Footer />
    <View style={styles.summaryRow}>
      {[
        { label: "Total Items", value: data.length },
        { label: "Low Stock", value: data.filter(d => d.stock <= d.reorderLevel).length },
        { label: "Total SKUs", value: data.length },
        { label: "Inventory Value", value: "$" + data.reduce((s, d) => s + d.stock * d.unitCost, 0).toLocaleString() },
      ].map((c, i) => (
        <View key={i} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{c.value}</Text>
          <Text style={styles.summaryLabel}>{c.label}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.sectionTitle}>Inventory</Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        {["Item ID", "Name", "Category", "Stock", "Reorder Lvl", "Unit", "Location", "Unit Cost", "Supplier"].map((h, i) => (
          <Text key={i} style={[styles.tableHeaderCell, { flex: [0.7, 2, 1.3, 0.6, 0.8, 0.6, 0.9, 0.7, 1.2][i] }]}>{h}</Text>
        ))}
      </View>
      {data.map((row, i) => {
        const lowStock = row.stock <= row.reorderLevel;
        return (
          <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
            <Text style={[styles.tableCell, { flex: 0.7, color: "#3b82f6", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.name}</Text>
            <Text style={[styles.tableCell, { flex: 1.3 }]}>{row.category}</Text>
            <Text style={[styles.tableCell, { flex: 0.6, color: lowStock ? "#dc2626" : "#16a34a", fontFamily: "Helvetica-Bold" }]}>{row.stock}</Text>
            <Text style={[styles.tableCell, { flex: 0.8 }]}>{row.reorderLevel}</Text>
            <Text style={[styles.tableCell, { flex: 0.6 }]}>{row.unit}</Text>
            <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.location}</Text>
            <Text style={[styles.tableCell, { flex: 0.7 }]}>${row.unitCost.toFixed(2)}</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.supplier}</Text>
          </View>
        );
      })}
    </View>
  </Page>
);

// Material Requests Table
const MaterialRequestsSheet = ({ data }) => (
  <Page size="A4" orientation="landscape" style={styles.page}>
    <Header title="Material Requests Report" />
    <Footer />
    <View style={styles.summaryRow}>
      {[
        { label: "Total Requests", value: data.length },
        { label: "Pending", value: data.filter(d => d.status === "Pending").length },
        { label: "Approved", value: data.filter(d => d.status === "Approved").length },
        { label: "Total Value", value: "$" + data.reduce((s, d) => s + d.totalCost, 0).toLocaleString() },
      ].map((c, i) => (
        <View key={i} style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{c.value}</Text>
          <Text style={styles.summaryLabel}>{c.label}</Text>
        </View>
      ))}
    </View>
    <Text style={styles.sectionTitle}>Material Requests</Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        {["MR #", "Requested By", "Work Order", "Item", "Qty", "Unit", "Status", "Request Date", "Required Date", "Total Cost"].map((h, i) => (
          <Text key={i} style={[styles.tableHeaderCell, { flex: [0.7, 1.2, 0.8, 2, 0.5, 0.5, 0.8, 0.9, 0.9, 0.8][i] }]}>{h}</Text>
        ))}
      </View>
      {data.map((row, i) => (
        <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
          <Text style={[styles.tableCell, { flex: 0.7, color: "#3b82f6", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
          <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.requestedBy}</Text>
          <Text style={[styles.tableCell, { flex: 0.8, color: "#7c3aed" }]}>{row.workOrder}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{row.item}</Text>
          <Text style={[styles.tableCell, { flex: 0.5, fontFamily: "Helvetica-Bold" }]}>{row.qty}</Text>
          <Text style={[styles.tableCell, { flex: 0.5 }]}>{row.unit}</Text>
          <View style={[styles.tableCell, { flex: 0.8 }]}><Badge label={row.status} /></View>
          <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.requestDate}</Text>
          <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.requiredDate}</Text>
          <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold" }]}>${row.totalCost.toLocaleString()}</Text>
        </View>
      ))}
    </View>
  </Page>
);

export default function PDFReport({ workOrders, assets, inventory, materialRequests }) {
  return (
    <Document title="FieldOps CMMS Report" author="FieldOps CMMS" creator="FieldOps CMMS">
      <WorkOrdersSheet data={workOrders} />
      <AssetsSheet data={assets} />
      <InventorySheet data={inventory} />
      <MaterialRequestsSheet data={materialRequests} />
    </Document>
  );
}
