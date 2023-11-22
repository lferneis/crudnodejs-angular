export interface Category {
  id?: number;
  nombre: string;
  descripcion: string;
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoriaId: number;
    Categorium?: Category;
}
