CREATE TABLE Orders  (
	id SERIAL PRIMARY KEY, 
	product_id integer, 
	quantity integer, 
	user_id bigint REFERENCES users(id), 
	status VARCHAR(50)
);