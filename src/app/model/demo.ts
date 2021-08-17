export class Image {
    id: number
    image: BinaryType
    imagedata: string

    constructor() {
        this.id = 0
       this.image = null
       this.imagedata = null

    }
    setId(id: number) {
        this.id = id
    }
    setImage(image: BinaryType){
        this.image = image
    }
    setImagedata(imagedata: string){
        this.imagedata = imagedata
    }
    
    
    getId(): number {
        return this.id
    }
    getImage(): BinaryType {
        return this.image
    }
    getImagedata(): string {
        return this.imagedata
    }
}