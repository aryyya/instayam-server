module.exports = ({
  knex = {},
  name,
  tableName,
  selectableProps,
  timeout = 1000
}) => {
  
  const create = props => {
    delete props.id

    return knex(tableName)
      .insert(props)
      .returning(selectableProps)
      .timeout(timeout)
  }

  const findAll = () => {
    return knex(tableName)
      .select(selectableProps)
      .timeout(timeout)
  }

  const find = filters => {
    return knex(tableName)
      .select(selectableProps)
      .where(filters)
      .timeout(timeout)
  }

  const findOne = filters => {
    return find(filters)
      .then(results => {
        if (!Array.isArray(results)) {
          return results
        }
        return results[0]
      })
  }

  const findById = id => {
    return knex(tableName)
      .select(selectableProps)
      .where({
        id
      })
      .timeout(timeout)
  }

  const update = (id, props) => {
    delete props.id

    return knex(tableName)
      .update(props)
      .where({
        id
      })
      .returning(selectableProps)
      .timeout(timeout)
  }

  const destroy = id => {
    knex(tableName)
      .del()
      .where({
        id
      })
      .timeout(timeout)
  }

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy
  }
}
