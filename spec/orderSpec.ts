import { OrderList } from '../src/models/order';

const order = new OrderList()

describe("Order Model", () => {
  it('should have an show method', () => {
    expect(order.show).toBeDefined();
  });
});
