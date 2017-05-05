# Cocacola Fe
Website For Cocacola Built By AngularJS

## Installation & Usage

```
$ cd /your-project-path
$ npm install
$ cp ./cocacola.conf /nginx-configuration-path
$ sudo nginx -s reload
```

#### Full Compilation
After installing all node modules dependence, you can complie all code with the command:
```
$ npm run build
```
This command will clean the target dictionary ( if exists ) and complie all your html, css, sass, javascript ( ECMA Script2015 will be converted to ES5 by babel )


#### Minimize Compilation
Minimize compilation is also supported while resources are never been changed from last build:
```
$ npm run dev
```


#### Clean Release Dictionary
Delete dictionary dist or use the command:
```
$ gulp clean
```

After complie source code and reset nginx configuration server is available at [127.0.0.1:8081](127.0.0.1:8081)

## dictionary tree

```
.
├── dist
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   ├── blog-data-web
│   │   └── html
│   └── index.html
├── src
│   ├── assets
│   │   ├── angular
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   ├── js
│   │   └── sass
│   ├── components
│   │   ├── script
│   │   ├── sharedPlugins
│   │   ├── app.modules.js
│   │   └── app.restapi.js
│   ├── templates
│   │   ├── INE
│   │   ├── confirmPage
│   │   ├── default
│   │   ├── header
│   │   └── nav
│   ├── app.js
│   └── index.html
├── Dockerfile
├── LICENSE
├── README.md
├── cocacola.dev.conf
├── cocacola.product.conf
├── favicon.ico
├── gulpfile.js
├── npm-debug.log
└── package.json

```
