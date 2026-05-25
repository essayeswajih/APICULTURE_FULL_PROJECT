ALTER TABLE products
    ADD COLUMN IF NOT EXISTS vip_price DOUBLE PRECISION;

ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS vip_code VARCHAR;

CREATE TABLE IF NOT EXISTS vip_cards (
    id SERIAL PRIMARY KEY,
    customer_key VARCHAR NOT NULL UNIQUE,
    customer_name VARCHAR NOT NULL,
    email VARCHAR,
    telephone VARCHAR,
    code VARCHAR NOT NULL UNIQUE,
    approved BOOLEAN NOT NULL DEFAULT TRUE,
    issued_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_vip_cards_id ON vip_cards (id);
CREATE INDEX IF NOT EXISTS ix_vip_cards_code ON vip_cards (code);
CREATE INDEX IF NOT EXISTS ix_vip_cards_customer_key ON vip_cards (customer_key);
