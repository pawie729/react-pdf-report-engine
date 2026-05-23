export const workOrders = [
  { id: "WO-001", title: "HVAC Unit Maintenance", asset: "HVAC-Floor3", priority: "High", status: "In Progress", assignee: "Ali Hassan", due: "2026-05-28", cost: 1200 },
  { id: "WO-002", title: "Generator Inspection", asset: "GEN-MainBlock", priority: "Critical", status: "Open", assignee: "Priya Nair", due: "2026-05-24", cost: 850 },
  { id: "WO-003", title: "Conveyor Belt Repair", asset: "CONV-LineA", priority: "Medium", status: "Completed", assignee: "Kamal Silva", due: "2026-05-20", cost: 3400 },
  { id: "WO-004", title: "Elevator Certification", asset: "ELEV-Tower1", priority: "High", status: "In Progress", assignee: "Mei Ling", due: "2026-06-01", cost: 2100 },
  { id: "WO-005", title: "Fire Suppression Check", asset: "FIRE-Zone2", priority: "Critical", status: "Open", assignee: "Ali Hassan", due: "2026-05-25", cost: 960 },
  { id: "WO-006", title: "Pump Station Overhaul", asset: "PUMP-Station4", priority: "Low", status: "On Hold", assignee: "Priya Nair", due: "2026-06-10", cost: 5200 },
  { id: "WO-007", title: "Lighting Retrofit", asset: "LIGHT-Warehouse", priority: "Low", status: "Completed", assignee: "Kamal Silva", due: "2026-05-15", cost: 760 },
  { id: "WO-008", title: "Boiler Pressure Test", asset: "BOIL-PlantB", priority: "High", status: "Open", assignee: "Mei Ling", due: "2026-05-29", cost: 1450 },
];

export const assets = [
  { id: "AST-001", name: "HVAC Unit Floor 3", category: "Mechanical", location: "Building A, Floor 3", status: "Active", lastService: "2026-03-10", nextService: "2026-06-10", value: 48000 },
  { id: "AST-002", name: "Main Generator", category: "Electrical", location: "Main Block, Basement", status: "Under Maintenance", lastService: "2026-01-20", nextService: "2026-05-24", value: 125000 },
  { id: "AST-003", name: "Conveyor Line A", category: "Production", location: "Factory Floor", status: "Active", lastService: "2026-05-20", nextService: "2026-08-20", value: 95000 },
  { id: "AST-004", name: "Tower 1 Elevator", category: "Vertical Transport", location: "Tower 1", status: "Active", lastService: "2025-12-05", nextService: "2026-06-01", value: 210000 },
  { id: "AST-005", name: "Fire Suppression Zone 2", category: "Safety", location: "Warehouse Zone 2", status: "Active", lastService: "2025-11-15", nextService: "2026-05-25", value: 32000 },
  { id: "AST-006", name: "Pump Station 4", category: "Plumbing", location: "Utility Block", status: "On Hold", lastService: "2025-10-01", nextService: "2026-06-10", value: 67000 },
];

export const inventory = [
  { id: "INV-001", name: "HVAC Filter 20x20", category: "Filters", stock: 48, reorderLevel: 20, unit: "pcs", location: "Store A", unitCost: 12.5, supplier: "CoolAir Co." },
  { id: "INV-002", name: "Generator Oil 15W-40", category: "Lubricants", stock: 8, reorderLevel: 10, unit: "litres", location: "Store B", unitCost: 45.0, supplier: "LubeMax" },
  { id: "INV-003", name: "Conveyor Belt 80mm", category: "Belts & Chains", stock: 3, reorderLevel: 5, unit: "rolls", location: "Store C", unitCost: 320.0, supplier: "BeltPro" },
  { id: "INV-004", name: "Circuit Breaker 40A", category: "Electrical", stock: 22, reorderLevel: 8, unit: "pcs", location: "Store A", unitCost: 85.0, supplier: "ElecDist" },
  { id: "INV-005", name: "Pump Seal Kit", category: "Seals & Gaskets", stock: 6, reorderLevel: 10, unit: "sets", location: "Store B", unitCost: 140.0, supplier: "FluidSeal" },
  { id: "INV-006", name: "LED Tube 40W", category: "Lighting", stock: 120, reorderLevel: 30, unit: "pcs", location: "Store A", unitCost: 8.75, supplier: "BrightLite" },
  { id: "INV-007", name: "Safety Valve 1/2\"", category: "Valves", stock: 14, reorderLevel: 8, unit: "pcs", location: "Store C", unitCost: 95.0, supplier: "ValveTech" },
];

export const materialRequests = [
  { id: "MR-001", requestedBy: "Ali Hassan", workOrder: "WO-001", item: "HVAC Filter 20x20", qty: 4, unit: "pcs", status: "Approved", requestDate: "2026-05-22", requiredDate: "2026-05-27", totalCost: 50 },
  { id: "MR-002", requestedBy: "Priya Nair", workOrder: "WO-002", item: "Generator Oil 15W-40", qty: 20, unit: "litres", status: "Pending", requestDate: "2026-05-23", requiredDate: "2026-05-24", totalCost: 900 },
  { id: "MR-003", requestedBy: "Kamal Silva", workOrder: "WO-003", item: "Conveyor Belt 80mm", qty: 2, unit: "rolls", status: "Issued", requestDate: "2026-05-18", requiredDate: "2026-05-20", totalCost: 640 },
  { id: "MR-004", requestedBy: "Mei Ling", workOrder: "WO-004", item: "Circuit Breaker 40A", qty: 3, unit: "pcs", status: "Pending", requestDate: "2026-05-23", requiredDate: "2026-05-30", totalCost: 255 },
  { id: "MR-005", requestedBy: "Ali Hassan", workOrder: "WO-005", item: "Safety Valve 1/2\"", qty: 2, unit: "pcs", status: "Approved", requestDate: "2026-05-22", requiredDate: "2026-05-25", totalCost: 190 },
  { id: "MR-006", requestedBy: "Priya Nair", workOrder: "WO-006", item: "Pump Seal Kit", qty: 5, unit: "sets", status: "Rejected", requestDate: "2026-05-20", requiredDate: "2026-06-08", totalCost: 700 },
];
