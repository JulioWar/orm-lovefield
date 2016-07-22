'use strict';
if(!lf) {
    alert('Verifica que se esta cargando lovefield');
} else {

    // initialize all variables
    var ORM_lf = {
        connection: {
            database:"",
            version: 0,
            createSchema: undefined
        }
    };

    ORM_lf.setConection = function (connection) {
        this.connection = Object.create(connection);
    };

    ORM_lf.getConection = function(){
        //console.log(ORM_lf.connection);
        if(!ORM_lf.connection.database || !ORM_lf.connection.version){
            throw "Verifica la configuracion de la base de datos.";
        }
        return lf.schema.create(ORM_lf.connection.database,ORM_lf.connection.version);
    };

    /*
     Model Prototype
     */

    ORM_lf.Model = function (params) {
        for(var key in params){
            this[key] = params[key];
        }
    };

    ORM_lf.Model.extend = function(params){
        var constructor = function(){};
        constructor.prototype = ORM_lf.prototype;
        return constructor;
    };

    ORM_lf.Model.prototype.getSchema = function (query) {
        var self = this;
        var builder = ORM_lf.getConection();
        if(typeof(ORM_lf.connection.createSchema) != "undefined"){
            ORM_lf.connection.createSchema(builder);
        } else {
            throw "Se debe definir el Schema de la base de datos.";
        }

        return builder.connect().then(function (db) {
            return query(db, db.getSchema().table(self.tableName));
        });
    };

    ORM_lf.Model.prototype.query = function (query) {
        return this.getSchema(function (db, table) {
            var builder = db.select().from(table);
            return query(db, builder);
        });
    };

    ORM_lf.Model.prototype.getAttr = function(name) {
        return this.getSchema(function (db, table) {
            return table[name];
        });
    };

    ORM_lf.Model.prototype.select = function(selects) {
        return this.getSchema(function (db, table) {
            if(Array.isArray(selects) && selects.length > 0) {
                selects = selects.map(function(item){
                    return table[item];
                });
            } else {
                selects = []
            }
            return db.select.apply(db,selects).from(table);
        });
    };

    ORM_lf.Model.prototype.all = function () {
        return this.query(function (db, builder) {
            return builder.exec();
        });
    };

    ORM_lf.Model.prototype.insert = function (rows) {
        return this.getSchema(function (db,table) {

            if(!Array.isArray(rows)){
                rows = [
                    table.createRow(rows)
                ];
            } else {
                for(var key in rows){
                    rows[key] = table.createRow(rows[key]);
                }
            }
            return db.insertOrReplace().into(table).values(rows).exec();
        });
    };

    // Relationship Prototypes

    ORM_lf.Model.prototype.belongsTo = function (Model, foreign_key, local_key) {
        return {};
    };

    ORM_lf.Model.prototype.belongsToMany = function (Model, table, foreign_key, local_key) {
        return [];
    };

    ORM_lf.Model.prototype.hasMany = function (Model, foreign_key, local_key) {
        return [];
    };

}
