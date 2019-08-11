const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
  async index (req, res) {
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })

    return res.json(users)
  },
  async store (req, res) {
    // pega somente o username do body da requesição
    const { username } = req.body
    // busca no bd o registro existente do user
    const userExists = await Dev.findOne({ user: username })
    /**
     * verifica se já existe no banco o user
     * se ja existi ele retorna o registro se não ele continua
     * */
    if (userExists) {
      return res.json(userExists)
    }

    // utiliza o axios para realizar a requisição na api do GitHub
    const response = await axios.get(`https://api.github.com/users/${username}`)

    const { name, bio, avatar_url: avatar } = response.data

    // Cria a tabela no banco de dados
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })
    return res.json(dev)
  }
}
