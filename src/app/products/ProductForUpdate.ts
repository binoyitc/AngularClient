export class ProductForUpdate {	
	id: String;
	name: String;
	sku: String;
	price: Number;
	/*constructor(private values: Object = {}) {
		Object.assign(this, values);
	}*/
	constructor(id: String, name: String, sku: String, price: Number) {		
		this.id = id;
		this.name = name;
		this.sku = sku;
		this.price = price;
	}
}