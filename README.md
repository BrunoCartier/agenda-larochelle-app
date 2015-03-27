# ActivKonnect Ionic Template
## An nice boilerplate for awesome tools

This is probably the standard template used when ActivKonnect creates an Ionic app.
It fits the basic needs we have:

- Bower integration
- Angular, Ionic
- Base Cordova Plugins (with their Angular service)
- LESS compilation
- Build system (with minification)

### Tools
Be sure to update to latest versions for:

*(restart your terminal before checking new version)*

- Node (`npm install -g n && n stable` → `node -v` → 0.12.1)
- NPM (`npm install -g npm` → `npm -v` → 2.7.3)
- Bower (`npm install -g bower` → `bower -v` → 1.3.12)
- Cordova (`npm install -g cordova` → `cordova -v` → 2.7.3)
- Ionic CLI (`npm install -g ionic` → `ionic -v` → 1.3.18)
- Gulp (`npm install -g gulp` → `gulp -v` → 3.8.11)

**Yeah, you got some nice tools there :)**

### Developping

#### Install all what's in "Tools"

#### Install Cordova plugins
```bash
cordova plugin add com.ionic.keyboard
cordova plugin add org.apache.cordova.statusbar
```

#### Serve
Launch a development server with LiveReload using this awesome and so magical command:

`gulp dev`

### Structure
There is only one important folder (app), the others are just here not to disturb our tools.

### License
See the [LICENSE](https://github.com/ActivKonnect/ak-ionic-tpl/blob/master/LICENSE) file.
