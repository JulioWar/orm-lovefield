
var User = new ORM_lf.Model({
    tableName:"User",
    items: function(){
        return this.hasMany(Item);
    }
});

var Item = new ORM_lf.Model({
    tableName:'Item',
    user: function(){
        return this.belongsTo(User)
    }
});

ORM_lf.setConection({
    database: "todo",
    version: 1,
    createSchema: function(builder){
        // Creating the schema of database
        builder.createTable(User.tableName).
        addColumn('id', lf.Type.INTEGER).
        addColumn('name', lf.Type.STRING).
        addColumn('last_name', lf.Type.STRING).
        addPrimaryKey(['id']);

        builder.createTable(Item.tableName).
        addColumn('id', lf.Type.INTEGER).
        addColumn('description', lf.Type.STRING).
        addColumn('deadline', lf.Type.DATE_TIME).
        addColumn('done', lf.Type.BOOLEAN).
        addColumn('userId',lf.Type.INTEGER).
        addPrimaryKey(['id']).
        addForeignKey('fk_userId',{
            local: 'userId',
            ref: 'User.id'
        });
    }
});

User.select().then(function(promise){
    return promise.exec();
}).then(function(data){
    console.log(data);
});

// User.insert({
//     id:6,
//     name:"Julio Cesar",
//     last_name: "Guerra"
// }).then(function(result) {
//     return result
// }).then(function(result){
//     return Item.insert({
//         id:6,
//         description: "Description body",
//         deadline:new Date(),
//         done:false,
//         userId:result[0].id
//     });
// }).then(function(response){
//     return User.all();
// },function(error){
//     console.log(error)
// });
