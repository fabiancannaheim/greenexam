const pool = require('../../db/db')

module.exports = (tableName) => ({

    getAll: async () => {
        const [items] = await pool.execute(`SELECT * FROM ${tableName}`)
        return items
    },

    getById: async (id) => {
        const [item] = await pool.execute(`SELECT * FROM ${tableName} WHERE ID = ?`, [id])
        return item
    },

    where: async (key, val) => {
        const [item] = await pool.execute(`SELECT * FROM ${tableName} WHERE ${key} = ?`, [val])
        return item
    },

    insert: async (data) => {
        const columns = Object.keys(data)
        const values = Object.values(data)
        const placeholders = columns.map(() => '?').join(', ');
        const [result] = await pool.execute(
            `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
            values
        );
        return result
    },

    update: async (id, data) => {
        const columns = Object.keys(data)
        const values = Object.values(data)
        const updateFields = columns.map(col => `${col} = ?`).join(', ')
        const [result] = await pool.execute(
            `UPDATE ${tableName} SET ${updateFields} WHERE ID = ?`,
            [...values, id]
        )
        return result
    },

    delete: async (id) => {
        const [result] = await pool.execute(`DELETE FROM ${tableName} WHERE ID = ?`, [id])
        return result
    }

})
