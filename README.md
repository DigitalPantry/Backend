## Digital Pantry Backend

### Authors
Austin Christiansen

Jackson Rhea

Logan Ellsworth

## Setup Instructions:
- First install dependecies
```bash
npm install
```
- Download and install Docker
- Run the following command to setup local DB
```bash
docker-compose up -d
```
- To start the project run the following command
```bash
npm run dev
```
- To access local DB/pgAdmin, visit localhost:5050.
- Email: admin@admin.com; Password: digit@lpantry!
- Server(s) -> Local Pantry -> Password: p@ntry!
- Data located Local Pantry -> Databases (2) -> local_pantry -> Schemas (1) -> public -> Tables
- API hosted on localhost:8080 (http://localhost:8080/api/createUser)

### Development

To create a new database migration, stop the server and run the following command: 
```bash
npm run new-migration
```
Once this is done, a new sql file will be created in the db folder. Rename the file to your liking.
Add commands and run the server after changes are complete. The migration will be migrated when the server boots.

Troubleshooting:
- If a migration is not working, view the kysely_migration table and delete the entry cooresponding to your file. Restart the server.