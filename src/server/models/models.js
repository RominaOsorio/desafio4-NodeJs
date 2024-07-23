import 'dotenv/config'
import db from '../database/db_connect.js'

export const findAll = async () => {
  try {
    const result = await db('SELECT * FROM posts ORDER BY id ASC;')
    return result
  } catch (error) {
    console.error('[models.js] => findAll', error)
  }
}

export const findById = async (id) => {
  try {
    const result = await db('SELECT * FROM posts WHERE id = $1;', [id])
    return result
  } catch (error) {
    console.error('[models.js] => findById', error)
  }
}

export const create = async (titulo, url, descripcion, likes = 0) => await db('INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;', [titulo, url, descripcion, likes])

export const udpdateLikeById = async (id) => await db('UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;', [id])

export const deleteById = async (id) => await db('DELETE FROM posts WHERE id = $1 RETURNING *;', [id])
