BIN = node_modules/.bin

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

install-dev-deps:
	@echo "Installing Node modules... (development)"
	@npm install --dev

install-deps:
	@echo "Installing Node modules... (production)"
	@npm install

vendor:
	@echo "Shrink-wrapping dependencies"
	@npm shrinkwrap

test: clean install-dev-deps
	@echo "Running specifications..."
	$(BIN)/_mocha --compilers js:babel-core/register --colors --recursive "./**/specs/*.spec.js"

coverage: clean-coverage
	@echo "Generating code coverage reports..."
	$(BIN)/istanbul cover --report html $(BIN)/_mocha -- --compilers js:babel-core/register --recursive "lib/**/*.spec.js"

build: clean install-deps
	@echo "Building project..."
	@mkdir dist
	NODE_ENV=production $(BIN)/babel --babelrc ./.babelrc -d dist .

build-dev: clean install-dev-deps
	@echo "Building project with debugging symbols..."
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc --plugins source-map-support -d debug . --source-maps


.PHONY: clean install-dev-deps install-deps vendor coverage test build build-dev install clean-coverage
