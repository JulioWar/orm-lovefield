// SELECT
/**
 * Funcion para comenzar una consulta SELECT
 * @param  {Array} attributes
 * @return {Query}
 */
User.select([])
/**
 * Funccion para filtrar en la tabla
 * @param  {[type]} field     [description]
 * @param  {[type]} condition [description]
 * @param  {[type]} value     [description]
 * @return {[type]}           [description]
 */
where(field,condition,value).
/**
 * Funcion para filtrar en las relaciones
 * @param  {String}   table    Seleccion de la tabla que se hara join
 * @param  {Function} callback function para filtro en la base de datos
 * @return {Query}
 */
whereHas(table,callback).
/**
 * funcion para cargar relaciones
 * @param  {Array} attributes [description]
 * @return {Query}
 */
with([]).

limit(limit).
/**
 * Funcion para obtener
 * @param  {Integer} take [description]
 * @return {Query}
 */
take(take).
/**
 * Funcion que ejecuta el objecto Query
 * @return {Result} El Resultado de todo el objecti Query
 */
.get();
