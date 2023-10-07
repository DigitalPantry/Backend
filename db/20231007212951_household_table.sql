-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS household (
  id SERIAL PRIMARY KEY,
  name TEXT
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if EXISTS household;
-- +goose StatementEnd
