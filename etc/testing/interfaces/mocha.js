//@flow

declare function describe(description: string, spec: Function): void;
declare function it (description: string, spec: ?Function): void;
declare function before(setupLambda: Function): void;
declare function beforeEach(setupLambda: Function): void;
declare function after(teardownLambda: Function): void;
declare function afterEach(teardownLambda: Function): void;
