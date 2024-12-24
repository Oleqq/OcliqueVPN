-- /server/db/schema.sql
CREATE TABLE vpn_credentials (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  vpn_key VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  vpn_key VARCHAR(100) NOT NULL,
  subscription_start DATE NOT NULL,
  subscription_duration INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
