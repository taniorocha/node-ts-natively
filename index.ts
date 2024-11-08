
// *****
// **

// Testing new released node version 22.11.0 witch came with typescript natively \o/

// **
// *****


import { createServer } from 'node:http';

interface Result<T> {
    status: number;
    data: T;
}

// TypeScript enum is not supported in strip-only mode
// enum UserType {
//     Admin = 1,
//     Default = 2
// }

interface User {
    name: string;
    password: string;
    // type: UserType // TypeScript enum is not supported in strip-only mode
}

function setResult<T>(data: T): Result<T> {
    return {
        status: 200,
        data: data
    } as Result<T>;
}

function getUser(): User[] {
    const user: User = {
        name: "Juremildo",
        password: "123",
        // type: UserType.Admin // TypeScript enum is not supported in strip-only mode
    };
    return [user];
}

const server = createServer(async (req: any, res: any) => {
    try {
        console.log(req.url);
        var teste: string;
        teste = `Api request gotten at: ${new Date().toJSON()}`;
        console.log(teste);

        if(req.url === "/user" && req.method === "GET") return getUserData(req, res);
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(`{"status": 404,"error": "Route not found" }`);
        }
    } catch (ex) {
        console.log(ex);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(`{"status": 500,"stack_trace": "${ex}" }`);
    }
});

function getUserData(req: any, res: any) {
    var users = getUser();
    // users[2].name = '1'; // force exception

    res.writeHead(200, { 'Content-Type': 'application/json' });
    const result = setResult(users);
    res.end(JSON.stringify(result));
}

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});