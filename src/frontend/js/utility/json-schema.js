import * as _ from 'underscore';

export const initialFields = (schema) => {
    let fields = {};
    _.each(schema.properties, function(def, field) {
        fields[field] = def.default==undefined ? null : def.default;
    });
    return fields;
}
