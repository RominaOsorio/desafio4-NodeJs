import express from 'express'
import cors from 'cors'
import { create, deleteById, findAll, findById, udpdateLikeById } from '../server/models/models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.get('/health', (req, res) => res.send('Like me'))

app.get('/posts', async (req, res) => {
  try {
    const posts = await findAll()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json(error)
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const posts = await findById(req.params.id)
    res.status(200).send(posts)
  } catch (error) {
    res.status(404).send('Pagina no encontrada')
  }
})

app.post('/posts', async (req, res) => {
  try {
    await create()
    res.status(200).send('Post creado exitosamente')
  } catch (error) {
    res.status(500).json('Ha ocurrido un error en el servidor')
  }
})

app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params
    await udpdateLikeById(id)
    res.status(200).send('Like actualizado exitosamente')
  } catch (error) {
    res.status(500).json('Ha ocurrido un error en el servidor')
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deleteById(id)
    res.status(200).send('Like eliminado exitosamente')
  } catch (error) {
    res.status(500).json('Ha ocurrido un error en el servidor')
  }
})

app.all('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Pagina no encontrada' })
})

app.listen(PORT, () => console.log(`Server UP! ${PORT}`))

export default app
