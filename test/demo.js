var schemaBuilder = lf.schema.create('todo', 1);

schemaBuilder.createTable('Item').
    addColumn('id', lf.Type.INTEGER).
    addColumn('description', lf.Type.STRING).
    addColumn('deadline', lf.Type.DATE_TIME).
    addColumn('done', lf.Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);

ORM_lf.setConection(schemaBuilder);

var Item = new ORM_lf.Model("item");

Item.all().then(function(data){
    console.log(data);
});
