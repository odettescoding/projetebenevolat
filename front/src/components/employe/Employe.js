import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './employe.css'
const Employe = () => {
    const [employes, setEmployes] = useState([]);
    const [selectedEmploye, setSelectedEmploye] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // État pour stocker le terme de recherche

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(5); // Nombre d'employés par page

    useEffect(() => {
        axios.get('http://localhost:3001/employe')
            .then(res => setEmployes(res.data))
            .catch(err => console.log(err));
    }, []);

    // Calculer les indices des employés pour la page actuelle
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employes.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction pour ouvrir le modal et stocker les informations de l'employé sélectionné
    const handleOpenModal = (employe) => {
        setSelectedEmploye(employe);
        setShowModal(true);
    };


    const closemodal = () => {
        setShowModal(false);
    };

    // Fonction pour filtrer les employés en fonction du terme de recherche
    const filteredEmployees = employes.filter(employe =>
        employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrer par nom
        employe.matricule.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrer par matricule
        employe.mail.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrer par mail
        employe.cin.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrer par CIN
        employe.service.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrer par service
    );

    return (
        <div>
            <h4 className='titreemploye'>LISTE DES EMPLOYES</h4>

            
            <div className='contenubtnajoutemploye'>
                {/* Champ de recherche */}
            <input
                type="text"
                className='recherchebtnemploye'
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
                <Link to="/ajoutemploye" className='ajouteemployebtn' >
                    <img src='./icons/icons8_add.ico' alt="bouton add" /> Ajouter employé
                </Link>
            </div>
            
            {filteredEmployees.length !== 0 ? (
                <div className='contenulistemploye'>
                    <table className="table">
                        <thead >
                            <tr>
                                <th scope="col">PHOTO</th>
                                <th scope="col">MATRICULE</th>
                                <th scope="col">NOM</th>
                                <th scope="col">MAIL</th>
                                <th scope="col">CIN</th>
                                <th scope="col">SERVICE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
    {currentEmployees.map(employe => (
        // Vérifier si l'employé correspond au terme de recherche
        (employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.service.toLowerCase().includes(searchTerm.toLowerCase())) && (
            <tr key={employe.idemploye}>
                <td>
                    <img src={employe.image_url} alt={employe.nom} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{employe.matricule}</td>
                <td>{employe.nom}</td>
                <td>{employe.mail}</td>
                <td>{employe.cin}</td>
                <td>{employe.service}</td>
                <span className='contenubtnajoutabsenceetvoiremploye'>
                <td>
                <button className='ajoutabsencebtn'>
                    <Link to={`/ajoutabsence/${employe.idemploye}`} className="lienabsencebtnemploye">
                        S'absenter
                    </Link>
                </button>
                </td>
                <td>
                    <button  onClick={() => handleOpenModal(employe)} className="voirbtnemploye">V o i r</button>
                </td>
                </span>
            </tr>
        )
    ))}
</tbody>

                    </table>
                    <nav>
                        <ul className='pagination'>
                            {Array.from({ length: Math.ceil(filteredEmployees.length / employeesPerPage) }, (_, i) => (
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
            <Modal style={{ backgroundColor: 'grey' }} show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Informations de l'employé</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'blanchedalmond' }}>
                    {selectedEmploye && (
                        <div>
                            <img src={selectedEmploye.image_url} alt={selectedEmploye.nom} style={{ width: '100px', height: '100px' }} />
                            <p></p>
                            <p><strong>Nom: </strong>{selectedEmploye.nom}</p>
                            <p><strong>Matricule: </strong>{selectedEmploye.matricule}</p>
                            <p><strong>Mail: </strong>{selectedEmploye.mail}</p>
                            <p><strong>CIN: </strong>{selectedEmploye.cin}</p>
                            <p><strong>SERVICE: </strong>{selectedEmploye.service}</p>
                        </div>
                    )}
                    <div style={{ textAlign: 'end' }}>
                        <button className='btn btn-secondary' onClick={() => closemodal()} style={{ color: 'white', backgroundColor: 'blue' }}>OK</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Employe;
