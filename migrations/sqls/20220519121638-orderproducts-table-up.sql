CREATE TABLE order_products  (
	id SERIAL PRIMARY KEY, 
	order_id bigint REFERENCES orders(id), 
	product_id bigint REFERENCES product(id), 
	quantity integer
);