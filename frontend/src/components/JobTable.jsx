import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Tooltip, Pagination, TextInput, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'



const truncateDescription = (description, wordLimit) => {
    if (typeof description !== "string" || !description.trim() || description === "Not Available") {
        return "No description available";
    }

    const words = description.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
};


const formatTimeDifference = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString(); 
    return `${formattedDate} at ${formattedTime}`;
};



const formatUrlString = (company, title) => {
    const formatString = (str) => str
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '') // Remove non-word characters (except hyphens)
        .replace(/\-\-+/g, '-'); // Replace multiple hyphens with a single hyphen

    return `${formatString(company)}-${formatString(title)}`;
};


const isRecent = (dateStr) => {
    const jobDate = new Date(dateStr);
    const now = new Date();
    
    // Calculate the difference in hours
    const hoursDifference = Math.floor((now - jobDate) / (1000 * 60 * 60));
    
    return hoursDifference <= 24;
};




export default function JobTable() {


    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [minExpFilter, setMinExpFilter] = useState('');
    const [maxExpFilter, setMaxExpFilter] = useState('');

    const navigate = useNavigate();


    const handleApplyClick = (id, company, title) => {
        const formattedUrl = formatUrlString(company, title);
        navigate(`/fulljd/${formattedUrl}/${id}`); // Use formatted URL
    };

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [jobsResponse] = await Promise.all([axios.get("/backend/naukri")]);

                const jobsData = jobsResponse.data.map(item => ({
                    ...item,
                    _id: item._id,
                    job_title: item.job_title || "Unknown",
                    min_exp: item.min_exp,
                    max_exp: item.max_exp,
                    company: item.company,
                    location: Array.isArray(item.location) && item.location.length > 0 ? item.location.join(" / ") : "Unknown",
                    jd: item.full_jd,
                    date: new Date(item.time).toISOString(),
                    apply_link : item.apply_link
                }));

                jobsData.sort((a, b) => new Date(b.date) - new Date(a.date));
                setJobs(jobsData);
                setFilteredJobs(jobsData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    

    useEffect(() => {

        const filtered = jobs.filter(job => {

            const keyword = searchKeyword.toLowerCase();

            const matchesSearch = job.title.toLowerCase().includes(keyword) ||
                                  job.company.toLowerCase().includes(keyword) ||
                                  job.location.toLowerCase().includes(keyword) ||
                                  job.jd.toLowerCase().includes(keyword);
            
            const matchesMinExp = minExpFilter ? job.min_exp >= minExpFilter : true;
            const matchesMaxExp = maxExpFilter ? job.max_exp <= maxExpFilter : true;

            return matchesSearch && matchesMinExp && matchesMaxExp;
        });

        setFilteredJobs(filtered);
        setCurrentPage(1); // Reset to first page on filter change

    }, [searchKeyword, minExpFilter, maxExpFilter, jobs]);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='w-full bg-gray-100 dark:bg-gray-900'>

            <h2 className='text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform transition-transform duration-500 hover:scale-105'>
                "Explore, Apply, Succeed : Your Career Starts Here!"
            </h2>


            <div className='mb-4 flex flex-col sm:flex-row gap-4'>

                <TextInput
                    placeholder='Search by job title/company/location/description...'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className='w-full'
                />

                <div className='flex gap-4'>
                <Select
                    value={minExpFilter}
                    onChange={(e) => setMinExpFilter(e.target.value)}
                    className='w-full sm:w-48'
                >
                    <option value="">Filter by Min Experience</option>
                    <option value="0">0 years</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>

                </Select>

                <Select
                    value={maxExpFilter}
                    onChange={(e) => setMaxExpFilter(e.target.value)}
                    className='w-full sm:w-48'
                >
                    <option value="">Filter by Max Experience</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="10">10 years</option>

                </Select>
                </div>

            </div>

            {filteredJobs.length > 0 ? (
                <>

                <div className='overflow-x-auto'>

                    <Table hoverable className='w-full shadow-lg bg-white rounded-lg overflow-hidden'>

                        <Table.Head className='bg-blue-800 text-gray-900'>

                            <Table.HeadCell>S.No.</Table.HeadCell>
                            <Table.HeadCell>Job Title</Table.HeadCell>
                            <Table.HeadCell>Company</Table.HeadCell>
                            <Table.HeadCell>Location</Table.HeadCell>
                            <Table.HeadCell>Date & Time</Table.HeadCell>
                            <Table.HeadCell>Minimum Experience</Table.HeadCell>
                            <Table.HeadCell>Maximum Experience</Table.HeadCell>
                            <Table.HeadCell>Apply Here</Table.HeadCell>

                        </Table.Head>

                        <Table.Body className='divide-y'>

                            {currentJobs.map((job , index) => (

                                <Table.Row key={job._id} className='transition-transform duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={job.title}>
                                            {startIndex + index + 1}
                                        </Tooltip>
                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                        <Tooltip content={job.title}>
                                            <div className="relative flex items-center">
                                                {isRecent(job.date) && (
                                                    <span className="glowing-badge text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1 mr-2">
                                                        New
                                                    </span>
                                                )}
                                                {job.title}
                                            </div>
                                        </Tooltip>
                                    </Table.Cell>


                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.company}
                                        </Tooltip>

                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.location}
                                        </Tooltip>

                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {formatTimeDifference(job.date)}
                                        </Tooltip>
                                        
                                    </Table.Cell>


                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.min_exp} years
                                        </Tooltip>

                                    </Table.Cell>

                                    <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            {job.max_exp} years
                                        </Tooltip>

                                    </Table.Cell>

                                    <Table.Cell className='p-4' key={job._id}>

                                        <Tooltip content={truncateDescription(job.jd, 5)}>
                                            <Button
                                                className='apply-button'
                                                onClick={() => handleApplyClick(job._id, job.company, job.title)}
                                            >
                                                Apply Here
                                            </Button>
                                        </Tooltip>

                                    </Table.Cell>

                                </Table.Row>

                            ))}

                        </Table.Body>

                    </Table>

                </div>

                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredJobs.length / jobsPerPage)}
                            onPageChange={handlePageChange}
                            className='bg-blue-500 text-white rounded-lg'
                        />
                    </div>

                </>

            ) : (
                <p className='text-center text-gray-600 dark:text-gray-400'>No jobs on the board yet!</p>
            )}


            <style jsx>{`
                .glowing-badge {
                    animation: glowing 1.5s infinite;
                }

                @keyframes glowing {
                    0% {
                        box-shadow: 0 0 5px #ff0000;
                    }
                    50% {
                        box-shadow: 0 0 20px #ff0000;
                    }
                    100% {
                        box-shadow: 0 0 5px #ff0000;
                    }
                }
                .apply-button {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    background-color: #3b82f6; 
                    color: #ffffff;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                }
                .apply-button:hover {
                    background-color: #2563eb; 
                    transform: scale(1.05);
                }
                .apply-button:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); 
                }
            `}</style>

            
        </div>
    );
}
