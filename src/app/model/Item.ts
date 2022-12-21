export class Item {
    public id: string;
    public name: string;
    public isDone: boolean;
    public currentDate: Date;
    public expiredDate: Date;

    constructor(name: string, isDone: boolean, currentDate?: Date, expiredDate?: Date) {
        this.id = this.generateId();
        this.name = name;
        this.isDone = isDone;
        this.currentDate = currentDate || new Date();
        this.expiredDate = expiredDate || new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    }

    private generateId(): string {
        return 'id' + (new Date()).getTime();
    }
}