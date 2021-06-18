import { Customer } from "./Customer";

describe.only("Customer", () => {
// create new customer
// basic happy path
it("creates a customer object with default settings based on default customer Class", () => {
    const testCustomer = new Customer(
        1, 
        'testName',
        );
    expect(testCustomer).toEqual(
        {
        id: 1,
        name: 'testName',
    });
});

// sad path
it("if id is invalid type, throw error", () => {
    expect(() => {
        new Customer(
            'number', 
            'testName', 
            )
    }
    )
    .toThrow('error');
});

});