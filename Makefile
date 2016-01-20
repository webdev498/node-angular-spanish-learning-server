BIN = node_modules/.bin
SPEC_FILES = find ./src -name '*.spec.js'

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf ./dist ./debug

clean-node:
	@echo "Removing Node Modules"...
	@rm -rf ./node_modules/

clean-coverage:
	@echo "Removing old coverage data..."
	@rm -rf ./coverage

install: clean-node build

install-deps:
	@echo "Installing Node modules..."
	@npm install

vendor:
	@echo "Shrink-wrapping dependencies"
	@npm shrinkwrap

test: install-deps
	@echo "Running specifications..."
	$(SPEC_FILES) | xargs $(BIN)/_mocha --compilers js:babel-core/register --colors --require ./etc/testing/bootstrapper.js

changelog:
	@rm CHANGELOG.md
	$(BIN)/conventional-changelog -p angular -i CHANGELOG.md -w

coverage: clean-coverage install-deps
	@echo "Generating code coverage reports..."
	$(SPEC_FILES) | xargs $(BIN)/istanbul cover $(BIN)/_mocha -- --compilers js:babel-core/register --require ./etc/testing/bootstrapper.js
	$(BIN)/coveralls < coverage/lcov.info

build: clean install-deps
	@echo "Building project..."
	@mkdir dist
	NODE_ENV=production $(BIN)/babel --babelrc ./.babelrc -d dist ./src

build-dev: clean install-deps
	@echo "Building project with debugging symbols..."
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc -d dist ./src --source-maps --watch


.PHONY: clean install-deps vendor coverage test build build-dev install clean-coverage changelog
