import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TableScrollbar from 'react-table-scrollbar'
import { Table, Container, Row, Col, Toast } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import './Notes.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
    const ipS2 = 'http://3.137.181.45:5002'
    let CPU_graf = [0, 0, 0, 0]
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
        let dataL = {}
        let opcionesL = {}
        let RAM_graf = []
        let a = resServer.resources.RAM[0].split(':')
        let total = parseInt(a[1], 10)
        let a1 = resServer.resources.RAM[1].split(':')
        let usado = parseInt(a1[1], 10)
        let porcentaje = (usado * 100) / total
        let array = localStorage.getItem('arrayA')
        array = JSON.parse(array);
        RAM_graf[0] = array[1]
        RAM_graf[1] = array[2]
        RAM_graf[2] = array[3]
        RAM_graf[3] = porcentaje
        localStorage.setItem('arrayA', JSON.stringify(RAM_graf))
        dataL = {
            labels: ['', '', '', ''],
            datasets: [{
                label: 'RAM',
                backgroundColor: 'rgba(0,255,0,0.2)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBorderColor: '#FF0000',
                data: RAM_graf
            },{
                label: 'CPU',
                backgroundColor: 'rgba(0,255,255,255)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBorderColor: '#FF0000',
                data: [10.2,12.3,13.4,11.5]
            }]
        }
        opcionesL = {
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
                        <Line data={dataL} options={opcionesL}> </Line>
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