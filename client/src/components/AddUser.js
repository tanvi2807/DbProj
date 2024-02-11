import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddUser = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phoneNumber: "", passingYear: "", collegename: "", companyname: "", higherstudiescollege: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value
        setUser({ ...user, [name]: value })

    }

    const PostData = async (e) => {

        e.preventDefault();
        const { name, email, phoneNumber, passingYear, collegename, companyname, higherstudiescollege } = user;

        const res = await fetch("/adduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phoneNumber, passingYear, collegename, companyname, higherstudiescollege
            })
        })

        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Registeration");
            console.log("Invalid Registeration")
        } else {
            window.alert("successful Registeration");
            console.log("successful Registeration")
            navigate("/")
        }
    }

    return (


        <>
            <section>
                <div class="form-container">
                    <h2 class="form-title">User Information Form</h2>
                    <form method="POST">

                        <div>
                            <label for="name" className="form-label">Name<span className='req'>*</span></label>
                            <input type="text" id="name" name="name" className="form-input" placeholder='enter your name' required
                                value={user.name}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="email" className="form-label">Email<span className='req'>*</span></label>
                            <input type="email" id="email" name="email" className="form-input" placeholder='enter your email' required
                                value={user.email}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="phoneNumber" className="form-label">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" className="form-input " placeholder='enter your phone number'
                                value={user.phoneNumber}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="passingYear" className="form-label">Year of Passing<span className='req'>*</span></label>
                            <input type="number" id="passingYear" name="passingYear" className="form-input" placeholder='enter passing year' required
                                value={user.passingYear}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="collegename" className="form-label">College Name<span className='req'>*</span></label>
                            <input type="text" id="collegename" name="collegename" className="form-input" placeholder='enter college name' required
                                value={user.collegename}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="companyname" className="form-label">Company Name:</label>
                            <input type="text" id="companyname" name="companyname" className="form-input" placeholder='company name'
                                value={user.companyname}
                                onChange={handleInputs}
                            />
                        </div>

                        <div>
                            <label for="higherstudiescollege" className="form-label">Higher Studies College:</label>
                            <input type="text" id="higherstudiescollege" name="higherstudiescollege" className="form-input" placeholder='college name'
                                value={user.higherstudy}
                                onChange={handleInputs}
                            />
                        </div>
                        <div className='form-group form-button' >
                            <input
                                type="submit" name="adduser" id="adduser" className="form-button"
                                value="AddUser" onClick={PostData}
                            />
                        </div>
                        

                    </form>
                </div>
            </section>
        </>
    )
}

export default AddUser