const { defaultsDeep } = require('lodash')

const Options = module.exports = {}

Options.from = function (_options) {
  const options = defaultsDeep({}, _options, Options.defaults)

  // relativeTo
  if (!options.relativeTo) {
    options.relativeTo = process.cwd()
  }

  // Enable CORS on dev
  let routeOptions = options.routes
  if (options.dev && routeOptions.cors === undefined) {
    routeOptions.cors = { credentials: true }
  }

  // routeTable
  if (options.routeTable === undefined) {
    options.routeTable = options.dev
  }

  // Errors
  if (options.devErrors) {
    if (options.devErrors.showErrors === undefined) {
      options.devErrors.showErrors = options.dev
    }
  }

  return options
}

Options.defaults = {
  dev: process.env.NODE_ENV !== 'production',
  relativeTo: '',
  routeTable: undefined,
  registrations: [],
  routes: [],
  prefix: '/',
  devErrors: {
    showErrors: undefined,
    useYouch: true
  },
  server: {
    cache: null,
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    routes: {
      cors: undefined
    }
  }
}
