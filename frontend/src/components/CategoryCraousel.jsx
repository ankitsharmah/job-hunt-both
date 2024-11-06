import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobByJobTitle } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const searchJobHandler = (query) => {
    //     dispatch(setSearchedQuery(query));
    //     navigate("/browse");
    // }

    return (
        <div className=''>
            <Carousel className="w-[60%] md:w-full  max-w-xl mx-auto md:my-20  ">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <button  key={index} onClick={(e)=>{
                                    console.log(cat)
                                    dispatch(setSearchJobByJobTitle(cat));
                                    navigate("/browse")
                                }} className="rounded-full shadow-lg  text-black bg-slate-50 border p-2 ">{cat}</button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel