import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TableScrollbar from 'react-table-scrollbar'
import { Table, Container, Row, Col } from 'react-bootstrap';
import './Notes.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Notes = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState([])
    async function get() {
        let res = ''
        if (id == 'A') {   //call server A
            res = await fetch('https://jsonplaceholder.typicode.com/todos/');
        } else {
            res = await fetch('https://jsonplaceholder.typicode.com/todos/');
        }
        res
            .json()
            .then((res) => {
                setNotes(res)
            })
            .catch(err => alert('Ocurio un error.'));
    }

    useEffect(() => {
        get();
    }, []);

    console.log(notes)
    if (notes[0]) {
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
                                            <tr>
                                                <td>{note.id}</td>
                                                <td>{note.title}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </TableScrollbar>
                    </Col>
                    <Col>
                        <h1>jkasjksai</h1>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <h1>esperando...</h1>
        )
    }
}

export default Notes;