import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useRef } from "react";
import { musicAPI } from "../api/music-api";
import { musicPopSucces, setCurrentPage, setIsLoading } from "../redux/muicSlice";
import { Music } from "../components/Music/Music";
import { MusicForm } from "../components/Music/MusicForm";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import { MusicCategiries } from "../components/Music/MusicCategiries";
import { MusicSort } from "../components/Music/MusicSort";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const Musics = () => {
    const dispatch = useDispatch();
    const musicPop = useSelector((state: RootState) => state.musicReducer.musicPop);
    const search = useSelector((state: RootState) => state.musicReducer.search);
    const isLoading = useSelector((state: RootState) => state.musicReducer.isLoading);
    const activeCategories = useSelector((state: RootState) => state.musicReducer.activeCategories);
    const activeType = useSelector((state: RootState) => state.musicReducer.activeType);
    const order = activeType.nameProperty.includes('-') ? 'desc' : 'asc';
    const typeRequest = activeType.nameProperty.replace('-', '');
    const currentPage = useSelector((state: RootState) => state.musicReducer.currentPage);
    const limit = useSelector((state: RootState) => state.musicReducer.limit);


    const musics = <div className="flex flex-wrap  gap-y-5">{musicPop.map(music => <Music key={music.id} {...music} />)}</div>;
    const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index}/>);

    const navigate = useNavigate();
    const isMounted = useRef(false)
    debugger

    const currentPageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
    }


    useEffect(() => {
        musicAPI.getMusic(search, activeCategories, typeRequest, order, limit, currentPage)
            .then(res => {
                dispatch(musicPopSucces(res))
                dispatch(setIsLoading(false))
            })
    }, [search, activeCategories, typeRequest, order, currentPage])


    useEffect(() => {
        if(isMounted.current) {
            const query = queryString.stringify({
                search,
                activeCategories,
                typeRequest,
                currentPage
            });
    
            navigate({
                pathname:'/music',
                search: query,
            });
        };
        isMounted.current = true;

    }, [search, activeCategories, typeRequest, currentPage])


    return (
        <>
            <MusicForm />
            <div className="!mb-1"><MusicCategiries /></div>
            <div className="flex justify-end !mb-20 !pr-10">
            <MusicSort />
            </div>
            <div className="flex flex-wrap ">
                {isLoading ? skeleton : musics}
            </div>
            <Pagination count={4} page={currentPage} onChange={currentPageHandler} />
        </>
    )
};

export default Musics;