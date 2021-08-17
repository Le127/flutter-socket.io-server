const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');



const bands = new Bands();

bands.addBand(new Band("Hermetica"));
bands.addBand(new Band("Pedro Aznar"));
bands.addBand(new Band("Bob Marley"));
bands.addBand(new Band("Carlos Aguirre"));



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



    client.emit("active-bands", bands.getBands());

    client.on("vote-band", (payload) => {

        bands.voteBand(payload.id)
        // io es el server y todos los clientes conectados estan ahí.
        // se emite un mensaje a todos los clientes con los ultimos cambios
        io.emit("active-bands", bands.getBands());

    });

    client.on("add-band", (payload) => {
        //La banda necesita solo un name
        bands.addBand(new Band(payload.name));
        io.emit("active-bands", bands.getBands());
    });

    client.on("delete-band", (payload) => {
        //La banda necesita solo un name
        bands.deleteBand(payload.id);
        io.emit("active-bands", bands.getBands());
    });


});




/*  client.on("emitir-mensaje", (payload) => {

     // io.emit("nuevo-mensaje", payload);  //emite a todos los clientes
     client.broadcast.emit("nuevo-mensaje", payload); //emite a todos los clientes menos al que lo emitió
 }); */