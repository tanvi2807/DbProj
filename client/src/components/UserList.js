
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const DeleteUser = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`/getUserById/${id}`, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("/getAllUser", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setRecords(data)
                // console.log(data);
            })
            .catch(err => console.log(err))

    }, []);// Pass an empty dependency array to useEffect to ensure it only runs once during the initial render.

    // const Filter = (event) => {
    //     setRecords(data.filter(f => f.passingYear.toString().includes(event.target.value)))
    //     setRecords(data.filter(f => f.higherstudiescollege.toLowerCase().includes(event.target.value)))
    //     setRecords(data.filter(f => f.collegename.toLowerCase().includes(event.target.value)))
    // };
    const Filter = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        // Check if any filter value is present
        if (!searchTerm && !records.length) {
            setRecords(data);
            return;
        }

        setRecords(data.filter((f) => {
            const passingYearMatch = f.passingYear.toString().includes(searchTerm);
            const higherStudiesCollegeMatch = f.higherstudiescollege.toLowerCase().includes(searchTerm);
            const collegeNameMatch = f.collegename.toLowerCase().includes(searchTerm);
           

            return passingYearMatch || higherStudiesCollegeMatch || collegeNameMatch;
        }));
    };



    return (
        <>
            <div className='table-content'>
                <div className='table-content1'>
                    <div className='table-content2'>
                        <h3>ALMUNI DATA</h3>
                        <div className='user-search'>
                            <select className='from-control' onChange={Filter}>
                                {Array.from({ length: 50 }, (_, i) => {
                                    const year = new Date().getFullYear() - 30 + i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>

                            <input type='text' className='from-control' onChange={Filter} placeholder='HigherstudiesCollege' />
                            <input type='text' className='from-control' onChange={Filter} placeholder='collegename' />
                        </div>
                        <table className='center'>
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>PhoneNumber</th>
                                    <th>PassingYear</th>
                                    <th>CollegeName</th>
                                    <th>CompanyName</th>
                                    <th>HigherstudiesCollege</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* const count=0; */}
                                {records && records.length > 0 ? (
                                    records
                                        .map((i, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{i.name}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phoneNumber}</td>
                                                <td>{i.passingYear}</td>
                                                <td>{i.collegename}</td>
                                                <td>{i.companyname}</td>
                                                <td>{i.higherstudiescollege}</td>
                                                <td>
                                                    <button onClick={() => navigate(`/updateUser/${i._id}`)}>Update</button>
                                                    {/* <Link to={`/updateuser/${i._id}`}>Update</Link> */}
                                                </td>
                                                <td>
                                                    <button onClick={() => DeleteUser(i._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;

