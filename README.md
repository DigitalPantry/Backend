## Digital Pantry Backend

### Authors
Austin Christiansen

Jackson Rhea

Logan Ellsworth

## Setup Instructions:
- Setup port forwarding in VSCode via the Terminal -> PORTS -> Add Port (enter 8080) -> Authenticate -> Make address visibility public -> Use address in client
- Run the following commands
```bash
npm install
nodemon
```
- Instead of running 'nodemon', you can create a .vscode folder in the root, and create a tasks.json and a launch.json file as such...
```json
//launch.json file...
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        // Back-End
        {
            "name": "Server",
            "type": "node",
            "address": "127.0.0.1",
            "port": 8080,
            "request": "attach",
            "skipFiles": [
                "<node_internals>/**",
                "**/node_modules/**"
            ],
            "outFiles": [
                "${workspaceFolder}/**/*.js",
                "!**/node_modules/**"
            ],
            "preLaunchTask": "Server"
        }
    ],
}
//tasks.json file
{
    "tasks": [
        {
            "type": "npm",
            "script": "server",
            "problemMatcher": [],
            "label": "Server",
            "detail": "nodemon"
        }
    ]
}
```
- Once those are create, you should see a new Run and Debug option that says "Server". Click run.

### Development
