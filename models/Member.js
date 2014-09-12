var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Member = new keystone.List('Member', {
  autokey: { from: 'firstName lastName', path: 'key', unique: true },
  defaultSort: '-lastName'
});

Member.add({
  firstName: { type: String, required: true, initial: true },
  lastName: { type: String, require: true, initial: true },
  title: { type: String, require: true, initial: true },
  bio: { type: String, require: true, initial: true },
  images: { type: Types.CloudinaryImages, default: "" }
});

Member.defaultColumns = "firstName, lastName, bio, title"
Member.register();
