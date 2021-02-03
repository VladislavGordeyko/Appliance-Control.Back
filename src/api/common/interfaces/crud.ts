/** Interface for CRUD opertions */
export interface ICRUD<T> {
    /** Get all Objects of Type <T> */
    list: () => Promise<T[]>,

    /** Create object of Type <T> */
    create: (item: T) => Promise<T>,

    /** Update object of Type <T> */
    update: (item: T) => Promise<void>,

    /** Get by Id object of Type <T> */
    getById: (itemId: string) => Promise<T>,

    /** Delete by Id object of Type <T> */
    deleteById: (itemId: string) => Promise<void>,

    /** Delete All objects of Type <T> */
    delete: () => Promise<void>,
}
