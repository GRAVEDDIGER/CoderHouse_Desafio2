import { Product } from "./entities/products";
import { ProductManager } from "./services/fs.dao";
const productManager =new ProductManager<Product>("./src/db/")
//productManager.addProduct({code:"aaa",description:"Some description",price:12,stock:2,thumbnail:"No thumbnail",title:"Some Title"})
productManager.getProducts().then(products=>console.log(products)).catch(e=>console.log(e));
//productManager.getProductById(3).then(product=>console.log(product)).catch(e=>console.log(e))
//productManager.updateProduct(3,{description:"another description",price:12,stock:2,thumbnail:"any",title:"Just a title",code:"aaa",id:3})
productManager.deleteProduct(1)