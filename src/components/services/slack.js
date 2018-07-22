/*
 *  Katana - a powerful, open-source screenshot utility
 *
 *  Copyright (C) 2018, Gage Alexander <gage@washedout.co>
 *
 *  Katana is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  Katana  is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Katana. If not, see <http://www.gnu.org/licenses/>.
 */
const electron = require('electron')
const { app, shell, BrowserWindow, Menu } = electron
const electronLocalshortcut = require('electron-localshortcut');
const prompt = require('electron-prompt');

const request = require('request')
const fs = require('fs')
const config = require('../../config')

module.exports = class {
  static upload (file, callback) {
    this.setUploadInfo().then(function (channels) {
        console.log('Uploading image to slack...')
        
        const token = config.services.slack.token

        if (!token) {
          return callback(null, 'No authorization token found in configuration')
        }

        const options = {
          url: 'https://slack.com/api/files.upload',
          headers: {
            'cache-control': 'no-cache'
          }
        }

        const post = request.post(options, (error, req, body) => {
          if (error) {
            return callback(null, error)
          }
        })

        let form = post.form()

        form.append('token', token)
        form.append('channels', channels)
        form.append('filename', 'screenshot')
        form.append('file', fs.createReadStream(file))
    }).catch(function (error) {
        console.log('Upload cancelled by user....')
    });
  }
  
  static setUploadInfo() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('Select channel...')
            if (this.window) return

            // TODO open window and receive user inputs for channel
            this.window = new BrowserWindow({
              width: 480,
              height: 300,
              resizable: false,
              minimizable: false,
              maximizable: false,
              fullscreenable: false,
              alwaysOnTop: true,
              backgroundColor: '#2e2e2e',
              frame: false,
              show: false,
              hasShadow: false,
              autoHideMenuBar: true
            })

            this.window.loadURL(`file://${__dirname}/../../app/view/slack.html`)

            this.window.on('closed', () => {
              this.window = null
            })

            this.window.webContents.on('new-window', (e, url) => {
              e.preventDefault()
              shell.openExternal(url)
            })

            this.window.once('ready-to-show', () => {
              this.window.show()
            })
            
            electronLocalshortcut.register(this.window, 'Escape', () => {
              this.window.close();
              reject(new Error('Error'));
            });
            
            electronLocalshortcut.register(this.window, 'Enter', () => {
              this.window.close();
              resolve('<user input channel>');
            });
        }, 16);
      });
    
  }
}
