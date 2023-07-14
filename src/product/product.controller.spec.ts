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
      ];

      jest.spyOn(service, 'findAll').mockReturnValue(products);

      expect(controller.findAll()).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a specific product', () => {
      const product: Product = { id: 1, name: 'Nike Air Max', description: 'Zapatillas deportivas' };

      jest.spyOn(service, 'findOne').mockReturnValue(product);

      expect(controller.findOne('1')).toEqual(product);
    });
    it('should return null', ()=> {
      jest.spyOn(service, 'findOne').mockReturnValue(null);

      expect(controller.findOne('1')).toEqual(null);
    });
  });

  describe('create', () => {
    it('should create and return a new product', () => {
      const createProductDto: CreateProductDto = { name: 'Nike Air Max', description: 'Zapatillas deportivas' };
      const newProduct: Product = { id: 1, ...createProductDto };

      jest.spyOn(service, 'create').mockReturnValue(newProduct);

      expect(controller.create(createProductDto)).toEqual(newProduct);
    });
  });

  describe('update', () => {
    it('should update and return the updated product', () => {
      const updateProductDto: UpdateProductDto = { name: 'Nike Air Max Plus' };
      const updatedProduct: Product = { id: 1, name: 'Nike Air Max Plus', description: 'Zapatillas deportivas' };

      jest.spyOn(service, 'update').mockReturnValue(updatedProduct);

      expect(controller.update('1', updateProductDto)).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove and return the deleted product', () => {
      const deletedProduct: Product = { id: 1, name: 'Nike Air Max', description: 'Zapatillas deportivas' };

      jest.spyOn(service, 'remove').mockReturnValue(deletedProduct);

      expect(controller.remove('1')).toEqual(deletedProduct);
    });
  });
});
