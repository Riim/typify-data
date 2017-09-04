"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function typifyData(data, types) {
    if (Array.isArray(data)) {
        data.forEach(function (item) {
            typifyData(item, types);
        });
    }
    else {
        Object.keys(types).forEach(function (keypath) {
            var type = types[keypath];
            if (keypath == '') {
                data.__type = type;
            }
            else {
                var idx = keypath.indexOf('.');
                var key = idx == -1 ? keypath : keypath.slice(0, idx);
                var value = data[key];
                if (value != null) {
                    if (typeof value != 'object') {
                        throw new TypeError('Cannot typify non-object data');
                    }
                    if (Array.isArray(value)) {
                        typifyData(value, (_a = {}, _a[idx == -1 ? '' : keypath.slice(idx + 1)] = type, _a));
                    }
                    else if (idx == -1) {
                        value.__type = type;
                    }
                    else {
                        typifyData(value, (_b = {}, _b[keypath.slice(idx + 1)] = type, _b));
                    }
                }
            }
            var _a, _b;
        });
    }
    return data;
}
exports.typifyData = typifyData;
