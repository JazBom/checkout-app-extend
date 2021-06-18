class Product {

    constructor(id, name, description, price, imageUrl, imageName){
        if(isNaN(id)){
            throw new TypeError('error');
        }
        this.id = id;
        this.name = name;
        this.description = description;  
        this.price = price;
        this.imageUrl = imageUrl;
        this.imageName = imageName;
    }

};

export { Product };