BIN = node_modules/.bin
SPEC_FILES = find ./src -name '*.spec.js'

build-dev: clean install-deps
	@echo "Building project with debugging symbols..."
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc -d dist ./src --source-maps --watch --copy-files

build-test: clean
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc-test -d dist ./src --source-maps --watch --copy-files

build: clean install-deps
	@echo "Building project..."
	@mkdir dist
	NODE_ENV=production $(BIN)/babel --babelrc ./.babelrc -d dist ./src

changelog:
	@rm -f CHANGELOG.md
	$(BIN)/conventional-changelog -p angular -i CHANGELOG.md -s

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf ./dist ./debug

clean-coverage:
	@echo "Removing old coverage data..."
	@rm -rf ./coverage

clean-node:
	@echo "Removing Node Modules"...
	@rm -rf ./node_modules/

coverage: clean-coverage install-deps
	@echo "Generating code coverage reports..."
	$(SPEC_FILES) | xargs $(BIN)/istanbul cover $(BIN)/_mocha -- --compilers js:babel-core/register --require ./etc/testing/bootstrapper.js
	$(BIN)/coveralls < coverage/lcov.info

build-service-docs: install-deps
	@echo "Generating service documentation to ./docs/http-api/services.html"
	$(BIN)/raml2html ./docs/api.raml > ./docs/http-api/services.html

install: clean-node build

install-deps:
	@echo "Installing Node modules..."
	@npm install

lint:
	@echo "Linting the project for syntax errors"
	$(BIN)/eslint .

test: install-deps lint type-check
	@echo "Running specifications..."
	$(SPEC_FILES) | xargs $(BIN)/_mocha --compilers js:babel-core/register --colors --require ./etc/testing/bootstrapper.js

test-only:
	@echo "Running specifications..."
	$(SPEC_FILES) | xargs $(BIN)/_mocha --compilers js:babel-core/register --colors --require ./etc/testing/bootstrapper.js

watch-tests:
	@echo "Watching filesystem for changes, running specifications..."
	$(SPEC_FILES) | xargs $(BIN)/_mocha --compilers js:babel-core/register --colors --watch --require ./etc/testing/bootstrapper.js

type-check:
	@echo "Checking type usage"
	$(BIN)/flow

vendor:
	@echo "Shrink-wrapping dependencies"
	@npm shrinkwrap

.PHONY: build build-dev changelog clean clean-coverage coverage install install-deps lint test test-only type-check vendor
