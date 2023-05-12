import { useState } from 'react'
import Link from 'next/link'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'
import { toast } from "react-toastify";
import axios from 'axios';

export default function MyForm({ allPostsData }) {
  const [firstNameValue, setFirstNameValue] = useState(null);
  const [lastNameValue, setLastNameValue] = useState(null);
  const [formStatus, setFormStatus] = useState(null);
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    
    // Get data from the state.
    const data = {
      first: firstNameValue as string,
      last: lastNameValue as string,
    }

    // Send the form data to our API and get a response.
    // const response = await fetch('/api/form', {
    //   // Body of the request is the JSON data we created above.
    //   body: JSON.stringify(data),
    //   // Tell the server we're sending JSON.
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // The method is POST because we are sending data.
    //   method: 'POST',
    // })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await axios.post('/api/form', data);
    // const result = await response.json()
    const successMessage = `This is your full name from API: ${result.data.data}`;
    setFormStatus(successMessage)
    toast(successMessage, { hideProgressBar: true, autoClose: 2000, type: 'success' })
  }
  const resetFormStatus = () => {
    setFormStatus(null);
  }
  
  return (
    <div className="container">
      <h1 className={styles.title}>
        Form <Link href="/">with</Link> JavaScript.
      </h1>
      {formStatus ? (
        <div>
          <h4>{formStatus}</h4>
          <button onClick={resetFormStatus}>Restart</button>
        </div>
      ):(
        <form onSubmit={handleSubmit}>
          <label htmlFor="first">First Name</label>
          <input data-testid="inputFirstName" type="text" id="first" name="first" required onChange={event => setFirstNameValue(event.target.value)}/>
          <label htmlFor="last">Last Name</label>
          <input data-testid="inputLastName" type="text" id="last" name="last" required onChange={event => setLastNameValue(event.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      )}
      
    </div>
  )
}