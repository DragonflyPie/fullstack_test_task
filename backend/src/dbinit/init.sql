CREATE DATABASE IF NOT EXISTS productsdb;
USE productsdb;
DROP TABLE IF EXISTS products;

CREATE TABLE products
(
	id 			BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    shopify_id 	VARCHAR(255) DEFAULT NULL,
	description TEXT DEFAULT NULL,
	image_url 	VARCHAR(255) DEFAULT NULL,
	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
)