import { ProductStore } from '../models/product';

const store = new ProductStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      id: 1,
      name: 'Crockpot',
      price: '39.00'
    });
    expect(result).toEqual({
      id: 1,
      name: 'Crockpot',
      price: '39.00',
    });
  });
});
