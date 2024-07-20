 import express from 'express'
 import mysql from 'mysql'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import  path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {createCanvas,loadImage,Image} from 'canvas'
 const app = express()
 app.use(express.json())
 app.use(cors())
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// //----------------creation de la-------------------//
// //----------------connexion avec-------------------//
// //----------------- la base de données--------------//
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gest_conge",
    dateStrings:'date'
})

/*----------------------recuper laliste des employes ----------------------------*/
app.get('/employe', (req, res) => {
  const sql = "SELECT * FROM employe"; 
  db.query(sql, (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Erreur lors de la récupération des employés" });
      }
      res.json(data);
  });
});



// //----------------------FIN-------------------------//

app.post('/ajoutabsence', (req, res) => {
    const { idemploye, dateDebut, heureDebut, dateFin, heureFin, duree, motif } = req.body;
    const debut = `${dateDebut} ${heureDebut}`;
    const fin = `${dateFin} ${heureFin}`;
    console.log(idemploye, dateDebut, dateFin, duree, motif );

    // Effectuez la validation des données ici si nécessaire...

    // Insérez l'absence dans la base de données
    const sql = "INSERT INTO absence (idemploye, datedebut, datefin, duree, motif) VALUES (?, ?, ?, ?, ?)";
    const values = [idemploye, debut, fin, duree, motif];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout de l'absence :", err);
            return res.status(500).json({ error: "Erreur lors de l'ajout de l'absence" });
        }
        
        // Renvoyez une réponse indiquant que l'absence a été ajoutée avec succès
        res.status(200).json({ message: "Absence ajoutée avec succès" });
    });
});

// app.post('/ajoutabsence', (req, res) => {
//     const { idemploye, dateDebut, heureDebut, duree, motif } = req.body;
    
//     // Calcul de la date de fin en fonction de la date de début et de la durée
//     const moment = require('moment');

//     // Convertir la durée en jours
//     const dureeEnJours = parseInt(duree);

//     // Formater la date de début au format YYYY-MM-DD HH:mm:ss
//     const debutFormatted = moment(`${dateDebut} ${heureDebut}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');

//     // Calculer la date de fin en ajoutant la durée en jours à la date de début
//     const dateFinFormatted = moment(debutFormatted).add(dureeEnJours, 'days').format('YYYY-MM-DD HH:mm:ss');

//     // Insérez l'absence dans la base de données
//     const sql = "INSERT INTO absence (idemploye, datedebut, datefin, duree, motif) VALUES (?, ?, ?, ?, ?)";
//     const values = [idemploye, debutFormatted, dateFinFormatted, duree, motif];
    
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error("Erreur lors de l'ajout de l'absence :", err);
//             return res.status(500).json({ error: "Erreur lors de l'ajout de l'absence" });
//         }
        
//         // Renvoyez une réponse indiquant que l'absence a été ajoutée avec succès
//         res.status(200).json({ message: "Absence ajoutée avec succès" });
//     });
// });




//----------------recupere la liste des utilisateurs qui ont creer compte---------------//

//----------------------------Recupere tous les absences des employe--------------------------//
app.get('/absence', (req, res) => {
    
        //const sql = "SELECT reservation.*, voyageur.nom AS nom_voyageur, voyageur.email FROM reservation JOIN voyageur ON reservation.idvoyageur = voyageur.idvoyageur";
    const sql="SELECT absence.*,employe.image_url as image,employe.nom FROM absence JOIN employe ON absence.idemploye=employe.idemploye";
    //const sql = "SELECT * FROM absence";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des employe"});
        }
        res.json(data);
    });
});
//----------------------------------FIN------------------------------//

//------------------Filtre le format des images à enregistrer dans le dossier uploads---------------------------//
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Erreur: Seuls les fichiers images JPEG, JPG et PNG sont autorisés');
        }
    }
});
//---------------------------   FIN  ------------------------------//
app.post('/ajoutemploye', upload.single('image'), (req, res) => {
    // Vérifiez si req.file est null
    if (!req.file) {
        return res.status(400).json({ error: "Aucune image téléchargée" });
    }
    
    // Assurez-vous que toutes les données nécessaires sont présentes dans req.body
    if (!req.body.matricule || !req.body.nom || !req.body.service || !req.body.cin) {
        return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    }
    
    // Récupérez le chemin d'accès de l'image
    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    
    // Utilisez le chemin d'accès de l'image pour insérer l'employé dans la base de données
    const sql = "INSERT INTO employe (matricule, nom, mail, cin,service, image_url) VALUES (?, ?, ?, ?,?, ?)";
    const values = [
        req.body.matricule,
        req.body.nom,
        req.body.mail,
        req.body.cin,
        req.body.service,
        imageUrl
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'ajout de l'employé" });
        }
        return res.status(200).json({ message: "Employé ajouté avec succès", imageUrl: imageUrl });
    });
});
//-----------------------------   FIN  ---------------------------------//



// Route pour récupérer le détail des absences de chaque employé
app.get('/detail', (req, res) => {
    const sql = `
        SELECT 
            employe.idemploye,
            employe.nom,
            employe.image_url,
            SUM(CASE WHEN absence.motif = 'Arrêt maladie' THEN absence.duree ELSE 0 END) AS total_arret_maladie,
            SUM(CASE WHEN absence.motif = 'Absence à récupérer' THEN absence.duree ELSE 0 END) AS total_absence_recuperer,
            SUM(CASE WHEN absence.motif = 'Absence exceptionnelle' THEN absence.duree ELSE 0 END) AS total_absence_exceptionnelle,
            SUM(CASE WHEN absence.motif = 'Congé de maternité' THEN absence.duree ELSE 0 END) AS total_conge_maternite,
            SUM(CASE WHEN absence.motif = 'Récupération' THEN absence.duree ELSE 0 END) AS total_recuperation
        FROM 
            employe
        LEFT JOIN
            absence ON employe.idemploye = absence.idemploye
        GROUP BY 
            employe.idemploye, employe.nom;
    `;
  
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des détails des absences des employés" });
        }
        res.json(data);
    });
});




//-------------------port d'ecoute-------------//
app.listen(
    3001,'0.0.0.0',()=>{
    console.log("app is running !")
})