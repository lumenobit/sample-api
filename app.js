const express = require('express');
const server = express();
const port = 4000;
const bodyParser = require('body-parser')
const path = require('path');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const students = [
    { id: 1, name: 'Arka', department: 'CSE' },
    { id: 2, name: 'Aparajita', department: 'CSE' },
    { id: 3, name: 'Moumita', department: 'IT' },
    { id: 4, name: 'Sourav', department: 'CSE' },
    { id: 5, name: 'Rinita', department: 'CSE' },
    { id: 6, name: 'Subhajit', department: 'CSE' },
    { id: 7, name: 'Anirban', department: 'ECE' }
]

server.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
})

// QUERY / Query String / Query Param
server.get('/students', (req, res) => {
    const search = req.query.s;
    let result = null;
    // NULL CHECKING
    // search != null && search != '' && search != undefined
    if (search) {
        result = students.filter((st) => { return st.name.toLowerCase().startsWith(search.toLowerCase()) })
    } else {
        result = students;
    }
    res.send(result);
})

// Param asdf
server.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    let student = students.find((st) => { return st.id == studentId });
    if (!student) {
        res.status(404).send({ message: 'Student Not Found!' });
    } else {
        res.send(student);
    }
})

server.post('/students', (req, res) => {
    const student = req.body;
    const lastId = students[students.length - 1].id;
    student.id = lastId + 1;
    students.push(student);
    res.send({ message: 'New student information saved!' });
})

server.put('/students/:id', (req, res) => {
    const inputStudent = req.body;
    const target = students.find((st) => { return st.id == req.params.id });
    target.department = inputStudent.department;
    res.send({ message: 'Updating information for - ' + target.name });
})

server.delete('/students/:id', (req, res) => {
    const student = students.splice(students.findIndex((st) => { return st.id == req.params.id }), 1);
    res.send({ message: 'Updating information for - ' + student.name });
})

server.get('/about', (req, res) => {
    res.sendFile(path.resolve('./pexels-pixabay-60597.jpg'));
})

server.get('/css/style.css', (req, res) => {
    res.sendFile(path.resolve('./public/css/style.css'));
})

// WILDCARD
// server.get('*.*', (req, res) => {
//     res.sendFile('D:/Professional/Training/example/public/');
// })

server.listen(port, () => {
    console.log('Server is running on port: ' + port);
});