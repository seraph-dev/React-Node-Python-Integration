import db from '../db/models/index.js'

export async function createOperation(body) {
    console.log("body.parameter", body.parameter)
    return await db.Operation.create({
        parameter: body.parameter,
        filename: body.filename,
        Precisão: body.result[2].slice(body.result[2].indexOf(" ")+1),
        Revocação: body.result[3].slice(body.result[3].indexOf(" ")+1),
        Acurácia: body.result[4].slice(body.result[4].indexOf(" ")+1),
    });
}

export async function getOperation() {
    return await db.Operation.findAll();
}