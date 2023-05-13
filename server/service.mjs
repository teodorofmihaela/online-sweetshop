import Sequelize from "sequelize";

async function getRecord(Model, req, res) {
    try {
        let rec = await Model.findByPk(req.params.id);
        if (rec) {
            res.status(200).send(rec);

        } else {
            res.status(404).send();
        }

    } catch (err) {
        res.status(500).json(err);
    }
}
async function getRecords(Model, req, res) {
    try {
        let recs = await Model.findAll();

        if (recs.length > 0) {

            res.status(200).json(recs);
        } else {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(req + res + err);
    }
}

async function getFilteredRecords(Model, req, res) {
    try {
        let categ = req.params['categorie'];
        let recs = await Model.findAll(
            {
                where: {
                    categorie: categ
                }
            }
        );

        if (recs.length > 0) {

            // const data = recs.filter((x) => {
            //     return x.dataValues.categorie == categ
            // });

            // const data = await Model.findAll({
            //     where: {
            //         categorie: categ
            //     }
            // });
            res.status(200).json(recs);
        } else {
            res.status(204).send();
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}



async function getFilteredRecipe(Model, req, res) {
    try {
        let idProd = req.params['produseId'];
        let recs = await Model.findAll(
            {
                where: {
                    produseId: idProd
                }
            }
        );
        if (recs.length > 0) {
            res.status(200).json(recs);
        } else {
            res.status(204).send();
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}

async function headRecord(Model, req, res) {
    try {
        let rec = await Model.findByPk(req.params.id);
        if (rec) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

function isValid(Model, payload) {
    return Object.entries(Model.tableAttributes).reduce((valid, [name, field]) => {
        if (valid &&
            !field._autoGenerated &&
            !field.primaryKey &&
            field.allowNUll === false &&
            !payload[name]) {
            valid = false;
        }
        return valid;
    }, true);

}

async function postRecord(Model, req, res) {
    try {
        if (isValid(Model, req.body)) {
            let rec = await Model.create(req.body);
            res.status(201)
                .location(`http://${req.headers.host}${req.baseUrl}${req.url}/${rec.id}`).send();

        } else {
            res.status(400).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

async function deleteRecords(Model, req, res) {
    try {
        await Model.truncate();
        res.status(204).send();

    } catch (err) {
        res.status(500).json(err);
    }
}

async function putRecord(Model, req, res) {
    try {
        let rec = await Model.findByPk(req.params.id);
        if (rec) {
            if (isValid(Model, req.body)) {
                await rec.update(req.body);
                res.status(204).send();
            } else {
                res.status(404).send();
            }
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

async function patchRecord(Model, req, res) {
    try {
        let rec = await Model.findByPk(req.params.id);
        if (rec) {
            Object.entries(req.body).forEach(([name, value]) => rec[name] = value);
            await rec.save();
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

async function deleteRecord(Model, req, res) {
    try {
        let rec = await Model.findByPk(req.params.id);
        if (rec) {
            await rec.destroy();
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

async function login(Model, req, res) {
    try {
        let utilizator = await Model.findAll({
            where: {
                username: req.query.username,
                parola: req.query.parola
            }
        });
        if (utilizator.length > 0) {
            console.log(utilizator);
            res.status(200).send(utilizator);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).json(err);
    }

}

//---------------TODO: Come back up here to complete specific functions-----

function attributes(req) {
    if (req.headers['x-fields']) {
        return req.headers['x-fields'].split(',');
    } else {
        return undefined;
    }
}

function whereFilter(req) {
    if (req.query.filter) {
        return req.query.filter.split(',').reduce((filter, condition) => {
            let data = condition.split('-');
            filter[data[0]] = {
                [Sequelize.Op[data[1]]]: data[2]
            };
            return filter;
        }, {});
    } else {
        return undefined;
    }
}

async function getAttributes(Model, req, res) {
    try {
        let rec = await Model.findAll({
            attributes: attributes(req),
            where: whereFilter(req)
        });
        if (rec) {
            res.status(200).send(rec);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

export {
    getRecords,
    postRecord,
    deleteRecords,
    getRecord,
    headRecord,
    putRecord,
    patchRecord,
    deleteRecord,
    getAttributes,
    getFilteredRecords,
    getFilteredRecipe,
    login
}