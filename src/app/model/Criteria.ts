export class Criteria {
    public property: string;
    public descending: boolean;
    public filter: string;
    constructor(property: string, descending: boolean, filter: string) {
        this.property = property;
        this.descending = descending;
        this.filter = filter;
    }
}