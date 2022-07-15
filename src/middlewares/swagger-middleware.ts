import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerMiddleware = () => {
  const swaggerDocument = YAML.load('./build/config/swagger.yaml')

  return [
    ...swaggerUI.serve,
    swaggerUI.setup(swaggerDocument, {
      customSiteTitle: 'FolkSoul',
      customCss: '.swagger-ui .topbar { display: none }',
    }),
  ]
}

export default swaggerMiddleware
