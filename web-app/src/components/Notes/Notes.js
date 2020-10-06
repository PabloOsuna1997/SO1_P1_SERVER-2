import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TableScrollbar from 'react-table-scrollbar'
import { Table, Container, Row, Col, Toast } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import './Notes.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
    const ipS2 = 'http://3.137.181.45:5002'
    const { id } = useParams();
    const [resServer, setResServer] = useState()              //resources of the server
    const [notes, setNotes] = useState([])                      //notes of the server

    async function getNotes() {
        let res = ''
        if (id == 'A') {   //call server A
            res = await fetch(ipS2 + '/notesA');
        } else {
            res = await fetch(ipS2 + '/notesB');
        }
        res
            .json()
            .then((res) => {
                setNotes(res.notes)
            })
            .catch(err => alert('Ocurio un error.'));
    }

    async function getResources() {
        let res = ''
        if (id == 'A') {   //call server A
            res = await fetch(ipS2 + '/getresA');
        } else {
            res = await fetch(ipS2 + '/getresB');
        }
        res
            .json()
            .then((res) => {
                console.log(res)
                setResServer(res)
            })
            .catch(err => alert('Ocurio un error.'));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getNotes();
            getResources();
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    if (notes[0] && resServer) {
        let data = {}
        let opciones = {}
        let a = resServer.resources.RAM[0].split(':')
        let v = a[1].substring(0, a.lenght - 1)
        let total = parseInt(a[1], 10)
        let a1 = resServer.resources.RAM[1].split(':')
        let v1 = a1[1].substring(0, a1.lenght - 1)
        let usado = parseInt(a1[1], 10)
        let porcentaje = (usado * 100) / total
        data = {
            labels: ['RAM', 'CPU', 'CANTIDAD', ''],
            datasets: [{
                label: 'Porcentaje',
                backgroundColor: 'rgba(0,255,0,1)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0,255,0,0.2)',
                hoverBorderColor: '#FF0000',
                data: [porcentaje, 10, resServer.resources.LEN, 0]
            }]
        }
        opciones = {
            maintainAspectRatio: false,
            responsive: true
        }
        return (
            <Container id="contenedor">
                <Row>
                    <Col>
                        <TableScrollbar height="500px">
                            <Table striped bordered hover responsive>
                                <thead id="encabezado">
                                    <tr>
                                        <th>Autor</th>
                                        <th>Nota</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    notes.map((note, id) => {
                                        return (
                                            <tr key={id}>
                                                <td>{note.autor}</td>
                                                <td>{note.nota}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </TableScrollbar>
                    </Col>
                    <Col>
                        <Bar data={data} options={opciones}> </Bar>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <div id="load">
                <div class="spinner-grow text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Notes;