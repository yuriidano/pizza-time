import axios from "axios";
type PizzaType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
};

type ResponseType = PizzaType[];

const instance = axios.create({
    baseURL: 'https://67e4282e2ae442db76d34bc3.mockapi.io/'
});




export const itemsAPI = {

    getItems(sortBy: string = 'rating', category: number | string, order: string, search: string = '', page: number, limit: number) {
        const searchQuery = search ? `&search=${search}` : '';
        return (
            instance.get<ResponseType>(`items?sortBy=${sortBy}&category=${category}&order=${order}${searchQuery}&page=${page}&limit=${limit}`)
                .then(res => res.data)
        )
    }
}