import { OrderList } from '../src/models/order';

const order = new OrderList()

describe("Order Model", () => {
	it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  // it('create method should add an order', async () => {
  //   const result = await order.create({
  //     id: 1,
  //     product_id: 1,
  //     quantity: '9',
	// 		user_id: 1,
	// 		status: 'pending'
  //   });
  //   expect(result).toEqual({
  //     id: 1,
  //     product_id: 1,
  //     quantity: '9',
	// 		user_id: 1,
	// 		status: 'pending'
  //   });
  // });
});
