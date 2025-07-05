import { Product } from "../../../entities/product";

export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = Number(product.price); // asegura el tipo
    this.stock = product.stock;
    this.status = product.status;
  }
}
