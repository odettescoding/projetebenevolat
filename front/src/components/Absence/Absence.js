import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './absence.css';
const Absence = () => {
    const [absences, setAbsences] = useState([]);
    const [selectedAbsence, setSelectedAbsence] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalSupprimerabscence,setShowModalSupprimerabscence]=useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [absencesPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:3001/absence')
            .then(res => setAbsences(res.data))
            .catch(err => console.log(err));
    }, []);

    // FUNCTION PERMETTANT D'OUVRIR LE MODAL LORSQU'ON CLICK SUR LE BOUTON voir//
    const handleOpenModal = (absence) => {
        setSelectedAbsence(absence);
        setShowModal(true);
    };

    // FUNCTION PERMETTANT D'OUVRIR LE MODAL LORSQU'ON CLICK SUR LE BOUTON supprimer//
    const handleOpenModalSupprimerAbscence = (absence) => {
        setSelectedAbsence(absence);
        setShowModalSupprimerabscence(true);
    };
     // FUNCTION PERMETTANT D'EXECUTER LA SUPPRESSION //
    const Supprimerabscence = () => {
        if (selectedAbsence) {
            axios.delete(`http://localhost:3001/deleteabscence/${selectedAbsence.id}`)
                .then(res => {
                    setAbsences(absences.filter(absence => absence.id !== selectedAbsence.id));
                    closemodalSupprimerabscence(); // Fermer le modal après la suppression
                })
                .catch(err => console.log(err));
        }
    };

    // FONCTION PERMATTANT DE FERMER LE MODAL
    const closeModal = () => {
        setShowModal(false);
    };

    // FONCTION PERMATTANT DE FERMER LE MODAL de suppression
    const closemodalSupprimerabscence = () => {
        setShowModalSupprimerabscence(false);
    };



    //FILTRE AVEC PAGINATION
    const indexOfLastAbsence = currentPage * absencesPerPage;
    const indexOfFirstAbsence = indexOfLastAbsence - absencesPerPage;
    const currentAbsences = absences.slice(indexOfFirstAbsence, indexOfLastAbsence);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredAbsences = currentAbsences.filter(absence =>
        absence.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className='contenuabscence'>
            <div>
                <h4 className='titrelistabsence'>Liste d'absence des employés</h4>
                <div>
                    <input 
                        className='inputrecherchelistabsence'
                        type="text"
                        placeholder="Rechercher par nom"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                </div>
            
            </div>
            
            {filteredAbsences.length !== 0 ? (
                <div className='contenulistabsenceemploye'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">EMPLOYE</th>
                                <th scope="col">NOM</th>
                                <th scope="col">DATE DE DEBUT</th>
                                <th scope="col">DATE DE FIN</th>
                                <th scope="col">DUREE</th>
                                <th scope="col">MOTIF D'ABSENCE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAbsences.map(absence => (
                                <tr key={absence.id} className="lignetableau">
                                    <td>
                                        <img src={absence.image} alt={absence.nom} style={{ width: '30px', height: '30px', borderRadius:'100px' }} />
                                    </td>
                                    <td>{absence.nom}</td>
                                    <td>{new Date(absence.datedebut).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{new Date(absence.datefin).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{absence.duree} heure</td>
                                    <td>{absence.motif}</td>
                                    <span className='contenubtnavoirabsenceetsuppimerabscence'>
                                        <td>
                                            <button className='btnvoirlistabsence' onClick={() => handleOpenModal(absence)}>Voir</button>
                                        </td>
                                        <td>
                                            <button className='btnsupprimerabsence' onClick={() => handleOpenModalSupprimerAbscence(absence)}>Supprimer</button>
                                        </td>
                                    </span>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            {Array.from({ length: Math.ceil(absences.length / absencesPerPage) }, (_, i) => (
                                <li key={i + 1} className='page-item'>
                                    <button onClick={() => paginate(i + 1)} className='page-link'>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            ) : (
                <h2 className='mt-3'>Aucun résultat trouvé</h2>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Informations absence</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'blanchedalmond' }}>
                    {selectedAbsence && (
                        <div>
                            <img src={selectedAbsence.image} alt={selectedAbsence.nom} style={{ width: '50px', height: '50px' }} />
                            <p><strong>Nom: </strong>{selectedAbsence.nom}</p>
                            <p><strong>Date de debut: </strong>{new Date(selectedAbsence.datedebut).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><strong>Date de fin: </strong>{new Date(selectedAbsence.datefin).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><strong>Durée: </strong>{selectedAbsence.duree} jours</p>
                            <p><strong>Motif: </strong>{selectedAbsence.motif}</p>
                        </div>
                    )}
                    <div style={{ textAlign: 'end' }}>
                        <button className='btn btn-secondary' onClick={() => closeModal()} style={{ color: 'white', backgroundColor: 'blue' }}>OK</button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal style={{ backgroundColor: 'grey' }} show={showModalSupprimerabscence} onHide={() => setShowModalSupprimerabscence(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Alert de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'blanchedalmond' }}>
                
                    {selectedAbsence && (
                        <div>
                            
                            <p><span style={{color:'red',fontSize:'20px',fontFamily:'cursive'}}>Ëtes vous sûr de supprimer l'abscence de: </span><strong>{selectedAbsence.nom}</strong> </p>                                                      
                        </div>
                    )}
                    <div style={{ textAlign: 'end' }}>
                        <button className='btn btn-secondary' onClick={() => Supprimerabscence()} style={{ color: 'white', backgroundColor: 'blue' }}>CONFIRMER</button>
                        <button className='btn btn-secondary' onClick={() => closemodalSupprimerabscence()} style={{ color: 'white', backgroundColor: 'grey' }}>Annuler</button>
                    
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Absence;
