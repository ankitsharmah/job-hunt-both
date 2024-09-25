import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setFilterBy } from '@/redux/jobSlice'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'
// import { Label } from '@radix-ui/react-label'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Gurgram", "Noida", "Pune", "Kolkata"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Php Developer", "Manager"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setFilterBy(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
           <div className='flex gap-2 '>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <button onClick={()=>changeHandler("")} className='bg-red-400  border-2 border-red-500 rounded-full px-1 text-white font-semibold'>Clear filter</button>
           </div>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center cursor-pointer space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className={"cursor-pointer"} htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard