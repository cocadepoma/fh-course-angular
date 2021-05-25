import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
/* import * as express from "express";
import * as cors from "cors"; */

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        "https://firestore-grafica-37820-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.json({
        mensaje: "holass",
    });
});

// Función GET async para obtener todos los juegos
export const getGOTY = functions.https.onRequest(async (request, response) => {
    // const nombre = request.query.nombre || "Sin nombre";
    // response.json({
    //     nombre,
    // });

    const gotyRef = db.collection("goty");
    const docSnap = await gotyRef.get();
    const juegos = docSnap.docs.map((doc) => doc.data());

    response.json(juegos);
});

/* // ###############Express############### //

// Iniciar express
const app = express();

// Permitir peticion de cualquier otro dominio
app.use(cors({ origin: true }));

// Función GET async para obtener todos los juegos
app.get("/goty", async (req, res) => {
    const gotyRef = db.collection("goty");
    const docSnap = await gotyRef.get();
    const juegos = docSnap.docs.map((doc) => doc.data());

    res.status(404).json(juegos);
});

// Función POST async para votar por un juego
app.post("/goty/:id", async (req, res) => {
    const id = req.params.id;
    const gameRef = db.collection("goty").doc(id);
    const gameSnap = await gameRef.get();

    if (!gameSnap.exists) {
        res.status(404).json({
            ok: false,
            mensaje: "No existe un juego con ese ID" + id,
        });
    } else {
        const antes = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: antes.votos + 1,
        });

        res.json({
            ok: true,
            mensaje: `Gracias por tu voto a ${antes.name}`,
        });
    }
});

// Exportar a firebase functions
export const api = functions.https.onRequest(app);
 */
