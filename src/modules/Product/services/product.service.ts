import { AppDataSource } from "../../../config/data-source";
import { Repository } from "typeorm";
import { Product } from "../../../entities/product";
import { CreateProductDto } from "../DTO/createProductDTO";
import { UpdateProductDto } from "../DTO/updateProductDTO";
import { FindProductCriteriaDto } from "../DTO/findProductCriteriaDTO";
import bcrypt from "bcrypt";
import { AppError, errorHandler } from "../../../middlewares/error.middleware";

export class ProductService {
  private productRepo: Repository<Product>;

  constructor() {
    this.productRepo = AppDataSource.getRepository(Product);
  }

  // Buscar producto por id o nombre
  async findProduct(criteria: FindProductCriteriaDto): Promise<Product | null> {
    const product = await this.productRepo.findOneBy(criteria);
    if (!product) {
      throw new AppError("Product does not exists.", 404);
    }
    return product;
  }

  // Obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find();
  }

  // Crear un nuevo producto
  async createProduct(dto: CreateProductDto): Promise<Product> {
    const existing = await this.productRepo.findOneBy({ name: dto.name });
    if (existing) {
      throw new AppError("Product with this name already exists.", 409);
    }

    if (dto.description === "") {
      throw new AppError("Description can not be empty.", 400);
    }

    if (dto.stock < 0) {
      throw new AppError("Stock must be more than 0.", 400);
    }

    if (dto.price < 0) {
      throw new AppError("Price must be more than 0.", 400);
    }

    const product = this.productRepo.create({
      name: dto.name,
      description: dto.description,
      stock: dto.stock,
      price: dto.price,
    });

    return this.productRepo.save(product);
  }

  // para actualizar un producto
  async UpdateProduct(
    Id: number,
    dto: Partial<UpdateProductDto>
  ): Promise<Product> {
    const existing = await this.productRepo.findOneBy({ id: Id });

    if (!existing) {
      throw new AppError("Product not found.", 404);
    }

    // Validaciones específicas
    if (dto.name !== undefined) {
      if (dto.name.trim() === "") {
        throw new AppError("Name cannot be empty.", 400);
      }

      const duplicate = await this.productRepo.findOne({
        where: { name: dto.name },
      });

      if (duplicate && duplicate.id !== Id) {
        throw new AppError("Product with this name already exists.", 409);
      }
    }

    if (dto.description !== undefined && dto.description.trim() === "") {
      throw new AppError("Description cannot be empty.", 400);
    }

    if (dto.stock !== undefined && dto.stock < 0) {
      throw new AppError("Stock must be greater than or equal to 0.", 400);
    }

    if (dto.price !== undefined && dto.price < 0) {
      throw new AppError("Price must be greater than or equal to 0.", 400);
    }

    // Aplicar cambios al objeto existente
    Object.assign(existing, dto);

    return this.productRepo.save(existing);
  }
}
