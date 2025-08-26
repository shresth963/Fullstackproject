-- Initialize the fullstack_app database
-- This script runs when the PostgreSQL container starts for the first time

-- Create the messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial message
INSERT INTO messages (message) VALUES ('Hello from backend database!') 
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Grant permissions
GRANT ALL PRIVILEGES ON TABLE messages TO postgres;
GRANT USAGE, SELECT ON SEQUENCE messages_id_seq TO postgres;
