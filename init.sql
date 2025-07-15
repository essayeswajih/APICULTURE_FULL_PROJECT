-- init.sql
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'apiculture') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE apiculture');
    END IF;
END $$;

