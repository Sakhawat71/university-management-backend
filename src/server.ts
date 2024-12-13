import mongoose from 'mongoose'
import app from "./app";
import config from './app/config';
import { Server } from 'http'

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.db_url as string);
        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error);
    }

}

main();

process.on('unhandledRejection', (reason, promise) => {
    console.error('😒 Unhandled Rejection:', reason, promise);
    // console.log(' Unhandled Rejection:');
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});

process.on('uncaughtException', ()=> {
    console.log('😢 uncaught Exception');
    process.exit(1);
})