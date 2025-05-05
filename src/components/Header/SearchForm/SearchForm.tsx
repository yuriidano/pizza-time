import { useCallback, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch} from "react-redux";
import { setSearch } from "../../../redux/filterSlice";
import { debounce } from "lodash";



type FormDataType = {
    search: string
}

export const SearchForm = () => {
    const {register, watch, reset, formState: {errors}} = useForm<FormDataType>();
    const dispatch = useDispatch();
    const searchData = watch('search');

    const updateSearchForm = useCallback(debounce((searchData: string) => {
        dispatch(setSearch(searchData))
    }, 1000),
    []);

    useEffect(() => {
        updateSearchForm(searchData)
    }, [searchData])



    const inputRef = useRef<HTMLInputElement | null>(null);
    const resetInputHandler = () => {
        reset({
            search: ''
        })
        inputRef.current?.focus();
    }


    return (
        <form >
            <div className="relative">
                <input 
                    className='border border-gray-400/30 !px-5 min-h-10 rounded-lg min-w-70'
                    placeholder="search..." {...register('search', { maxLength: 20 })} 
                    ref={(e) => {
                        register('search').ref(e); 
                        inputRef.current = e;       
                      }} />
                {errors.search &&
                    <span>max 20 simbols</span>
                }
               { searchData &&
                 <div onClick={resetInputHandler}><CloseIcon className="text-gray-400 absolute top-2.5 right-2 cursor-pointer" /></div>
               }
            </div>
        </form>
    )
}