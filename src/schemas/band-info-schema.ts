import Joi from 'joi'

const bandInfoSchema = Joi.string().allow('').messages({
  'string.base': 'Band info should be a string.',
})

export default bandInfoSchema
