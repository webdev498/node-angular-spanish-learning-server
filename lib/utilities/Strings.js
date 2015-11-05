// This file contains utility methods for operating on String objects and iterals

import _pluralize from 'pluralize';

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export const pluralize  = (string) => _pluralize(string);
