import React, {useEffect, useState} from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './componentes/MovieRow';
import featuredMovie from './componentes/featuredMovie';

export default () =>{

    const [movielist, setMovieList] = useState([])
    const [featuredData, setfeaturedData] = useState(null);
    useEffect(()=>{
        const loadAll = async () => {
            //PEGANDO A LISTA TOTAL
            let list = await tmdb.getHomelist();
            setMovieList(list);

            //PEGANDO Featured
            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
            setfeaturedData(chosenInfo);

            
        }
        loadAll();
    }, []);

    return (
        <div className="page">

            {featuredData &&
                <featuredMovie item={featuredData}/>
                
            }
            <section className='lists'>
                {movielist.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    );
}
