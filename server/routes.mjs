import express from 'express';
import { Ingrediente, Furnizori, Achizitii, Retetar, Aparatura,
    Vanzari, Ingrediente_In_Retete, Program_aparatura, Produse, Angajati, Utilizatori, Drepturi} from './repository.mjs';
import { getRecord, getRecords, headRecord, postRecord, putRecord, patchRecord, deleteRecord, deleteRecords,
    getAttributes, getFilteredRecords,getFilteredRecipe, login} from './service.mjs';


const router=express.Router();

//formularul de login va fi la calea /

router.route('/') 
    .get((req,res)=>login(Utilizatori,req,res));

//ruta pt toate ingredientele
router.route('/ingrediente')
    .post((req,res)=>postRecord(Ingrediente,req,res))
    .delete((req,res) => deleteRecords(Ingrediente,req,res))
    .get((req,res)=>getRecords(Ingrediente,req,res))
    .put((req,res)=>putRecord(Ingrediente,req,res));

//ruta pt cand dai click pe o anumita categorie
router.route(`/produse/categorie/:categorie`)
    .get((req,res)=>getFilteredRecords(Produse,req,res));


//ruta pt un anumit produs produsele dupa id
router.route('/produse/id/:id')
    .delete((req,res) => deleteRecords(Produse,req,res))
    .get((req,res)=>getRecords(Produse,req,res))
    .put((req,res)=>putRecord(Produse,req,res))
    .patch((req,res)=>patchRecord(Produse,req,res)) 
    .head((req,res)=>headRecord(Produse,req,res));//verific daca exista acel id


    //ruta pt toate produsele
router.route('/produse')
    .post((req,res)=>postRecord(Produse,req,res))
    .delete((req,res) => deleteRecords(Produse,req,res))
    .get((req,res)=>getRecords(Produse,req,res))
    .put((req,res)=>putRecord(Produse,req,res));


//ruta pt cand dai click pe o anumita reteta
router.route('/retetar/denumire/:denumire')
    .get((req,res)=>getFilteredRecipe(Retetar,req,res));


//ruta pt cand dai click pe o anumita reteta
router.route('/retetar/:id')
    .delete((req,res) => deleteRecord(Retetar,req,res))
    .patch((req,res)=>patchRecord(Retetar,req,res)) 
    .head((req,res)=>headRecord(Retetar,req,res))//verific daca exista acel id
    .get((req,res)=>getRecord(Retetar,req,res));


//ruta pt toate retetele
router.route('/retetar')
    .post((req,res)=>postRecord(Retetar,req,res))
    .delete((req,res) => deleteRecords(Retetar,req,res))
    .get((req,res)=>getRecords(Retetar,req,res))
    .put((req,res)=>putRecord(Retetar,req,res));



//ruta pt toate vanzarile
router.route('/vanzari')
    .post((req,res)=>postRecord(Vanzari,req,res))
    .delete((req,res) => deleteRecords(Vanzari,req,res))
    .get((req,res)=>getRecords(Vanzari,req,res))
    .put((req,res)=>putRecord(Vanzari,req,res));

//ruta pt toti furnizorii
router.route('/furnizori')
    .post((req,res)=>postRecord(Furnizori,req,res))
    .delete((req,res) => deleteRecords(Furnizori,req,res))
    .get((req,res)=>getRecords(Furnizori,req,res))
    .put((req,res)=>putRecord(Furnizori,req,res));



export default router;