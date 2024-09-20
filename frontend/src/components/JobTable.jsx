import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Tooltip, Pagination, TextInput, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const formatUrlString = (company, title) => {
    const formatString = (str) => str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');

    return `${formatString(company)}-${formatString(title)}`;
};

const isRecent = (dateStr) => {
    const jobDate = new Date(dateStr);
    const now = new Date();
    const hoursDifference = Math.floor((now - jobDate) / (1000 * 60 * 60));
    return hoursDifference <= 24;
};

const formatDateForComparison = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

export default function JobTable() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [minExpFilter, setMinExpFilter] = useState('');
    const [maxExpFilter, setMaxExpFilter] = useState('');
    const [searchPage, setSearchPage] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const handleApplyClick = (id, company, title) => {
        const formattedUrl = formatUrlString(company, title);
        navigate(`/fulljd/${formattedUrl}/${id}`);
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
                setTotalPages(Math.ceil(jobsData.length / jobsPerPage));
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

            const jobDate = formatDateForComparison(job.date);
            const searchDateFormatted = searchDate ? formatDateForComparison(searchDate) : '';
            const matchesDate = searchDate ? jobDate === searchDateFormatted : true;

            return matchesSearch && matchesMinExp && matchesMaxExp && matchesDate;
        });

        setFilteredJobs(filtered);
        setTotalPages(Math.ceil(filtered.length / jobsPerPage));
        setCurrentPage(1);
    }, [searchKeyword, minExpFilter, maxExpFilter, searchDate, jobs]);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchByPage = () => {
        const pageNum = parseInt(searchPage);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        } else {
            alert(`Please enter a valid page number between 1 and ${totalPages}`);
        }
    };

    return (
        <div className='w-full bg-gray-100 dark:bg-gray-900 p-4'>
            <h2 className='text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform transition-transform duration-500 hover:scale-105'>
                "Explore, Apply, Succeed: Your Career Starts Here!"
            </h2>

            <div className='mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                <TextInput
                    placeholder='🔍 Search by any keywords...'
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className='w-full'
                />

                <Select
                    value={minExpFilter}
                    onChange={(e) => setMinExpFilter(e.target.value)}
                    className='w-full'
                >
                    <option value="">Min Experience</option>
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
                    className='w-full'
                >
                    <option value="">Max Experience</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="10">10 years</option>
                </Select>

                <TextInput
                    type="date"
                    placeholder='Search by date'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className='w-full'
                />

                <TextInput
                    placeholder={`Go to page (1-${totalPages})...`}
                    value={searchPage}
                    onChange={(e) => setSearchPage(e.target.value)}
                    className='w-full'
                />

                <Button onClick={handleSearchByPage} className='w-full'>Go to Page</Button>
            </div>

            {filteredJobs.length > 0 ? (
                <>
                    <div className='overflow-x-auto'>
                        <Table hoverable className='w-full shadow-lg bg-white rounded-lg overflow-hidden'>
                            <Table.Head className='bg-blue-800 text-gray-800'>
                                <Table.HeadCell>S.No.</Table.HeadCell>
                                <Table.HeadCell>Job Title</Table.HeadCell>
                                <Table.HeadCell>Company</Table.HeadCell>
                                <Table.HeadCell>Location</Table.HeadCell>
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Min Exp</Table.HeadCell>
                                <Table.HeadCell>Max Exp</Table.HeadCell>
                                <Table.HeadCell>Apply Now</Table.HeadCell>
                            </Table.Head>

                            <Table.Body className='divide-y'>
                                {currentJobs.map((job, index) => (
                                    <Table.Row key={job._id} className='transition-transform duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer'>
                                        <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                            <Tooltip content={job.title}>
                                                {startIndex + index + 1}
                                            </Tooltip>
                                        </Table.Cell>

                                        <Table.Cell className='p-4 text-gray-900 dark:text-gray-100'>
                                            <Tooltip content={truncateDescription(job.jd, 5)}>
                                                <div className="flex items-center">
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
                                                {formatDate(job.date)}
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

                                        <Table.Cell className='p-4'>
                                            <Tooltip content={truncateDescription(job.jd, 5)}>
                                                <Button
                                                    className='apply-button'
                                                    onClick={() => handleApplyClick(job._id, job.company, job.title)}
                                                >
                                                    Apply
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
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className='bg-blue-500 text-white rounded-lg'
                        />
                    </div>
                </>
            ) : (
                <p className='text-center text-gray-600 dark:text-gray-400'>No jobs found matching your criteria.</p>
            )}

            <style jsx>{`
                .glowing-badge {
                    animation: glowing 1.5s infinite;
                }

                @keyframes glowing {
                    0% { box-shadow: 0 0 5px #ff0000; }
                    50% { box-shadow: 0 0 20px #ff0000; }
                    100% { box-shadow: 0 0 5px #ff0000; }
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