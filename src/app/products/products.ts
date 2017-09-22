export class Product {
	_id: String;//added to resolve kthe update result to show
	id: String;
	name: String;
	sku: String;
	price: Number;
	constructor(private values: Object = {}) {
		Object.assign(this, values);
	}
}