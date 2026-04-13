import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface OrderItem {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Order {
  id: string; // Internal Order ID (e.g., O20240412-1234)
  buyOrder: string; // Order ID sent to Transbank (must be unique)
  sessionId: string;
  fecha: string;
  nombre: string;
  empresa?: string;
  rutEmpresa?: string;
  email: string;
  telefono: string;
  direccion: string;
  comuna: string;
  region: string;
  total: number;
  items: OrderItem[];
  estado: "inicializada" | "autorizada" | "anulada" | "fallida";
  token?: string; // Transbank Token
  paymentData?: any; // Full response from Transbank commit
}

const DATA_PATH = join(process.cwd(), "data", "orders.json");

export function getOrders(): Order[] {
  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function getOrderByBuyOrder(buyOrder: string): Order | undefined {
  return getOrders().find((o) => o.buyOrder === buyOrder);
}

export function saveOrder(order: Omit<Order, "id" | "fecha" | "estado" | "buyOrder">): Order {
  const orders = getOrders();
  const idNum = Date.now();
  const id = `H${idNum}`;
  
  const newOrder: Order = {
    ...order,
    id,
    buyOrder: `TBK${idNum}`,
    fecha: new Date().toISOString(),
    estado: "inicializada",
  };
  
  orders.unshift(newOrder);
  writeFileSync(DATA_PATH, JSON.stringify(orders, null, 2), "utf-8");
  return newOrder;
}

export function updateOrder(id: string, updates: Partial<Order>): boolean {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return false;
  
  orders[idx] = { ...orders[idx], ...updates };
  writeFileSync(DATA_PATH, JSON.stringify(orders, null, 2), "utf-8");
  return true;
}
