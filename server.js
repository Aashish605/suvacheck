const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        return handle(req, res);
    });

    const io = new Server(server, {
        cors: {
            origin: true,
            methods: ['GET', 'POST']
        }
    });

    // expose the io instance globally so API routes can emit events
    global.io = io;

    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
