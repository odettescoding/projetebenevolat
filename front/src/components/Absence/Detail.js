import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './detail.css';
const Detail = () => {
    const [details, setDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [detailsPerPage] = useState(5);

    useEffect(() => {
        // Effectuez votre requête vers le backend pour obtenir les détails des absences des employés
        axios.get('http://localhost:3001/detail')
            .then(response => {
                // Mettez à jour le state avec les détails reçus du backend
                setDetails(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails des absences des employés:', error);
            });
    }, []);

    // Filtrer les détails en fonction du terme de recherche
    const filteredDetails = details.filter(detail =>
        detail.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastDetail = currentPage * detailsPerPage;
    const indexOfFirstDetail = indexOfLastDetail - detailsPerPage;
    const currentDetails = filteredDetails.slice(indexOfFirstDetail, indexOfLastDetail);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='contenudetail'>
            <div>
                <h4 className='titrereleve'>Relevé d'absence de l'employé</h4>
                <input
                    className='inputrecherchedetail'
                    type="text"
                    placeholder="Rechercher par nom"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">EMPLOYE</th>
                        <th scope="col">NOM</th>
                        <th scope="col">ARRET MALADIE</th>
                        <th scope="col">ABSENCE A RECUPERER</th>
                        <th scope="col">ABSENCE EXEPTIONNELLE</th>
                        <th scope="col">CONGE DE MATERNITE</th>
                        <th scope="col">RECUPERATION</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDetails.map((detail, index) => (
                        <tr key={index}>
                            <td>
                                <img src={detail.image_url} alt={detail.nom} style={{ width: '30px', height: '30px', borderRadius:'100%' }} />
                            </td>
                            <td>{detail.nom}</td>
                            <td>{detail.total_arret_maladie}</td>
                            <td>{detail.total_absence_recuperer}</td>
                            <td>{detail.total_absence_exceptionnelle}</td>
                            <td>{detail.total_conge_maternite}</td>
                            <td>{detail.total_recuperation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {filteredDetails.length > detailsPerPage &&
                        Array.from({ length: Math.ceil(filteredDetails.length / detailsPerPage) }, (_, i) => (
                            <li key={i + 1} className="page-item">
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </nav>
        </div>
    );
}

export default Detail;
