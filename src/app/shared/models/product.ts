export interface Product {
  id?: string;
  sku: string;
  nombre: string;
  descripcion?: string;
  costo: number;
  stockMin?: number; // para futuras alertas
}
