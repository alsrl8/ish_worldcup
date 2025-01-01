export namespace images {
	
	export class Image {
	    id: string;
	    name: string;
	    data: string;
	
	    static createFrom(source: any = {}) {
	        return new Image(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.data = source["data"];
	    }
	}

}

