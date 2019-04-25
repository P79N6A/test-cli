const {
  sortDependencies,
} = require('./utils')

module.exports = {
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    }
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Project name"
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A futu5_ipo project',
    },
    version: {
      type: "input",
      message: "project's version",
      default: "1.0.0"
    },
    license: {
      type: "string",
      label: "License",
      default: "ISC"
    },
    cssUi: {
      type: "comfirm",
      message: "Use css-ui?",
      default: true
    },
    xhr: {
      type: "comfirm",
      message: "Use tool-xhr2?",
      default: true
    },
    sass: {
      type: "comfirm",
      message: "Use sass?",
      default: true
    },
    // css 工程化 - Start
    postcssLoader: {
      type: "comfirm",
      message: "Use postcss-loader?",
      default: true
    },
    autoprefix: {
      when: 'postcssLoader',
      type: "comfirm",
      message: "Use autoprefix",
      default: true
    }
    // css 工程化 - End
  },
  filters: {
    'postcss.config.js': 'postcssLoader', // postcss 配置文件
  },
  skipInterpolation: [
    'client/components/*/*.vue'
  ],
  complete: function(data, { chalk }) {
    const green = chalk.green
    sortDependencies(data, green)
  }
}
