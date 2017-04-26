//@flow

declare interface Enumerable<T1, T2> {
  countBy: (iteree: ?(item: T1) => void) => Object;
  difference: (values: Array<T1>) => T2;
  drop: (count: number) => T2;
  each: (iterator: (item: T1) => void) => void;
  every: (predicate: (item: T1) => boolean) => T2;
  filter: (predicate: (item: T1) => boolean) => T2;
  find: (predicate: (item: T1) => boolean, startIndex: ?number) => T1 | null;
  first: (predicate: (item: T1) => boolean) => T1;
  forEach: (iteree: (item: T1) => void) => void;
  groupBy: (iteree: (item: T1) => void) => Object;
  head: () => T1;
  includes: (value: any, startIndex: ?number) => boolean;
  indexOf: (value: any, startIndex: ?number) => number;
  initial: () => T2;
  invokeMap: (path: Array<any> | Function | string, ...arguments: any[]) => Array<any>;
  isEmpty: () => boolean;
  last: () => T1;
  lastIndexOf: (value: any, startIndex: ?number) => number;
  map: (iteree: (item: T1) => any) => Array<any>;
  max: () => T2;
  maxBy: (iteree: (item: T1) => any) => T2;
  min: () => T2;
  minBy: (iteree: (item: T1) => any) => T2;
  reduce: (iteree: (accumulator: any, item: T1) => any, accumulator: any) => any;
  reduceRight: (iteree: (accumulator: any, item: T1) => any, accumulator: any) => any;
  reject: (predicate: (item: T1) => boolean) => T2;
  shuffle: () => T2;
  size: () => number;
  some: (predicate: (item: T1) => boolean) => boolean;
  sortBy: (iteree: (item: T1) => any) => T2;
  tail: () => T1;
  take: (count: ?number) => T2;
  toArray: () => Array<T1>;
  withOut: (values: Array<any>) => T2;
}

declare interface Collection<T> {
  models: Array<T>;
  add: (models: Array<T> | T, options: Object) => BookshelfCollection;
  at: (index: number) => T;
  attach: (ids: Array<number> | Array<T>, options: Object) => Promise<BookshelfCollection>;
  clone: () => BookshelfCollection;
  count: (column: ?string, options: ?Object) => Promise<number>;
  create: (modelAttributes: Object, options: ?Object) => Promise<T>;
  detatch: (ids: Array<number> | Array<T>, options: ?Object) => Promise<null>;
  fetch: (options: ?Object) => Promise<BookshelfCollection>;
  fetchOne: (options: ?Object) => Promise<T | null>;
  findWhere: (options: ?Object) => Promise<T | null>;
  get: (id: string | number) => T | null;
  invokeThen: (method: string, options: ?Object) => Promise<any>;
  load: (relations: string | Array<string>, options: ?Object) => Promise<BookshelfCollection>;
  off: (listernName: string) => void;
  on: (listernName: string, handler: Function) => void;
  once: (eventNames: string, handler: Function) => void;
  order: (fieldName: 'string', direction: string) => BookshelfCollection;
  parse: (rawDatabaseResult: Array<Object>) => BookshelfCollection;
  pluck: (attributeName: string | Array<string>) => Array<any>;
  pop: () => T;
  push: (model: T) => BookshelfCollection;
  query: (...arguments: any[]) => BookshelfCollection | QueryBuilder;
  reduceThen: (iterator: Function, initialValue: any, context: Object) => Promise<any>;
  remove: (models: Array<T>, options: ?Object) => Array<T>;
  reset: (models: Array<T>, option: ?Object) => Array<T>;
  resetQuery: () => BookshelfCollection;
  serialize: (option: ?Object) => Object;
  set: (models: Array<T>, option: ?Object) => BookshelfCollection;
  shift: () => void;
  slice: (begin: ?number, end: ?number) => Array<BookshelfCollection>;
  through: (interim: T, throughForeignKey: ?string, otherKey: ?string, throughForeignKeyTarget: ?string, otherKeyTarget: ?string) => BookshelfCollection;
  toJSON: () => Array<Object>;
  trigger: (eventName: string) => void;
  triggerThen: (eventName: string, ...arguments: any[]) => Promise<any>;
  unshift: (model: T) => void;
  updatePivot: (attributrs: Object, options: ?Object) => Promise<number>;
  where: (attributes: Object, first: any) => Array<T>;
  withPivot: (columns: Array<string>) => BookshelfCollection;
}

declare interface QueryBuilder {}

// declare interface DatabaseTransaction {}

declare interface BookshelfModel {
  hasTimestamps: boolean;
  id: string;
  tableName: string;
  idAttribute: string;
  relations: Object;
  belongsTo: (target: BookshelfModel, foreignKey: ?string, foreignKeyTarget: ?string) => BookshelfModel;
  belongsToMany: (target: BookshelfModel, table: ?string, foreignKey: ?string, otherKey: ?string) => BookshelfCollection;
  clear: () => BookshelfModel;
  clone: () => BookshelfModel;
  count: (column: ?string, options: ?Object) => Promise<number>;
  destroy: (options: ?Object) => Promise<BookshelfModel>;
  escape: (attribute: string) => string;
  extend: (prototypeProperties: Object, classProperties: Object) => Function;
  fetch: (options: ?Object) => Promise<BookshelfModel | null>;
  fetchAll: (options: ?Object) => Promise<BookshelfCollection>;
  fetchPage: (options: Object) => Promise<BookshelfModel | null>;
  format: (attributes: Object) => Object;
  get: (attribute: string) => any;
  has: (attribute: string) => boolean;
  hasChanged: (attribute: ?string) => boolean;
  hasMany: (target: BookshelfModel, foreignKey: ?string, foreignTarget: ?string) => BookshelfCollection;
  hasOne: (target: BookshelfModel, foreignKey: ?string, foreignTarget: ?string) => BookshelfModel;
  isNew: () => boolean;
  load: (relations: string | Array<string>, options: ?Object) => Promise<BookshelfModel>;
  morphMany: (target: BookshelfModel, name: ?string, columnNames: ?Array<string>, morphValue: ?string) => BookshelfCollection;
  morphOne: (target: BookshelfModel, name: ?string, columnNames: ?Array<string>, morphValue: ?string) => BookshelfCollection;
  morphTo: (name: string, columnNames: ?Array<string>, target: BookshelfModel) => BookshelfModel;
  off: (eventName: string) => void;
  on: (eventName: string, handler: Function) => void;
  once: (names: string, handler: Function) => void;
  orderBy: (fieldName: string, direction: string) => BookshelfModel;
  parse: (atrributes: Object) => Object;
  previous: (attributeName: string) => any;
  previousAttributes: () => Object;
  query: (arguments: Function | Object | string) => BookshelfModel;
  refresh: (options: Object) => Promise<BookshelfModel>;
  related: (modelName: string) => ?BookshelfModel | ?BookshelfCollection;
  resetQuery: () => BookshelfModel;
  save: (attributeName: ?string, attributeValue: ?string, attributes: ?Object, options: ?Object) => Promise<BookshelfModel>;
  serialize: (options: ?Object) => Object;
  set: (attributeName: string, attributeValue: any, options: ?Object) => BookshelfModel;
  through: (interimModel: BookshelfModel, throughForeignKey: ?string, otherKey: ?string, throughForeignKeyTarget: ?string, otherKeyTarget: ?string) => BookshelfCollection;
  toJSON: () => Object;
}

type BookshelfCollection = Collection<BookshelfModel> & Enumerable<BookshelfModel, Collection<BookshelfModel>>;
