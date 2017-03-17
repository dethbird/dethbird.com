# Explosioncorp // Ingest
Ingestion phase.

## Deploy

### clone from GIT
```bash
git clone https://github.com/dethbird/ingest.explosioncorp.git ingest
cd ingest
```

### Initialize
#### Composer install base required libs for the build script to function:

```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar install
```

#### Make sure frontend src is in NODE_PATH
```bash
export NODE_PATH=$NODE_PATH:./src/frontend/js/
```

#### Copy .env from .env.shadow and edit values
```bash
cp .env.shadow .env
vim .env
```

### Build script

#### Help

```bash
php scripts/build.php --help
```

displays help:

```bash

--cache/--cache
     Clear cache and reset permissions of cache directory


--configs/--configs
     Publish configs from .env


--css/--css
     Build .css files from .less


--help
     Show the help page for this command.


--js/--javascript
     Broswerify and minify the js


--js-page/--javascript-page <argument>
     File in "src/frontend/js/pages/<page>.js" to build


--npm/--npm
     Install node modules from package.json


--php/--php
     PHP/Composer install


--ugly/--uglify
     Uglify the compiled js (leave empty in dev)

```

#### build

##### build production:
All the options for the first time build.
```bash
php scripts/build.php --cache --configs --npm --js --php --ugly
```

### Permissions

```bash
chmod 755 ingest
cd ingest
chmod 755 public/
chmod 644 public/index.php public/.htaccess
```
