# ActivKonnect Ionic Template
## An nice boilerplate for awesome tools

This is probably the standard template used when ActivKonnect creates an Ionic app.
It fits the basic needs we have:

- Bower integration
- Angular, Ionic
- Base Cordova Plugins (with their Angular service)
- LESS compilation
- Build system (with minification)

### Inspirations

- [cordova-app-hello-world](https://github.com/apache/cordova-app-hello-world)
- [ionic-app-base](https://github.com/driftyco/ionic-app-base)
- [ionic-starter-blank](https://github.com/driftyco/ionic-starter-blank)
- [onic-starter-tabs](https://github.com/driftyco/ionic-starter-tabs)

### Tools
Be sure to update to latest versions for:

*(restart your terminal before checking new version)*

- Node (`npm install -g n && n stable` → `node -v` → 0.12.7)
- NPM (`npm install -g npm` → `npm -v` → 2.13.3)
- Bower (`npm install -g bower` → `bower -v` → 1.4.1)
- Cordova (`npm install -g cordova` → `cordova -v` → 5.1.1)
- Ionic CLI (`npm install -g ionic` → `ionic -v` → 1.6.4)
- Gulp (`npm install -g gulp` → `gulp -v` → 3.9.0)

**Yeah, you got some nice tools there :)**

### Developping

#### Install all what's in "Tools"
Good luck ;p

#### Getting started
- Clone this boilerplate where you need
- **Before any Cordova-related stuff**
Replace all occurences of `akIonicTpl`, in the project with a relevant things.
Customize bower.json, package.json, ionic.project & **config.xml** (very important)
with suitable information.
- Replace icon.png (you can do it later)
- `bower install`, `npm install`
- `cordova platform add android` (or iOS, as you wish)


#### Install Cordova plugins
```bash
cordova plugin add com.ionic.keyboard
cordova plugin add org.apache.cordova.statusbar
```

#### Serve
Launch a development server with LiveReload using this awesome and so magical command:

`gulp dev`

See results for the built version with:

`gulp show` (and open your browser on [localhost:8101](http://localhost:8101/))

### Structure
There is only one important folder (app), the others are just here not to disturb our tools.

### License
See the [LICENSE](https://github.com/ActivKonnect/ak-ionic-tpl/blob/master/LICENSE) file.
