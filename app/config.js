const os = require('os')

module.exports = {
  defaults: {
    services: {
      uploadService: 'imgur',
      shortenerService: 'is.gd'
    },

    shortcuts: {
      screenshotSelection: 'command+alt+s',
      screenshotFull: '',
      screenshotWindow: '',
      shortenUrl: 'command+alt+0'
    }
  },

  icons: {
    app: `${__dirname}/resources/icon.icns`,
    tray: {
      default: `${__dirname}/resources/images/menubar/IconTemplate@2x.png`,
      active: `${__dirname}/resources/images/menubar/active/IconTemplate@2x.png`
    }
  },

  paths: {
    application: `${os.homedir()}/.katana`,
    uploads: `${os.homedir()}/.katana/uploads`
  },

  services: {
    imgur: {
      token: '8049ae3132218f0'
    },

    pomf: {
      'aww.moe': {
        uploadPath: 'https://aww.moe/upload.php',
        resultPath: 'https://aww.moe'
      },
      'mixtape.moe': {
        uploadPath: 'https://mixtape.moe/upload.php',
        resultPath: 'https://my.mixtape.moe'
      },
      'pomf.cat': {
        uploadPath: 'https://pomf.cat/upload.php',
        resultPath: 'https://a.pomf.cat'
      },
      'nya.is': {
        uploadPath: 'https://nya.is/upload.php',
        resultPath: 'https://u.nya.is'
      },
      'cocaine.ninja': {
        uploadPath: 'https://cocaine.ninja/upload.php',
        resultPath: 'https://a.cocaine.ninja'
      },
      'desu.sh': {
        uploadPath: 'https://desu.sh/upload.php',
        resultPath: 'https://a.desu.sh'
      },
      'comfy.moe': {
        uploadPath: 'https://comfy.moe/upload.php',
        resultPath: 'https://comfy.moe'
      },
      'safe.moe': {
        uploadPath: 'https://safe.moe/upload.php',
        resultPath: 'https://a.safe.moe'
      }
    },

    shorteners: ['is.gd', 'v.gd']
  }
}
