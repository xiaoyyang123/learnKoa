const {User} = require('../models')

const getUser = async ctx => {
  const res = await User.findAll()
  ctx.response.body = {
    code: 0,
    data: res
  }
}

const deleteUser = async (ctx) => {
  const res = await User.destroy({
    where: {
      id: ctx.params.id
    }
  })
  ctx.response.body = {
    code: 0,
    data: res
  }
}

const addUser = async (ctx) => {
  try {
    const data = ctx.request.body
    let res = await User.create({
      name: data.name,
      mobile: data.mobile
    })
    ctx.response.body = {
      code: 0,
      data: res
    }
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async ctx => {
  try {
    const data = ctx.request.body
    const res = await User.update({
      ...data
    }, {
      where: {
        id: ctx.params.id
      }
    })
    ctx.response.body = {
      code: 0,
      data: res
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  'POST /user': addUser,
  'GET /user': getUser,
  'PUT /user/:id': updateUser,
  'DELETE /user/:id': deleteUser
}
