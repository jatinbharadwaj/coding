const DataTypeValidator = require('./dataTypeValidator');

class ValueObject {
    constructor(attributes = []) {
        this.attributes = new Map();
        this.attributeTypes = new Map();
        this.addAttributes(attributes);
    }

    addAttributes(attributes) {
        for (let i = 0; i < attributes.length; i += 2) {
            const key = attributes[i];
            const value = attributes[i + 1];
            this.addAttribute(key, value);
        }
    }

    addAttribute(key, value) {
        if (this.attributeTypes.has(key)) {
            const expectedType = this.attributeTypes.get(key);
            if (!DataTypeValidator.validate(value, expectedType)) {
                throw new Error('Data Type Error');
            }
        } else {
            const type = DataTypeValidator.determineType(value);
            this.attributeTypes.set(key, type);
        }

        const convertedValue = DataTypeValidator.convert(value, this.attributeTypes.get(key));
        this.attributes.set(key, convertedValue);
    }

    getAttribute(key) {
        return this.attributes.get(key);
    }

    hasAttribute(key, value) {
        if (!this.attributes.has(key)) return false;
        const convertedValue = DataTypeValidator.convert(value, this.attributeTypes.get(key));
        return this.attributes.get(key) === convertedValue;
    }

    toString() {
        const entries = [];
        for (const [key, value] of this.attributes) {
            entries.push(`${key}: ${value}`);
        }
        return entries.join(', ');
    }
}

module.exports = ValueObject;