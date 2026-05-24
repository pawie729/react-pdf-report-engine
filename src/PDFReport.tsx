import {
  Document, Page, Text, View, StyleSheet, Image
} from "@react-pdf/renderer";
import logo from "./assets/logo.png";

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a2e",
    paddingTop: 180,   // space for taller header
    paddingBottom: 50,
    paddingHorizontal: 40,
  },

  // ── Header (PO-style) ──────────────────────────────────────────────────────
  header: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 170,
    backgroundColor: "#ffffff",
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #1a1a2e",
  },
  // Row 1: logo left  |  report title right
  headerRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  headerRow2: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 8,
    alignItems: "flex-end",
  },
  headerRow3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLogoWrap: {
    width: 60,
    height: 60,
  },
  headerLogoImg: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  headerLogoBox: {          // fallback coloured square
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogoLetter: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
  },
  reportTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    textAlign: "right",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Row 2: company info left  |  meta (date, page ref) right

  addressType: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
  },
  addressDetail: {
    fontSize: 8,
    color: "#475569",
    marginTop: 1,
  },
  metaTable: {
    paddingTop: 16, 
    alignItems: "flex-end",
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    width: 70,
    textAlign: "right",
  },
  metaValue: {
    fontSize: 8,
    color: "#475569",
    width: 90,
    textAlign: "right",
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 40,
    backgroundColor: "#f8fafc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    borderTop: "1px solid #e2e8f0",
  },
  footerText: { color: "#94a3b8", fontSize: 7.5 },
  footerCenter: { color: "#475569", fontSize: 7.5 },
  footerPage: { color: "#1e293b", fontSize: 7.5, fontFamily: "Helvetica-Bold" },

  // ── Section title ───────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    marginBottom: 6,
    marginTop: 2,
    paddingBottom: 4,
    borderBottom: "1px solid #cbd5e1",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ── KPI chips ───────────────────────────────────────────────────────────────
  summaryRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  summaryCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  summaryValue: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#1e293b" },
  summaryLabel: { fontSize: 7, color: "#64748b", marginTop: 2 },

  // ── Table ───────────────────────────────────────────────────────────────────
  table: { width: "100%", marginBottom: 4 },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 0,
  },
  tableHeaderCell: {
    color: "#1e293b",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: "5px 7px",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  tableRowAlt: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
  },
  tableCell: { fontSize: 8, color: "#334155", padding: "5px 7px" },

  // ── Totals block (below table) ──────────────────────────────────────────────
  totalsBlock: {
    marginTop: 2,
    alignItems: "flex-end",
  },
  totalsRow: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 8,
    minWidth: 200,
  },
  totalsRowFinal: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f7f7f7",
    minWidth: 200,
  },
  totalsLabel: {
    flex: 1,
    fontSize: 10,
    color: "#475569",
    textAlign: "right",
    paddingRight: 12,
  },
  totalsValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    width: 70,
    textAlign: "right",
  },
  totalsFinalLabel: {
    flex: 1,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    textAlign: "right",
    paddingRight: 12,
  },
  totalsFinalValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    width: 70,
    textAlign: "right",
  },
  dividerLine: {
    borderTop: "0.5px solid #f7f7f7",
    marginVertical: 2,
    width: 200,
    alignSelf: "flex-end",
  },
});

// ── Colour maps ───────────────────────────────────────────────────────────────

const priorityColor: Record<string, string> = {
  Critical: "#dc2626", High: "#ea580c", Medium: "#ca8a04", Low: "#16a34a",
};
const statusColor: Record<string, string> = {
  Open: "#2563eb", "In Progress": "#7c3aed", Completed: "#16a34a",
  "On Hold": "#64748b", Approved: "#16a34a", Pending: "#ca8a04",
  Issued: "#2563eb", Rejected: "#dc2626", Active: "#16a34a",
  "Under Maintenance": "#ea580c",
};

// ── Shared components ─────────────────────────────────────────────────────────

const Badge = ({ label }: { label: string }) => {
  const bg = statusColor[label] ?? priorityColor[label] ?? "#64748b";
  return (
    <View style={{ borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 }}>
      <Text style={{ fontSize: 7, fontFamily: "Helvetica-Bold", color: bg }}>{label}</Text>
    </View>
  );
};

/**
 * PO-style header
 *  ┌──────────────────────────────────────────────────┐
 *  │ [LOGO]                        REPORT TITLE       │
 *  │ Company Name                  Generated: …       │
 *  │ Tagline                       Report Date: …     │
 *  └──────────────────────────────────────────────────┘
 */
const Header = ({ title, logoSrc, user, reportNo }: { title: string; logoSrc?: string, user?: string; reportNo?:any }) => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.header} fixed>
      {/* Row 1 — From Address  +  Logo */}
      <View style={styles.headerRow1}>
        <View>
          <Text style={styles.addressType}>FROM :</Text>
          <Text style={styles.addressDetail}>Manager</Text>
          <Text style={styles.addressDetail}>Operations Division</Text>
          <Text style={styles.addressDetail}>Sri Lanka Railway</Text>
          <Text style={styles.addressDetail}>+94-112-4586325</Text>
          <Text style={styles.addressDetail}>cgrop@gov.lk</Text>
        </View>
        <View style={styles.headerLogoWrap}>
          {logoSrc
            ? <Image style={styles.headerLogoImg} src={logoSrc} />
            : <View style={styles.headerLogoBox}><Text style={styles.headerLogoLetter}>F</Text></View>
          }
        </View>
      </View>

      {/* Row 2 — Title  +  meta table */}
      <View style={styles.headerRow2}>
        <Text style={styles.reportTitle}>{title}</Text>
      </View>

      {/* Row 3 — To Address +  Report # , Date */}
      <View style={styles.headerRow3}>
        <View>
          <Text style={styles.addressType}>TO :</Text>
          <Text style={styles.addressDetail}>USA Techs</Text>
          <Text style={styles.addressDetail}>Vandor Address 1234</Text>
          <Text style={styles.addressDetail}>CA 12345</Text>
          <Text style={styles.addressDetail}>+1-002-4586325</Text>
          <Text style={styles.addressDetail}>usatech@org.co.us</Text>
        </View>
        <View style={styles.metaTable}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>WO #:</Text>
            <Text style={styles.metaValue}>{reportNo}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>WO Date:</Text>
            <Text style={styles.metaValue}>{date}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Generated on:</Text>
            <Text style={styles.metaValue}>{date} {time}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Generated by:</Text>
            <Text style={styles.metaValue}>{user}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Footer = () => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>Evantage CMMS © {new Date().getFullYear()}</Text>
    <Text style={styles.footerCenter}>Sri Lanka Railway</Text>
    <Text style={styles.footerPage} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
  </View>
);

// ── Totals helpers ────────────────────────────────────────────────────────────

/** Simple subtotal + grand total block pinned to the right */
const TotalsBlock = ({ rows }: { rows: { label: string; value: string }[] }) => {
  const grandTotal = rows[rows.length - 1];
  const subRows = rows.slice(0, -1);
  return (
    <View style={styles.totalsBlock}>
      {subRows.map((r, i) => (
        <View key={i} style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>{r.label}</Text>
          <Text style={styles.totalsValue}>{r.value}</Text>
        </View>
      ))}
      <View style={styles.totalsRowFinal}>
        <Text style={styles.totalsFinalLabel}>{grandTotal?.label}</Text>
        <Text style={styles.totalsFinalValue}>{grandTotal?.value}</Text>
      </View>
    </View>
  );
};

// ── Sheets ────────────────────────────────────────────────────────────────────

const WorkOrdersSheet = ({ data, logoSrc ,user, reportNo}: { data: any[]; logoSrc?: string, user?: string; reportNo?:any }) => {
  const totalCost = data.reduce((s, d) => s + d.cost, 0);
  const taxRate = 0.05;
  const tax = totalCost * taxRate;
  const grandTotal = totalCost + tax;
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Page size="A4" orientation="portrait" style={styles.page}>
      <Header title="Work Orders Report" logoSrc={logoSrc} user={user} reportNo={reportNo}/>
      <Footer />

      {/* KPI chips */}
      {/* <View style={styles.summaryRow}>
        {[
          { label: "Total Orders", value: data.length },
          { label: "Open", value: data.filter(d => d.status === "Open").length },
          { label: "In Progress", value: data.filter(d => d.status === "In Progress").length },
          { label: "Completed", value: data.filter(d => d.status === "Completed").length },
          { label: "Est. Cost Total", value: fmt(totalCost) },
        ].map((c, i) => (
          <View key={i} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{c.value}</Text>
            <Text style={styles.summaryLabel}>{c.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Work Orders</Text> */}

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {["WO #", "Title", "Priority", "Status", "Assignee", "Due Date", "Est. Cost"].map((h, i) => (
            <Text key={i} style={[styles.tableHeaderCell, { flex: [0.8, 2.2, 0.8, 1, 1.2, 1, 0.8][i]! }]}>{h}</Text>
          ))}
        </View>
        {data.map((row, i) => (
          <View key={i} style={i % 2 === 0 ? styles.tableRowAlt : styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.8, color: "#2563eb", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
            <Text style={[styles.tableCell, { flex: 2.2 }]}>{row.title}</Text>
            {/* <Text style={[styles.tableCell, { flex: 1.5 }]}>{row.asset}</Text> */}
            <View style={[styles.tableCell, { flex: 0.8 }]}><Badge label={row.priority} /></View>
            <View style={[styles.tableCell, { flex: 1 }]}><Badge label={row.status} /></View>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.assignee}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.due}</Text>
            <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold", textAlign: "right" }]}>{fmt(row.cost)}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <TotalsBlock rows={[
        { label: "Subtotal", value: fmt(totalCost) },
        { label: `Tax (${(taxRate * 100).toFixed(0)}%)`, value: fmt(tax) },
        { label: "Total", value: fmt(grandTotal) },
      ]} />
    </Page>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const AssetsSheet = ({ data, logoSrc }: { data: any[]; logoSrc?: string }) => {
  const totalValue = data.reduce((s, d) => s + d.value, 0);
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Page size="A4" orientation="portrait" style={styles.page}>
      <Header title="Asset Register Report" logoSrc={logoSrc} />
      <Footer />

      {/* <View style={styles.summaryRow}>
        {[
          { label: "Total Assets", value: data.length },
          { label: "Active", value: data.filter(d => d.status === "Active").length },
          { label: "Under Maintenance", value: data.filter(d => d.status === "Under Maintenance").length },
          { label: "Total Asset Value", value: fmt(totalValue) },
        ].map((c, i) => (
          <View key={i} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{c.value}</Text>
            <Text style={styles.summaryLabel}>{c.label}</Text>
          </View>
        ))}
      </View> */}

      <Text style={styles.sectionTitle}>Assets</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          {["Asset ID", "Name", "Category", "Location", "Status", "Last Service", "Next Service", "Value"].map((h, i) => (
            <Text key={i} style={[styles.tableHeaderCell, { flex: [0.8, 2, 1.3, 1.5, 1.2, 1, 1, 0.8][i]! }]}>{h}</Text>
          ))}
        </View>
        {data.map((row, i) => (
          <View key={i} style={i % 2 === 0 ? styles.tableRowAlt : styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.8, color: "#2563eb", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.name}</Text>
            <Text style={[styles.tableCell, { flex: 1.3 }]}>{row.category}</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>{row.location}</Text>
            <View style={[styles.tableCell, { flex: 1.2 }]}><Badge label={row.status} /></View>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.lastService}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{row.nextService}</Text>
            <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold", textAlign: "right" }]}>{fmt(row.value)}</Text>
          </View>
        ))}
      </View>

      <TotalsBlock rows={[
        { label: "Total Asset Value", value: fmt(totalValue) },
        { label: "Grand Total", value: fmt(totalValue) },
      ]} />
    </Page>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const InventorySheet = ({ data, logoSrc }: { data: any[]; logoSrc?: string }) => {
  const invValue = data.reduce((s, d) => s + d.stock * d.unitCost, 0);
  const lowStock = data.filter(d => d.stock <= d.reorderLevel);
  const reorderVal = lowStock.reduce((s, d) => s + d.reorderLevel * d.unitCost, 0);
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Page size="A4" orientation="portrait" style={styles.page}>
      <Header title="Inventory Report" logoSrc={logoSrc} />
      <Footer />

      <View style={styles.summaryRow}>
        {[
          { label: "Total SKUs", value: data.length },
          { label: "Low Stock Items", value: lowStock.length },
          { label: "Reorder Value", value: fmt(reorderVal) },
          { label: "Total Inv. Value", value: fmt(invValue) },
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
            <Text key={i} style={[styles.tableHeaderCell, { flex: [0.7, 2, 1.3, 0.6, 0.8, 0.6, 0.9, 0.7, 1.2][i]! }]}>{h}</Text>
          ))}
        </View>
        {data.map((row, i) => {
          const isLow = row.stock <= row.reorderLevel;
          return (
            <View key={i} style={i % 2 === 0 ? styles.tableRowAlt : styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.7, color: "#2563eb", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{row.name}</Text>
              <Text style={[styles.tableCell, { flex: 1.3 }]}>{row.category}</Text>
              <Text style={[styles.tableCell, { flex: 0.6, color: isLow ? "#dc2626" : "#16a34a", fontFamily: "Helvetica-Bold" }]}>{row.stock}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{row.reorderLevel}</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>{row.unit}</Text>
              <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.location}</Text>
              <Text style={[styles.tableCell, { flex: 0.7, textAlign: "right" }]}>${row.unitCost.toFixed(2)}</Text>
              <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.supplier}</Text>
            </View>
          );
        })}
      </View>

      <TotalsBlock rows={[
        { label: "Low Stock Reorder Value", value: fmt(reorderVal) },
        { label: "Total Inventory Value", value: fmt(invValue) },
        { label: "Grand Total", value: fmt(invValue) },
      ]} />
    </Page>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const MaterialRequestsSheet = ({ data, logoSrc }: { data: any[]; logoSrc?: string }) => {
  const totalCost = data.reduce((s, d) => s + d.totalCost, 0);
  const taxRate = 0.05;
  const tax = totalCost * taxRate;
  const grandTotal = totalCost + tax;
  const fmt = (n: number) => "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Page size="A4" orientation="portrait" style={styles.page}>
      <Header title="Material Requests Report" logoSrc={logoSrc} />
      <Footer />

      <View style={styles.summaryRow}>
        {[
          { label: "Total Requests", value: data.length },
          { label: "Pending", value: data.filter(d => d.status === "Pending").length },
          { label: "Approved", value: data.filter(d => d.status === "Approved").length },
          { label: "Total Value", value: fmt(totalCost) },
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
            <Text key={i} style={[styles.tableHeaderCell, { flex: [0.7, 1.2, 0.8, 2, 0.5, 0.5, 0.8, 0.9, 0.9, 0.8][i]! }]}>{h}</Text>
          ))}
        </View>
        {data.map((row, i) => (
          <View key={i} style={i % 2 === 0 ? styles.tableRowAlt : styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.7, color: "#2563eb", fontFamily: "Helvetica-Bold" }]}>{row.id}</Text>
            <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.requestedBy}</Text>
            <Text style={[styles.tableCell, { flex: 0.8, color: "#7c3aed" }]}>{row.workOrder}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.item}</Text>
            <Text style={[styles.tableCell, { flex: 0.5, fontFamily: "Helvetica-Bold" }]}>{row.qty}</Text>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>{row.unit}</Text>
            <View style={[styles.tableCell, { flex: 0.8 }]}><Badge label={row.status} /></View>
            <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.requestDate}</Text>
            <Text style={[styles.tableCell, { flex: 0.9 }]}>{row.requiredDate}</Text>
            <Text style={[styles.tableCell, { flex: 0.8, fontFamily: "Helvetica-Bold", textAlign: "right" }]}>{fmt(row.totalCost)}</Text>
          </View>
        ))}
      </View>

      <TotalsBlock rows={[
        { label: "Subtotal", value: fmt(totalCost) },
        { label: `Tax (${(taxRate * 100).toFixed(0)}%)`, value: fmt(tax) },
        { label: "Total", value: fmt(grandTotal) },
      ]} />
    </Page>
  );
};

// ── Root export ───────────────────────────────────────────────────────────────

export default function PDFReport({
  workOrders,
  assets,
  inventory,
  materialRequests,
  logoSrc = logo,
}: {
  workOrders: any[];
  assets: any[];
  inventory: any[];
  materialRequests: any[];
  logoSrc?: string;
}) {
  return (
    <Document title="Evantage CMMS Report" author="Evantage CMMS" creator="Evantage CMMS" pdfVersion='1.7'>
      <WorkOrdersSheet data={workOrders} logoSrc={logoSrc} user="Pawani" />
      <AssetsSheet data={assets} logoSrc={logoSrc} />
      <InventorySheet data={inventory} logoSrc={logoSrc} />
      <MaterialRequestsSheet data={materialRequests} logoSrc={logoSrc} />
    </Document>
  );
}