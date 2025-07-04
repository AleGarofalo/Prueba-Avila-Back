import { Request, Response, NextFunction } from "express";
import { ProductService } from "./services/product.service";
import { CreateProductDto } from "./DTO/createProductDTO";
import { UpdateProductDto } from "./DTO/updateProductDTO";
import { FindProductCriteriaDto } from "./DTO/findProductCriteriaDTO";
import logger from "../../utils/logger";
import { AppError } from "../../middlewares/error.middleware";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Crear producto
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateProductDto = req.body;
      const product = await this.productService.createProduct(dto);
      logger.info(`Product created: ${product.name}`);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  // Obtener todos los productos
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productService.getAllProducts();
      logger.info(`Retrieved ${products.length} products`);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  // Obtener producto por ID
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const criteria: FindProductCriteriaDto = {
        id: parseInt(req.params.id),
      };

      const product = await this.productService.findProduct(criteria);
      if (!product) {
        throw new AppError("Product not found", 404);
      }

      logger.info(`Product retrieved: ID ${product.id}`);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  // Actualizar producto
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const dto: Partial<UpdateProductDto> = req.body;

      const updatedProduct = await this.productService.UpdateProduct(id, dto);
      logger.info(`Product updated: ID ${id}`);
      res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }
}
