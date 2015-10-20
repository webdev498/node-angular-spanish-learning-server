BIN = node_modules/.bin

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf ./dist

install-dev-deps:
	@echo "Installing Node modules... (development)"
	@npm install --dev

install-deps:
	@echo "Installing Node modules... (production)"
	@npm install

clean-node:
	@echo "Removing Node Modules"...
	@rm -rf ./node_modules/

clean-coverage:
	@echo "Removing old coverage data..."
	@rm -rf ./coverage

install: clean-node build

vendor:
	@echo "Shrink-wrapping dependencies"
	@npm shrinkwrap

test: install-dev-deps
	@echo "Running specifications..."
	$(BIN)/_mocha --compilers js:babel/register --colors --recursive "lib/**/*.spec.js"

coverage: clean-coverage
	@echo "Generating code coverage reports..."
	$(BIN)/istanbul cover --report html $(BIN)/_mocha -- --compilers js:babel/register --recursive "lib/**/*.spec.js"

build: clean install-deps
	@echo "Building project..."
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc -d dist .

build-dev: clean install-dev-deps
	@echo "Building project with debugging symbols..."
	@mkdir dist
	$(BIN)/babel --babelrc ./.babelrc --plugins source-map-support -d dist/debug . --source-maps

.PHONY: clean install-dev-deps install-deps vendor coverage test build build-dev install clean-coverage
