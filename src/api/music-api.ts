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

type Response = PizzaType[];

export const musicAPI = {
    getMusic(search: string, category: number, typeRequest: string, order: string, limit: number, page: number) {
        const searchQuery = search ? `search=${search}` : '';
        const categoryQuery = category !== 0 ? `&category=${category}` : '';

        
        return(
            axios.get<Response>
            (`https://67e4282e2ae442db76d34bc3.mockapi.io/items?${searchQuery}${categoryQuery}&sortBy=${typeRequest}&order=${order}&limit=${limit}&page=${page}`)
                .then(res => res.data)
        )
    }
};