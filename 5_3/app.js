import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Персональні дані
const personalData = {
    lastName: 'Ларіна',
    firstName: 'Марія',
    course: '2 курс',
    group: 'ІС-22',
    moodleLogin: 'is-22fiot-22-06'
};

// Визначення поточного каталогу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функція для відправки HTML-файлів
const sendFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(err.message); // Вивести детальну інформацію про помилку
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Server Error');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
};


// Створення сервера
const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;

    if (req.url === '/') {
        sendFile(res, path.join(__dirname, 'public', 'index.html'), 'text/html');
    } else if (queryObject.login) {
        if (queryObject.login === personalData.moodleLogin) {
            const dataHTML = `
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Personal Data</title>
                    </head>
                    <body>
                        <h1>Інформація про студента</h1>
                        <p>Last Name: ${personalData.lastName}</p>
                        <p>First Name: ${personalData.firstName}</p>
                        <p>Course: ${personalData.course}</p>
                        <p>Group: ${personalData.group}</p>
                    </body>
                </html>
            `;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(dataHTML);
        } else {
            sendFile(res, path.join(__dirname, 'public', 'error.html'), 'text/html');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

// Сервер слухає на порту 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});