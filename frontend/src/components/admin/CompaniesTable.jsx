import { Popover, PopoverContent ,PopoverTrigger} from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useSelector } from 'react-redux';
import Companies from './Companies';  // Assuming this imports default company data for fallback
import { useNavigate } from 'react-router-dom';
import { Hourglass, LineWave, TailSpin } from 'react-loader-spinner'
import Loader from '../Loader';
// import { Avatar, AvatarImage } from '';
// import { PopoverContent,  } from '../ui/popover';
// import { Avatar, AvatarImage } from '../ui/avatar';


const CompaniesTable = () => {
  // Accessing companies and searchBycompanyName from Redux store
  const { companies, searchBycompanyName,isLoading } = useSelector(state => state.company);
const navigate = useNavigate()

  const [filterCompany, setFilterCompany] = useState(companies || []);

  useEffect(() => {
    const filteredCompany = companies.filter(company => {
      if (!searchBycompanyName) {
        return true; 
      }
      return company.name.toLowerCase().includes(searchBycompanyName.toLowerCase());
    });

    setFilterCompany(filteredCompany);
  }, [companies, searchBycompanyName]);


  async function deleteJob(){
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`);

      if(res.data.success){
        const newJobs = jobs.filter((job)=>{
                  if(job.id === jobId){
                    return false;
                  }
                  return true;
        })

        dispatch(setJobsByCompany(newJobs));
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <Table>
        <TableCaption>{isLoading ? <Loader />:<p>A list of your recent registered companies</p>}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading&&filterCompany && filterCompany.map(company => (
            <TableRow key={company._id} onClick={()=>navigate(`/admin/company/${company.name}/jobs/${company._id}`)} className={"cursor-pointer"}>
              <TableCell>
                <img 
                className='rounded-full md:h-16 h-12 md:w-16'
                 src={company.logo} 
                   alt={company.name} 
                
                 />
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                      <Edit2 className='w-4' />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;

