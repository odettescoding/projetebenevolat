import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ajoutabsence.css';

const Ajoutabsence = () => {
    const { idemploye } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        dateDebut: "",
        heureDebut: "",
        dateFin: "",
        heureFin: "",
        duree: "",
        motif: "",
    });

    const [error, setError] = useState("");

    const calculateDuration = () => {
        const { dateDebut, heureDebut, dateFin, heureFin } = values;

        if (dateDebut && heureDebut && dateFin && heureFin) {
            const debut = new Date(dateDebut + "T" + heureDebut);
            const fin = new Date(dateFin + "T" + heureFin);
            const differenceMs = Math.abs(fin - debut); // Différence en millisecondes
            const duree = Math.floor(differenceMs / (1000 * 60 * 60)); // Durée en heures
            setValues({ ...values, duree: duree });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { dateDebut, heureDebut, dateFin, heureFin, duree, motif } = values;

        if (!dateDebut || !heureDebut || !dateFin || !heureFin || !duree || !motif) {
            setError("Veuillez remplir tous les champs.");
            toast.error('Erreur: Enregistrement échoué', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return;
        }

        axios.post('http://localhost:3001/ajoutabsence', { idemploye, ...values })
            .then(res => {
                toast.success('Enregistrement avec succès', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/absence');
            })
            .catch(err => {
                console.error('Erreur lors de l\'envoi du formulaire:', err);
                toast.error('Erreur lors de l\'envoi du formulaire', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    };

    return (
        <div className='formulaireajoutabsence'>
            <form className='contenu' onSubmit={handleSubmit}>
                <h4 className='titreformajoutabsence'> Formulaire d'absence {idemploye}</h4>

                <div className='contenudatedebutformajoutabsence'>
                    <label htmlFor="dateDebut">Date de déb :</label>
                    <input type="date" id="dateDebut" value={values.dateDebut} onChange={(e) => setValues({ ...values, dateDebut: e.target.value })} onBlur={calculateDuration} />
                    <label htmlFor="dateFin">Heure:</label>
                    <input type="time" value={values.heureDebut} onChange={(e) => setValues({ ...values, heureDebut: e.target.value })} onBlur={calculateDuration} />
                </div>

                <div className='contenudatefinformajoutabsence'>
                    
                    <label htmlFor="dateFin">Date de fin1 :</label>
                    <input type="date" id="dateFin" value={values.dateFin} onChange={(e) => setValues({ ...values, dateFin: e.target.value })} onBlur={calculateDuration} />
                    <label htmlFor="dateFin">Heure:</label>
                    <input type="time" value={values.heureFin} onChange={(e) => setValues({ ...values, heureFin: e.target.value })} onBlur={calculateDuration} />
                </div>

                <div className='contenudureformabsence'>
                    <label htmlFor="duree">Durée: </label>
                    <input type="number" className='inputdureeformabsence' min={0} name='duree' value={values.duree} onChange={(e) => setValues({ ...values, duree: e.target.value })} />
                </div>

                <div className='contenumotifformabsence'>
                    <label htmlFor="motif">Motif: </label>
                    <select className="form-control" onChange={(e) => setValues({ ...values, motif: e.target.value })}>
                        <option>Cliquer ici pour choisir le motif d'absence</option>
                        <option>Arrêt maladie</option>
                        <option>Absence à récupérer</option>
                        <option>Absence exceptionnelle</option>
                        <option>Congé de maternité</option>
                        <option>Récupération</option>
                    </select>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className='contenubtnabsenceform'>
                    
                    <button type="submit" className='btnsaveabsenceform' onClick={handleSubmit}>Enregistrer</button>
                    <button className='annulerbtnabsenceform'>
                        <Link  to="/absence" className='lienbtnannulerabsenceform'>
                            Annuler
                        </Link>
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Ajoutabsence;
