import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Ajoutemploye.css';

const Ajoutemploye = () => {
    const [values, setValues] = useState({
        matricule: "",
        nom: "",
        mail: "",
        cin: "",
        service: ""
    });
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifiez si tous les champs obligatoires sont remplis
        if (!values.matricule || !values.nom || !values.service || !values.cin || !image) {
            setError("Veuillez remplir tous les champs et sélectionner une image");
            toast.error('Erreur: enregistrement echoué', {
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

        // Créez un nouvel objet FormData
        const formData = new FormData();

        // Ajoutez les valeurs des champs du formulaire
        formData.append('matricule', values.matricule);
        formData.append('nom', values.nom);
        formData.append('mail', values.mail);
        formData.append('cin', values.cin);
        formData.append('service', values.service);

        // Ajoutez l'image sélectionnée
        formData.append('image', image);

        // Envoyez la requête POST avec FormData
        axios.post('http://localhost:3001/ajoutemploye', formData)
            .then(res => {
                // Si la requête est réussie, afficher une notification de succès et rediriger
                toast.success('Enregistrement avec succès', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/employe');
            })
            .catch(err => {
                console.error('Erreur lors de l\'envoi du formulaire:', err);
                toast.error('enregistrement echoué', {
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

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className='contenuajoutemploye'>
            <form className='container' onSubmit={handleSubmit}>
                <h4 className='titreformaddemploye'>Ajouter nouveau employé</h4>
                <div className='parag'>
                    <label htmlFor="matricule">NUM : </label>
                    <input type="text"  name='matricule' placeholder='entrer le matricule' onChange={(e) => setValues({ ...values, matricule: e.target.value })} />
                </div>

                <div className='parag'>
                    <label htmlFor="nom" className="form-label">NOM :</label>
                    <input type="text"  id='nom' name='nom' placeholder='entrer le nom' onChange={(e) => setValues({ ...values, nom: e.target.value })} />
                </div>

                <div className='parag'>
                    <label htmlFor="mail" className="form-label">MAIL :</label>
                    <input type="email"  id='mail' name='mail' placeholder='entrer le mail' onChange={(e) => setValues({ ...values, mail: e.target.value })} />
                </div>
                <div className='parag'>
                    <label htmlFor="cin" className="form-label">CIN :</label>
                    <input type="text"  id='cin' name='cin' placeholder='entrer le cin' onChange={(e) => setValues({ ...values, cin: e.target.value })} />
                </div>

                <div className='parag'>
                    <label htmlFor="service" className="form-label">SERVICE :</label>
                    <select className='selectinputajoutemploye' onChange={(e) => setValues({ ...values, service: e.target.value })}>
                        <option value="">Cliquer ici pour choisir le service</option>
                        <option value="Internat">Internat</option>
                        <option value="Cours">Cours</option>
                    </select>
                </div>

                <div className='inputfileajoutemploye'>
                    <input type="file"  onChange={handleImageChange} />
                </div>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className='contenubtnformajoutemploye'>
                    <button type="submit" className='savebtnformajutemploye'>Enregistrer</button>
                    <button className='annulerbtnformajoutemploye'><Link to="/employe" className='lienannulerbtnformajoutemploye'>Annuler</Link></button>
                    
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Ajoutemploye;
