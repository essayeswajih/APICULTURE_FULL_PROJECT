DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'apiculturefromtn') THEN
        CREATE DATABASE apiculturefromtn;
    END IF;
END $$;
