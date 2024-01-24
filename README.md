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
- API hosted on localhost:8080 (http://localhost:8080/api/)

### Development

#### Migrations
To create a new database migration, stop the server and run the following command: 
```bash
npm run add-migration
```
Once this is done, a new sql file will be created in the db folder. Rename the file to your liking.
Add the sql commands to the file and run the server after changes are complete. The migration will be migrated when the server boots.

Troubleshooting:
- If a migration is not working, view the kysely_migration table and delete the entry cooresponding to your file. Restart the server.
- It that doesn't work, delete the docker containers and volumes for the database and run `docker-compose up -d` again. WARNING: This results in data loss and resets the DB to a new state.

#### Port Forwarding
To use this backend in conjunction with the frontend, you will need to port forward localhost:8080 to a public port. This can be done in the "ports" tab of VSCode (in the terminal window). 
- Click "Forward a Port"
- Enter 8080 for the port
- Click Enter
- A Forwarded Address will appear. Right click on it and make it public.
- Use this address as the base url for the frontend. (Dont forget the /api/ at the end!)