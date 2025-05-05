import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { searchSucces } from "../../redux/muicSlice";
import { debounce } from "lodash";


type FormDataType = {
    search: string
}

export const MusicForm = () => {
    const {register, reset, watch, formState: {errors}} = useForm<FormDataType>();
    const dispatch = useDispatch();

    const searchData = watch('search');




    const sendSerchData = useCallback(debounce((data) => {
        dispatch(searchSucces(data))
    }, 1000), [])



    useEffect(() => {
        sendSerchData(searchData)
    }, [searchData])


    const inputRef = useRef<HTMLInputElement>(null);
    const resetHandler = () => {
        reset({
            search: ''
        })
        inputRef.current?.focus()
    }

    return (
        <form className="relatove">
            <input {...register('search', {required: 'field is required'}) } className="min-h-9 border border-s-black !px-3.5"
            placeholder="search..."
            ref={(e) => {
                register('search').ref(e); 
                inputRef.current = e;       
              }} />
            { errors.search &&
                <span className="text-red-300">{errors.search.message}</span>
            }
            <span onClick={resetHandler} className="absolute text-3xl left-165 cursor-pointer">x</span>
        </form>
    )
};