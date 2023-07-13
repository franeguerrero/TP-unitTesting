import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private idCounter: number = 1;

  constructor() {
    this.create({ name: 'Nike Air Max', description: 'Zapatillas deportivas' });
    this.create({ name: 'Nike Air Force 1', description: 'Zapatillas clásicas' });
    this.create({ name: 'Nike Revolution 5', description: 'Zapatillas de running' });
  }

  create(createProductDto: CreateProductDto): Product {
    const { name, description } = createProductDto;
    const newProduct: Product = {
      id: this.generateId(),
      name,
      description,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (product) {
      if (updateProductDto.name) {
        product.name = updateProductDto.name;
      }
      if (updateProductDto.description) {
        product.description = updateProductDto.description;
      }
      return product;
    }
    return null;
  }

  remove(id: number): Product {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      return deletedProduct;
    }
    return null;
  }

  private generateId(): number {
    const newId = this.idCounter;
    this.idCounter++;
    return newId;
  }
}
