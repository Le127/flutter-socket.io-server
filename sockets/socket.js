const {io} = require('../index.js');

// Mensajes de Sockets(clientes)  client.on => escucha ,  client.emit => emite
io.on('connection', client => {
    console.log("Client connected.");
    client.on('disconnect', () => {
        console.log("Client disconnected.");
    });


    client.on("mensaje", (payload) => {
        console.log("Mensaje!", payload);

        io.emit("mensaje", { admin: "Nuevo mensaje" });
    });

});
