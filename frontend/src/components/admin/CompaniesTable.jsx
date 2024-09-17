import { Popover, PopoverContent ,PopoverTrigger} from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useSelector } from 'react-redux';
import Companies from './Companies';  // Assuming this imports default company data for fallback
import { useNavigate } from 'react-router-dom';
// import { Avatar, AvatarImage } from '';
// import { PopoverContent,  } from '../ui/popover';
// import { Avatar, AvatarImage } from '../ui/avatar';


const CompaniesTable = () => {
  // Accessing companies and searchBycompanyName from Redux store
  const { companies, searchBycompanyName } = useSelector(state => state.company);
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

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany && filterCompany.map(company => (
            <TableRow key={company._id}>
              <TableCell>
                <img 
                className='rounded-full h-16 w-16'
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
