class Customer {

    constructor(id, name){
        if(isNaN(id)){
            throw new TypeError('error');
        }
        this.id = id;
        this.name = name;
    }
};

export { Customer };
