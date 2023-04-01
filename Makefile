install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage --coverageProvider=v8
