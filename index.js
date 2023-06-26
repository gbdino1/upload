const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* CONFIGURAÇÃO DE STORAGE */
const storage = multer.diskStorage(
    {
        destination:(req, file, cb)=>{
            cb(null, './uploads');
        },
        filename:(req, file, cb)=>{
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    }
);

/* CONFIGURAÇÃO DE FILTER */
const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/* UPLOAD */
const upload = multer({
    //regra de storage
    storage:storage,
    //regra tamanho
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    //regra de filter
    fileFilter:fileFilter
});

/* ROTA DE UPLOAD DE ARQUIVO */
app.post('/upload', upload.array('imagens_livro', 2) ,(req, res)=>{
    console.log(req.files);
    console.log(req.body);
    res.send('OK!');
});

app.listen(3000, ()=>{
    console.log('servidor rodando em http://localhost:3000');
});
