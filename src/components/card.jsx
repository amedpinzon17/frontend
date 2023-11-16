import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
import './style.css'

export default function Card() {
    const url = 'http://localhost:9050/prueba/getDocumentos';
    const [documentos, setDocumentos] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [newDocument, setNewDocument] = useState({
        numeracion: "",
        estado: "",
        empresa: "",
        fecha: "",
        base: "",
        impuesto: ""
    });

    useEffect(() => {
        axios.get(url)
            .then((result) => {
                setDocumentos(result.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const oneDelete = (_id) => {
        axios.delete(`http://localhost:9050/prueba/deleteDocumento/${_id}`)
            .then((response) => {
                console.log('elemento eliminado', response.data);
                alert('seguro q queres eliminar este docuemto')
                const updatedDocumentos = documentos.filter(documento => documento._id !== _id);
                setDocumentos(updatedDocumentos);
            })
            .catch((err) => {
                console.err('error al eliminar el mesage', err);
            });
    }


    const agregar = () => {
        axios.post('http://localhost:9050/prueba/endpoint19', newDocument)
            .then((response) => {
                console.log('Documento agregado:', response.data);
                setShowModal(false);
                /* fetchData(); */
            })
            .catch((error) => {
                console.error('Error al agregar documento:', error);
            });
    }


    return (


        <div>






            <Button variant="primary" onClick={() => setShowModal(true)}>
                Agregar Documento
            </Button>

            <div className="modal">



                {/* Modal para agregar un nuevo documento */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Documento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="forrmilario">
                            {/* Campos del nuevo documento */}
                            <Form.Group controlId="numeracion">
                                <Form.Label>Numeración</Form.Label>
                                <Form.Control type="text" value={newDocument.numeracion} onChange={(e) => setNewDocument({ ...newDocument, numeracion: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" value={newDocument.estado} onChange={(e) => setNewDocument({ ...newDocument, estado: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Empresa</Form.Label>
                                <Form.Control type="text" value={newDocument.empresa} onChange={(e) => setNewDocument({ ...newDocument, empresa: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Numero</Form.Label>
                                <Form.Control type="text" value={newDocument.numero} onChange={(e) => setNewDocument({ ...newDocument, numero: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="text" value={newDocument.fecha} onChange={(e) => setNewDocument({ ...newDocument, fecha: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Base</Form.Label>
                                <Form.Control type="text" value={newDocument.base} onChange={(e) => setNewDocument({ ...newDocument, base: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="Formulario" controlId="numeracion">
                                <Form.Label>Impuestos</Form.Label>
                                <Form.Control type="text" value={newDocument.impuesto} onChange={(e) => setNewDocument({ ...newDocument, impuesto: e.target.value })} />
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={agregar}>Agregar</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="container">
                {documentos.map((documento, index) => (
                    <div key={index}>
                        <div className="card">
                            <div className="header">
                                <div className="image">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bell-ringing-2" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00bfd8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.364 4.636a2 2 0 0 1 0 2.828a7 7 0 0 1 -1.414 7.072l-2.122 2.12a4 4 0 0 0 -.707 3.536l-11.313 -11.312a4 4 0 0 0 3.535 -.707l2.121 -2.123a7 7 0 0 1 7.072 -1.414a2 2 0 0 1 2.828 0z" />
                                        <path d="M7.343 12.414l-.707 .707a3 3 0 0 0 4.243 4.243l.707 -.707" />
                                    </svg>
                                </div>
                                <div className="content">
                                    <span className="title">Documentos Id {documento._id}</span>
                                    <p className="user-info-item">{documento.numeracion}</p>
                                    <p className="user-info-item">{documento.estado}</p>
                                    <p className="user-info-item">{documento.empresa}</p>
                                    <p className="user-info-item">{documento.fecha}</p>
                                    <p className="user-info-item">{documento.base}</p>
                                    <p className="user-info-item">{documento.impuesto}</p>
                                </div>
                                <div className="actions">
                                    <button onClick={() => oneDelete(documento._id)} className="history">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}







            </div>

        </div>
    );
}
