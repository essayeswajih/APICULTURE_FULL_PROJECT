ALTER TABLE products
    ADD COLUMN IF NOT EXISTS vip_price DOUBLE PRECISION;

ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS vip_code VARCHAR;

ALTER TABLE order_items
    ADD COLUMN IF NOT EXISTS public_price DOUBLE PRECISION;

ALTER TABLE order_items
    ADD COLUMN IF NOT EXISTS vip_applied BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TYPE orderstatus ADD VALUE IF NOT EXISTS 'CANCELLED';
ALTER TYPE orderstatus ADD VALUE IF NOT EXISTS 'CHANGE_REQUESTED';
ALTER TYPE orderstatus ADD VALUE IF NOT EXISTS 'BACK';

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
CREATE UNIQUE INDEX IF NOT EXISTS ix_vip_cards_code ON vip_cards (code);
CREATE UNIQUE INDEX IF NOT EXISTS ix_vip_cards_customer_key ON vip_cards (customer_key);

CREATE OR REPLACE FUNCTION prevent_vip_card_code_change()
RETURNS trigger AS $$
BEGIN
    IF OLD.code IS NOT NULL AND NEW.code IS DISTINCT FROM OLD.code THEN
        RAISE EXCEPTION 'VIP card code cannot be changed after it is generated.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_vip_card_code_change ON vip_cards;
CREATE TRIGGER trg_prevent_vip_card_code_change
BEFORE UPDATE OF code ON vip_cards
FOR EACH ROW
EXECUTE FUNCTION prevent_vip_card_code_change();
