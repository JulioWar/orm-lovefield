'use strict';

// initialize all variables
var ORM_lf = {};
ORM_lf.conection = {};

ORM_lf.setConection = function(connection){
    this.connection = Object.create(connection);
};

ORM_lf.connect = function(thenFunction){
    return this.connection.connect().then(thenFunction);
};

/*
    Model Prototype
 */
ORM_lf.Model = function(tableName){
    this.tableName = tableName;
};

ORM_lf.Model.prototype.getSchema = function(query){
    var self = this;
    return ORM_lf.connection.connect(function(db){
        return query(db , db.getSchema().table(self.tableName));
    });
};

ORM_lf.Model.prototype.query =  function(query){
    return this.getSchema(function(db,table) {
        var builder = db.select().from(table);
        return query(db, builder);
    });
};

ORM_lf.Model.prototype.all = function(){
    return this.query(function(db,builder){
        return builder.exec();
    });
};

ORM_lf.Model.prototype.insert = function(rows){
    return this.getSchema(function(db,table){

        if(!Array.isArray(rows)){
            rows = [
                table.createRow(rows)
            ];
        } else {
            for(var key in rows){
                rows[key] = table.createRow(rows[key]);
            }
        }

        return db.insert().into(db).values(rows).exec();
    });
};

// Relationship Prototypes

ORM_lf.Model.prototype.belongsTo = function(Model,foreign_key,local_key){
    return [];
};

ORM_lf.Model.prototype.belongsToMany = function(Model,table,foreign_key,local_key){
    return [];
};

ORM_lf.Model.prototype.hasMany = function(Model,foreign_key,local_key){
    return [];
};




