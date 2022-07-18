import Joi from 'joi'

const bandInfoSchema = Joi.string().required().messages({
  'string.base': 'Band info should be a string.',
  'string.required': 'Band info is required.',
})

export default bandInfoSchema
