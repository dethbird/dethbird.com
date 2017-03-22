import * as jsonSchema from 'utility/json-schema';

describe('jsonSchema', () => {
    test('initialFields', () => {
        const schema = {
        	"$schema": "http://json-schema.org/draft-03/schema",
        	"properties": {
        		"username": {
        			"required": true,
        		    "type": "string"
        		},
        		"password": {
        			"required": true,
        		    "type": "string"
        		}
        	}
        };

        const fields = jsonSchema.initialFields(schema);

        expect(fields.username !== undefined);
        expect(fields.username == null);
        expect(fields.password !== undefined);
        expect(fields.username == null);
    });

    test('initialFields with defaults', () => {
        const schema = {
        	"$schema": "http://json-schema.org/draft-03/schema",
        	"properties": {
        		"field1": {
        			"required": true,
        		    "type": "string",
                    "default": "pizza"
        		},
        		"field2": {
        			"required": true,
        		    "type": "string",
                    "default": "pizza"
        		}
        	}
        };

        const fields = jsonSchema.initialFields(schema);

        expect(fields.field1 == "pizza");
        expect(fields.field2 == "party");
    });
});
