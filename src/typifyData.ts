export default function typifyData(data: Object, types: { [keypath: string]: string }): Object {
	if (Array.isArray(data)) {
		data.forEach(item => {
			typifyData(item, types);
		});
	} else {
		Object.keys(types).forEach(keypath => {
			let type = types[keypath];

			if (keypath == '') {
				data['__type'] = type;
			} else {
				let idx = keypath.indexOf('.');
				let key = idx == -1 ? keypath : keypath.slice(0, idx);

				let value = data[key];

				if (value != null) {
					if (typeof value != 'object') {
						throw new TypeError('Cannot typify non-object data');
					}

					if (Array.isArray(value)) {
						typifyData(value, { [idx == -1 ? '' : keypath.slice(idx + 1)]: type });
					} else if (idx == -1) {
						value['__type'] = type;
					} else {
						typifyData(value, { [keypath.slice(idx + 1)]: type });
					}
				}
			}
		});
	}

	return data;
}
