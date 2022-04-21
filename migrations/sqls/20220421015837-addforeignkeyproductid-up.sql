ALTER TABLE orders
    ADD CONSTRAINT fk_orders_product FOREIGN KEY (product_id) REFERENCES product (id);