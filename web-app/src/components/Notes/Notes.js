import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TableScrollbar from 'react-table-scrollbar'
import { Table, Container, Row, Col, Toast } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import './Notes.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
    const ipA = 'http://13.58.167.5:5000'
    const ipB = 'http://18.223.169.91:5000'
    const { id } = useParams();
    const [resServer, setResServer] = useState()              //resources of the server
    const [notes, setNotes] = useState([])                      //notes of the server
    async function getNotes() {
        let res = ''
        if (id == 'A') {   //call server A
            res = await fetch(ipA + '/notes');
        } else {
            res = await fetch(ipB + '/notes');
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
            res = await fetch(ipA + '/getres');
        } else {
            res = await fetch(ipB + '/getres');
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
        let libre = parseInt(a1[1], 10)
        let usado = total - libre
        let porcentaje = (usado * 100) / total
        let array = localStorage.getItem('arrayA')
        array = JSON.parse(array);
        RAM_graf[0] = array[1]
        RAM_graf[1] = array[2]
        RAM_graf[2] = array[3]
        RAM_graf[3] = porcentaje
        localStorage.setItem('arrayA', JSON.stringify(RAM_graf))

        let CPU_graf = []
        let a_cpu = resServer.resources.CPU[0].split(':')
        let total_cpu = parseInt(a_cpu[1], 10)
        let a1_cpu = resServer.resources.CPU[1].split(':')
        let usado_cpu = parseInt(a1_cpu[1], 10)
        let porcentaje_cpu = (usado_cpu / total_cpu) * 100
        let array_cpu = localStorage.getItem('arrayA_cpu')
        array_cpu = JSON.parse(array_cpu);
        CPU_graf[0] = array_cpu[1]
        CPU_graf[1] = array_cpu[2]
        CPU_graf[2] = array_cpu[3]
        CPU_graf[3] = porcentaje_cpu
        localStorage.setItem('arrayA_cpu', JSON.stringify(CPU_graf))

        dataL = {
            labels: ['', '', '', ''],
            datasets: [{
                label: 'RAM',
                backgroundColor: 'rgba(0,255,0,0.2)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBorderColor: '#FF0000',
                data: RAM_graf
            }, {
                label: 'CPU',
                backgroundColor: 'rgba(0,255,255,255)',
                borderColor: 'black',
                borderWidth: 1,
                hoverBorderColor: '#FF0000',
                data: CPU_graf
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
                    <div>
                        <h3>CPU: {porcentaje_cpu.toFixed(3)}%</h3>
                        <h3>RAM: {porcentaje.toFixed(3)}%</h3>
                    </div>
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