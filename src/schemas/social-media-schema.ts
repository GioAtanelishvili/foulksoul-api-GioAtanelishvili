import Joi from 'joi'

const socialMediaSchema = Joi.object({
  name: Joi.string().required().lowercase().trim().alphanum().min(2).messages({
    'string.base': 'Social media name should be a string.',
    'string.required': 'Social media name is required.',
    'string.alphanum': 'Social media name should be alphanumeric.',
    'string.min': 'Social media name should be at least 2 chars long.',
  }),
  url: Joi.string()
    .required()
    .uri({
      scheme: ['https'],
    })
    .messages({
      'string.base': 'Social media URL should be a string.',
      'string.required': 'Social media URL is required.',
      'string.uriCustomScheme':
        'Social media URL should be a valid URL with https scheme.',
    }),
})

export default socialMediaSchema
