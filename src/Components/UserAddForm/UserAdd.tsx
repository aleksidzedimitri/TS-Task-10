import styles from "./UserAdd.module.css";

import { FormEvent, useState } from "react";
import { Person, data, Gender } from "../../static/data.ts";

interface AddUserFormProps {
  addUser: (newUser: Person) => void; 
}
const AddUserForm = ({ addUser }: AddUserFormProps) =>  {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validGenders: Gender[] = [
      "Male",
      "Female",
      "Non-binary",
      "Genderqueer",
      "Polygender",
      "Bigender",
      "Agender",
    ];

    if (!validGenders.includes(gender as Gender)) {
      alert("Please select a gender");
      return;
    }

    const newUser = {
      id: data.length + 1,
      first_name: firstName,
      last_name: lastName,
      email,
      gender: gender as Gender,
      age: Number(age),
      job,
      country,
    };

    addUser(newUser)
    alert("User added successfully");

    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
    setAge("");
    setJob("");
    setCountry("");
  };

  return (
    <div className={styles.form}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Job</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
