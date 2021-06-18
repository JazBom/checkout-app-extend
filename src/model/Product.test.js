import { Product } from "./Product";

describe.only("Product", () => {
// create new customer
// basic happy path
it("creates a product object with settings based on product Class", () => {
    const testProduct = new Product(
        1, 
        'testName',
        'description',
        299.99,
        '',
        ''
        );
    expect(testProduct).toEqual(
        {
        id: 1,
        name: 'testName',
        description: 'description',
        price: 299.99,
        imageUrl: '',
        imageName: ''
    });
});

// sad path
it("if id is invalid type, throw error", () => {
    expect(() => {
        new Product(
        'number', 
        'testName',
        'description',
        299.99,
        '',
        ''
        );
    }
    )
    .toThrow('error');
});

});