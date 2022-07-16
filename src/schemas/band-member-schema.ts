import Joi from 'joi'

const bandMemberSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .pattern(/^[\u10D0-\u10F0]+$/)
    .messages({
      'string.base': "Band member's name should be a string.",
      'string.required': "Band member's name is required.",
      'string.min': "Band member's name should be at least 3 chars long.",
      'string.pattern':
        "Band member's name should contain only Georgian letters.",
    }),
  instrument: Joi.string()
    .required()
    .min(2)
    .pattern(/^[\u10D0-\u10F0]+$/)
    .messages({
      'string.base': 'Instrument field should be a string.',
      'string.required': 'Instrument field is required.',
      'string.min': 'Instrument field should be at least 3 chars long.',
      'string.pattern':
        'Instrument field should contain only Georgian letters.',
    }),
  orbitRadius: Joi.number().required().positive().messages({
    'number.base': 'Orbit radius should be a number.',
    'number.required': 'Orbit radius is required.',
    'number.positive': 'Orbit radius should be a positive number.',
  }),
  color: Joi.string()
    .required()
    .length(7)
    .pattern(/^#([0-9a-fA-F]){6}$/)
    .uppercase()
    .messages({
      'string.base': 'Color should be a string.',
      'string.required': 'Color is required.',
      'string.min': 'Color value should be 7 chars long.',
      'string.pattern': 'Color value should match Hex color code format.',
    }),
  biography: Joi.string()
    .required()
    .pattern(/^[\u10D0-\u10F0]+$/)
    .messages({
      'string.base': 'Biography should be a string.',
      'string.required': 'Biography is required.',
      'string.pattern': 'Biography should contain only Georgian letters.',
    }),
})

export default bandMemberSchema
