import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const products: Product[] = [
        { id: 1, name: 'Nike Air Max', description: 'Zapatillas deportivas' },
        { id: 2, name: 'Nike Air Force 1', description: 'Zapatillas clásicas' },
        { id: 3, name: 'Nike Revolution 5', description: 'Zapatillas de running' }
      ];
      expect(service.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a specific product', () => {
      const product: Product = {
        id: 4,
        name: 'Nike Air Max',
        description: 'Zapatillas deportivas',
      };
      service.create(product)
      expect(service.findOne(4)).toEqual(product);
    });
    it('should return undefined', () => {
      expect(service.findOne(4)).toEqual(undefined);
    });
  });

  describe('create', () => {
    const createProductDto: CreateProductDto = {
      name: 'Nike Air Max',
      description: 'Zapatillas deportivas',
    };
    const newProduct: Product = { id: 4, ...createProductDto };
    it('should create and return a new product', () => {
      expect(service.create(createProductDto)).toEqual(newProduct);
    });
    it('should add a new product to the array', () => {
      const oldLenght = service.findAll.length;
      service.create(newProduct);
      const afterLenght = service.findAll.length;
      expect(oldLenght < afterLenght);
    });
  });

  describe('update', () => {
    it('should update and return the updated product name', () => {
      const outdatedProduct: Product = {
        id: 4,
        name: 'Topper',
        description: 'Zapatillas deportivas',
      };
      service.create(outdatedProduct)
      const updateProductDto: UpdateProductDto = { name: 'Nike Air Max Plus' };
      const updatedProduct: Product = {
        id: 4,
        name: 'Nike Air Max Plus',
        description: 'Zapatillas deportivas',
      };
      expect(service.update(4, updateProductDto)).toEqual(updatedProduct);
    });
    it('should update and return the updated product description', () => {
        const outdatedProduct: Product = {
          id: 4,
          name: 'Topper',
          description: 'Zapatillas deportivas',
        };
        service.create(outdatedProduct)
        const updateProductDto: UpdateProductDto = { description: 'Epicas' };
        const updatedProduct: Product = {
          id: 4,
          name: 'Topper',
          description: 'Epicas',
        };
        expect(service.update(4, updateProductDto)).toEqual(updatedProduct);
      });
      it('should try update and return null', () => {
        const updateProductDto: UpdateProductDto = { description: 'Epicas' };

        expect(service.update(4, updateProductDto)).toEqual(null);
      });
  });

  describe('remove', () => {
    it('should remove and return the deleted product', () => {
      const deletedProduct: Product = {
        id: 1,
        name: 'Nike Air Max',
        description: 'Zapatillas deportivas',
      };
      service.create(deletedProduct)
      expect(service.remove(1)).toEqual(deletedProduct);
    });
    it('should try remove and return null', () => {
        
        expect(service.remove(4)).toEqual(null);
      });
  });

  
});
