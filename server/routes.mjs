import express from 'express';
import { Ingrediente, Furnizori, Achizitii, Retetar, Vanzari_online,
    Vanzari, Ingrediente_In_Retete, Produse_comanda, Casare,Stoc_ingrediente, Stoc_produse, Ingrediente_furnizori, Produse, Comenzi, Utilizatori} from './repository.mjs';
import { getRecord, getRecords, headRecord, postRecord, putRecord, patchRecord, deleteRecord, deleteRecords,
    getAttributes, getFilteredRecords,getFilteredRecipe, login} from './service.mjs';


const router=express.Router();

//formularul de login va fi la calea /

router.route('/login') 
    .post((req,res)=>login(Utilizatori,req,res));

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
    .get((req,res)=>getRecord(Produse,req,res))
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

//ruta pentru vanzare
router.route('/vanzari/:id')
    .put((req,res)=>putRecord(Vanzari,req,res))
    .delete((req,res) => deleteRecord(Vanzari,req,res));

//ruta pt toti furnizorii
router.route('/furnizori')
    .post((req,res)=>postRecord(Furnizori,req,res))
    .delete((req,res) => deleteRecords(Furnizori,req,res))
    .get((req,res)=>getRecords(Furnizori,req,res))
    .put((req,res)=>putRecord(Furnizori,req,res));

//ruta pentru vanzare
router.route('/furnizori/:id')
    .put((req,res)=>putRecord(Furnizori,req,res))
    .delete((req,res) => deleteRecord(Furnizori,req,res));
    
//ruta pt comenzi
router.route('/comenzi')
    .post((req,res)=>postRecord(Comenzi,req,res))
    .delete((req,res) => deleteRecords(Comenzi,req,res))
    .get((req,res)=>getRecords(Comenzi,req,res))
    .put((req,res)=>putRecord(Comenzi,req,res));

//ruta pentru comanda
router.route('/comenzi/:id')
    .put((req,res)=>putRecord(Comenzi,req,res))
    .delete((req,res) => deleteRecord(Comenzi,req,res));
   
//ruta pt Ingrediente_furnizori
router.route('/ingrediente_furnizori')
    .post((req,res)=>postRecord(Ingrediente_furnizori,req,res))
    .delete((req,res) => deleteRecords(Ingrediente_furnizori,req,res))
    .get((req,res)=>getRecords(Ingrediente_furnizori,req,res))
    .put((req,res)=>putRecord(Ingrediente_furnizori,req,res));

//ruta pt achizitii
router.route('/achizitii')
    .post((req,res)=>postRecord(Achizitii,req,res))
    .delete((req,res) => deleteRecords(Achizitii,req,res))
    .get((req,res)=>getRecords(Achizitii,req,res))
    .put((req,res)=>putRecord(Achizitii,req,res));

//ruta pentru achiztie
router.route('/achizitii/:id')
    .put((req,res)=>putRecord(Achizitii,req,res))
    .delete((req,res) => deleteRecord(Achizitii,req,res));

//ruta pt Ingrediente_In_Retete
router.route('/ingrediente_in_retete')
    .post((req,res)=>postRecord(Ingrediente_In_Retete,req,res))
    .delete((req,res) => deleteRecords(Ingrediente_In_Retete,req,res))
    .get((req,res)=>getRecords(Ingrediente_In_Retete,req,res))
    .put((req,res)=>putRecord(Ingrediente_In_Retete,req,res));

//ruta pentru ingredient dintr-o reteta
router.route('/ingrediente_in_retete/:id')
    .put((req,res)=>putRecord(Ingrediente_In_Retete,req,res))
    .delete((req,res) => deleteRecord(Ingrediente_In_Retete,req,res));

//ruta pt Ingrediente_furnizori
router.route('/ingrediente_furnizori')
    .post((req,res)=>postRecord(Ingrediente_furnizori,req,res))
    .delete((req,res) => deleteRecords(Ingrediente_furnizori,req,res))
    .get((req,res)=>getRecords(Ingrediente_furnizori,req,res))
    .put((req,res)=>putRecord(Ingrediente_furnizori,req,res));

//ruta pt casare
router.route('/casare')
    .post((req,res)=>postRecord(Casare,req,res))
    .delete((req,res) => deleteRecords(Casare,req,res))
    .get((req,res)=>getRecords(Casare,req,res))
    .put((req,res)=>putRecord(Casare,req,res));

//ruta pt Stoc_ingrediente
router.route('/stoc_ingrediente')
    .post((req,res)=>postRecord(Stoc_ingrediente,req,res))
    .delete((req,res) => deleteRecords(Stoc_ingrediente,req,res))
    .get((req,res)=>getRecords(Stoc_ingrediente,req,res))
    .put((req,res)=>putRecord(Stoc_ingrediente,req,res));

//ruta pentru stoc ingredient
router.route('/stoc_ingrediente/:id')
    .put((req,res)=>putRecord(Stoc_ingrediente,req,res))
    .delete((req,res) => deleteRecord(Stoc_ingrediente,req,res));

//ruta pt Stoc_produse
router.route('/stoc_produse')
    .post((req,res)=>postRecord(Stoc_produse,req,res))
    .delete((req,res) => deleteRecords(Stoc_produse,req,res))
    .get((req,res)=>getRecords(Stoc_produse,req,res))
    .put((req,res)=>putRecord(Stoc_produse,req,res));

router.route('/stoc_produse/:id')
    .put((req,res)=>putRecord(Stoc_produse,req,res))
    .delete((req,res) => deleteRecord(Stoc_produse,req,res));


//ruta pt Achizitii_online
router.route('/vanzari_online')
    .post((req,res)=>postRecord(Vanzari_online,req,res))
    .delete((req,res) => deleteRecords(Vanzari_online,req,res))
    .get((req,res)=>getRecords(Vanzari_online,req,res))
    .put((req,res)=>putRecord(Vanzari_online,req,res));


//ruta pt Utilizatori
router.route('/utilizatori')
    .post((req,res)=>postRecord(Utilizatori,req,res))
    .delete((req,res) => deleteRecords(Utilizatori,req,res))
    .get((req,res)=>getRecords(Utilizatori,req,res))
    .put((req,res)=>putRecord(Utilizatori,req,res));

// ruta pentru personal(utilizatori)
router.route('/utilizatori/:id')
    .put((req,res)=>putRecord(Utilizatori,req,res))
    .delete((req,res) => deleteRecord(Utilizatori,req,res));

//ruta pt Achizitii_online
router.route('/produse_comanda')
    .post((req,res)=>postRecord(Produse_comanda,req,res))
    .delete((req,res) => deleteRecords(Produse_comanda,req,res))
    .get((req,res)=>getRecords(Produse_comanda,req,res))
    .put((req,res)=>putRecord(Produse_comanda,req,res));




export default router;