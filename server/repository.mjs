import Sequelize from 'sequelize';

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage: './onlineSweetshop.db',
    define:{
        timestamps:false
    }
});

const Ingrediente = sequelize.define('ingrediente',{
    id:{
        type:Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4, //generator de valori default pt ca folosesc ca type UUID
        allowNull:false,
        primaryKey:true
    },
    nume:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            len: [3,25]
        }
    },
    cantitate_stoc:{
        type:Sequelize.FLOAT(5,2),
    },
    unitate_masura:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    pret:{
        type:Sequelize.FLOAT(5,2),
        allowNull:false
    }
})

const Furnizori = sequelize.define('furnizori',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    nume_furnizor:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Achizitii = sequelize.define('achizitii',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    cantitate:{
        type:Sequelize.FLOAT(5,2),
        allowNull:false
    },
    pret_total:{
        type:Sequelize.FLOAT(5,2),
        allowNull:false
    },
    data_achizite:{
        type:Sequelize.DATE,
        allowNull:false
    }
})

const Retetar = sequelize.define('retetar',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    denumire:{
        type:Sequelize.STRING,
    },
    numar_produse:{
        type:Sequelize.FLOAT(5,2),
    },
    mod_preparare:{
        type:Sequelize.STRING,
    },
    valori_nutritionale:{
        type:Sequelize.STRING,
    }
})

const Ingrediente_In_Retete = sequelize.define('ingrediente_in_retete',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    cantitate_ingredient:{
        type:Sequelize.FLOAT(5,2),
        allowNull:false
    }
})

const Aparatura = sequelize.define('aparatura',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    denumire_aparat:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Program_aparatura = sequelize.define('program_aparatura',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    Start:{
        type:Sequelize.DATE,
        allowNull:false
    },
    Durata:{
        type:Sequelize.DATE,
        allowNull:false
    },
    Sfarsit:{
        type:Sequelize.DATE,
        allowNull:false
    }
})

const Vanzari = sequelize.define('vanzari',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    cantitate_vanduta:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    data:{
        type:Sequelize.DATE,
        allowNull:false
    },
    valoare_totala:{
        type:Sequelize.FLOAT(5.2),
        allowNull:false
    }
})

const Produse = sequelize.define('produse',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    denumire:{
        type:Sequelize.STRING,
        allowNull:false
    },
    categorie:{
        type:Sequelize.STRING,
    },
    pret_vanzare:{
        type:Sequelize.FLOAT(5.2),
        allowNull:false
    },
    profit:{
        type:Sequelize.FLOAT(5.2),
        allowNull:false
    }
})

const Angajati = sequelize.define('angajati',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    nume:{
        type:Sequelize.STRING,
        allowNull:false
    },
    prenume:{
        type:Sequelize.STRING,
        allowNull:false
    },
    departament:{
        type:Sequelize.STRING,
        allowNull:false
    },
    salariu:{
        type:Sequelize.FLOAT(5.2),
        allowNull:false
    }
})

const Utilizatori = sequelize.define('utilizatori',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    parola:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

const Drepturi = sequelize.define('drepturi',{
    id:{
        type:Sequelize.UUID,
        defaulValue:Sequelize.UUIDV4,
        allowNUll:false,
        primaryKey:true
    },
    denumire_drept:{
        type:Sequelize.STRING,
        allowNull:false
    },
    descriere_drept:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

Furnizori.hasMany(Achizitii,{foreignKey:'furnizoriId'});
Achizitii.belongsTo(Furnizori,{foreignKey:'furnizoriId'});

Ingrediente.hasMany(Achizitii,{foreignKey:'ingredienteId'});
Achizitii.belongsTo(Ingrediente,{foreignKey:'ingredienteId'});

Aparatura.hasMany(Program_aparatura,{foreignKey:'aparaturaId'});
Program_aparatura.belongsTo(Aparatura,{foreignKey:'aparaturaId'});

Retetar.hasMany(Aparatura,{foreignKey:'retetarId'});
Aparatura.belongsTo(Retetar,{foreignKey:'retetarId'});

Produse.hasOne(Retetar,{foreignKey:'produseId'});
Retetar.belongsTo(Produse,{foreignKey:'produseId'});

Ingrediente.hasMany(Ingrediente_In_Retete,{foreignKey:'ingredienteId'});
Ingrediente_In_Retete.belongsTo(Ingrediente,{foreignKey:'ingredienteId'});

Retetar.hasMany(Ingrediente_In_Retete,{foreignKey:'retetarId'});
Ingrediente_In_Retete.belongsTo(Retetar,{foreignKey:'retetarId'});

Produse.hasMany(Vanzari,{foreignKey:'produseId'});
Vanzari.belongsTo(Produse,{foreignKey:'produseId'});

Angajati.hasOne(Utilizatori,{foreignKey:'angajatiId'});
Utilizatori.belongsTo(Angajati,{foreignKey:'angajatiId'});

Drepturi.hasOne(Utilizatori,{foreignKey:'drepturiId'});
Utilizatori.belongsTo(Drepturi,{foreignKey:'drepturiId'});

async function initialize(){
    await sequelize.authenticate(); //conectare la sqlite
    await sequelize.sync({alter:true}); //actualizeaza modelele definite de mine cu definitia tabelelor in baza de date
}

export {
    initialize,
    Ingrediente, Furnizori, Achizitii, Retetar, Aparatura,
    Vanzari, Ingrediente_In_Retete, Program_aparatura, Produse, Angajati, Utilizatori, Drepturi
}