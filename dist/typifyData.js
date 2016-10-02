'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function typifyData(data, types) {
	if (Array.isArray(data)) {
		data.forEach(function (item) {
			typifyData(item, types);
		});
	} else {
		Object.keys(types).forEach(function (keypath) {
			var type = types[keypath];

			if (keypath == '') {
				data.__type = type;
			} else {
				var idx = keypath.indexOf('.');
				var key = idx == -1 ? keypath : keypath.slice(0, idx);

				var value = data[key];

				if (value != null) {
					if (typeof value != 'object') {
						throw new TypeError('Cannot typify non-object data');
					}

					if (Array.isArray(value)) {
						typifyData(value, _defineProperty({}, idx == -1 ? '' : keypath.slice(idx + 1), type));
					} else if (idx == -1) {
						value.__type = type;
					} else {
						typifyData(value, _defineProperty({}, keypath.slice(idx + 1), type));
					}
				}
			}
		});
	}

	return data;
}

module.exports = typifyData.default = typifyData;
