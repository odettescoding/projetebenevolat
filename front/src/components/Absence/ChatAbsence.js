import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Absence = () => {
    const [absences, setAbsences] = useState([]);
    const [selectedAbsence, setSelectedAbsence] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/absence')
            .then(res => setAbsences(res.data))
            .catch(err => console.log(err))
    }, []);

    const handleOpenModal = (absence) => {
        setSelectedAbsence(absence);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {absences.length !== 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Employe</th>
                            <th scope="col">Date de début</th>
                            <th scope="col">Date de fin</th>
                            <th scope="col">Durée</th>
                            <th scope="col">Motif</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            absences.map(absence =>
                                <tr key={absence.idemploye}>
                                    <td>{absence.idemploye}</td>
                                    <td>{new Date(absence.datedebut).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{new Date(absence.datefin).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{absence.duree}</td>
                                    <td>{absence.motif}</td>
                                    <td><button className='btn btn-primary'>Demander</button></td>
                                    <td><button className='btn btn-secondary' onClick={() => handleOpenModal(absence)}>Voir</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                : <h2 className='mt-3'>Pas d'enregistrements !</h2>}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Informations absence</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'white' }} >
                    {selectedAbsence && (
                        <div>
                            <p><strong>Nom: </strong>{selectedAbsence.idemploye}</p>
                            <p><strong>Matricule: </strong>{selectedAbsence.datedebut}</p>
                            <p><strong>Mail: </strong>{selectedAbsence.datefin}</p>
                            <p><strong>CIN: </strong>{selectedAbsence.duree}</p>
                        </div>
                    )}
                    <div style={{ textAlign: 'end' }}>
                        <button className='btn btn-secondary' onClick={closeModal} style={{ color: 'white', backgroundColor: 'blue' }}>OK</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Absence;
