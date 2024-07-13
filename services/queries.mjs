import { database } from "../database.mjs";
import util from 'util'
const WHERE = 'WHERE';

const query = util.promisify(database.query).bind(database);
export const getTypes = async () => {
    const typesDB = await query('SELECT distinct tipo FROM uacguide.tecnicas');
    if(typesDB) return typesDB.map(types => types.tipo)
    console.log('Something went wrong!!');
    return null; 
}

export const getTargets = async () => {
    const targets = new Set();
    const targetsDB = await query('SELECT distinct objetivo FROM uacguide.tecnicas;');
    if(targetsDB.length){
        targetsDB.map(target => {
            const tg = target.objetivo.split(",");
            tg.forEach(target$ => {
                targets.add(target$.replaceAll("\\","\\"));
            });
        });
        return targets;
    } 
    console.log('Something went wrong!!');
    return null; 
}

export const getGuide = async (system, type, binaries) => {
    let sql = `SELECT tipo, metodo, objetivo, componente, funciona_desde FROM uacguide.tecnicas WHERE`;
    if(system?.OS.length){
        sql=buildSqlOS(system.OS, sql);
    }
    if(type?.typeAttack){
        sql=buildSqlType(type.typeAttack, sql);
    } 
    if(binaries?.binaries){
        sql=buildSqlBinary(binaries?.binaries, sql);
    }         
    const typesDB = await query(sql);
    return typesDB; 
}

const buildSqlOS = (OS, sql) => {
    isFirstInRow(sql)===true ? sql+= ' AND' : null;
    sql+= OS.map((os,index) => {
        if(index===0) return ` (funciona_desde LIKE '%${os}%'`
        return `OR funciona_desde LIKE '%${os}%'`
    }).join(" ")+')'
    return sql;
}

const isFirstInRow = (sql) => {
    return sql.indexOf(WHERE)+WHERE.length != sql.length
}

const buildSqlType = (type, sql) => {
    isFirstInRow(sql) ? sql+= ' AND' : null;
    sql+=` tipo = '${type}'`
    return sql;
}

const buildSqlBinary = (binary, sql) => {
    isFirstInRow(sql) ? sql+= ' AND' : null;
    sql+=` objetivo LIKE '%${binary.replaceAll('\\','\\\\\\\\')}%'`
    return sql;
}