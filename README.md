## Digital Pantry Backend

### Authors
Austin Christiansen

Jackson Rhea

Logan Ellsworth

## Setup Instructions:
- Requires Docker and Docker-Compose
- To run the app backend and database, run the following command: 
```bash
make run-dev
```

Database migrations should automatically be completed when using this command.

### Development

To create a new database migration, run the following command (the app docker container must be running): 
```bash
make new-migration name=<migration_name>
```
Once this is done, a new sql file will be created in the db folder. Add the sql commands to this file and then run the following command to apply the migration: 
```bash
make migrate
```
or 
```bash
make run-dev
```