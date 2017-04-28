//@flow
import Category from 'categories/models/Category';

export default class CategoryService {
 static create({ name }: Object): Promise<Category> {
   return Category.forge({ name }).save();
 }

 static all(): Promise<Array<Category>> {
   return Category.where({active: true}).fetchAll();
 }

 static find(...args: Array<any>) {
   return Category.where(...args).fetchAll();
 }


 static async remove({ id }: Object): Promise<boolean> {
  await Category.forge({ id }).save({active: false});
  return true;
 }

 static update({ id, name }: Object): Promise<Category> {
  return Category.forge({ id }).save({ name });
 }

 static random(count: number) {
  return Category.query(builder => {
   builder.orderByRaw('random()');
   builder.limit(count);
  }).fetchAll();
 }
}
