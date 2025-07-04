import { ProductStatus } from "../../../types/productStatus";

export class UpdateProductDto {
  name?: string = "";
  description?: string = "";
  price?: number = 0;
  stock?: number = 0;
  status?: ProductStatus = ProductStatus.ACTIVE;
}
