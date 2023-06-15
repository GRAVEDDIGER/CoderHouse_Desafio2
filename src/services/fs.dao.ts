import fs from "fs"
import { Product } from "../entities/products"

export class ProductManager
<T extends {
    id: number;}
   >
    {
    static PublicId:number = 0;
    static Instance:ProductManager<any>;
    constructor(
        protected path:string,
        protected Products?:any[],
        protected count=()=>ProductManager.PublicId++,
        protected loadData=async ()=>{
            if (fs.existsSync(path+"products.json")) this.Products= JSON.parse(await fs.promises.readFile(path+"products.json","utf-8"))
        },
        public addProduct=async (product:Omit<T,"id">)=>{
        try{
            await this.loadData()
            console.log(this.Products)
            if (this.Products !== undefined){
            this.count()
            this.Products.push({...product,id:ProductManager.PublicId}as T)
            console.log(this.Products)
            await fs.promises.writeFile(path+"products.json",JSON.stringify(this.Products),"utf-8")
            return product
        }
        }catch(e){console.log(e)}
        },
        public getProducts=async ()=>{
            await this.loadData()
            return this.Products
        },
        public getProductById= async(id:number)=>{
            await this.loadData()
            if (this.Products !== undefined)
            return await this.Products.filter((product)=>product.id as number ===id)
            else return {message:"Product not found"}
        },
        public updateProduct=async (id:number,product:Partial<T>)=>{
            await this.loadData()
            if (this.Products !== undefined){
            const temporaryData= this.Products.filter(product=>product.id!==id)
            temporaryData.push({...product,id})
            await fs.promises.writeFile(this.path+"products.json",JSON.stringify(temporaryData),"utf-8")
            this.Products=temporaryData
            return {...product,id}
        }
        },
        public deleteProduct=async (id:number)=>{
            await this.loadData()
            if (this.Products !==undefined){
            this.Products=this.Products.filter(product=>product.id!==id)
            await fs.promises.writeFile(this.path+"products.json",JSON.stringify(this.Products),"utf-8")
        }
        }

        ) {
         if (ProductManager.Instance !== undefined) return ProductManager.Instance
         else {
            if (fs.existsSync(path+"products.json")) {
            this.Products=JSON.parse(fs.readFileSync(path+"products.json","utf-8"))
            if (this.Products !==undefined) {
                const data:T[]=this.Products as T[]
                ProductManager.PublicId=Math.max(...data.map(item=>item.id))
            }
        }
            else {
                this.Products=[]
                fs.writeFileSync(this.path+"products.json", JSON.stringify(this.Products))
             }
            ProductManager.Instance=this
            return this}

            }
        }
      

