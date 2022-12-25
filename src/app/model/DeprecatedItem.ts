export class DeprecatedItem {
    id: string;
    itemName: string;
    isDone: boolean;
    email: string;
    userName: string;
    currentDate: Date;
    expiredDate: Date;

    constructor(name: string, isDone: boolean, email: string, userName: string, currentDate?: Date, expiredDate?: Date) {
        this.id = this.generateId();
        this.itemName = name;
        this.isDone = isDone;
        this.email = email;
        this.userName = userName;
        this.currentDate = currentDate || new Date();
        this.expiredDate = expiredDate || new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    }

    private generateId(): string {
        return 'id' + (new Date()).getTime();
    }
}