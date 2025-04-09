class DataTypeValidator {
    static determineType(value) {
        if (value === 'true' || value === 'false') return 'boolean';
        if (!isNaN(value) && value.includes('.')) return 'double';
        if (!isNaN(value)) return 'integer';
        return 'string';
    }

    static validate(value, expectedType) {
        switch (expectedType) {
            case 'boolean':
                return value === 'true' || value === 'false';
            case 'double':
                return !isNaN(value) && value.includes('.');
            case 'integer':
                return !isNaN(value) && !value.includes('.');
            case 'string':
                return true;
            default:
                return false;
        }
    }

    static convert(value, type) {
        switch (type) {
            case 'boolean':
                return value === 'true';
            case 'double':
                return parseFloat(value);
            case 'integer':
                return parseInt(value);
            default:
                return value;
        }
    }
}

module.exports = DataTypeValidator;     