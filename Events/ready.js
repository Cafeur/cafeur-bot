module.exports = async(client) => {

    client.user.setPresence({
        game: {
            name: "Construire le Serveur"
        }
    })
};