import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const RESPONSE_STATUS = {
    FAIL: false,
    SUCCESS: true,
  };
  const submit = async () => {
    try {
      if (email.length == 0 || password.length == 0 || name.length == 0 ) {
        setError(true);
      } else {
        const body = { email, name, password };
        const result = await fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const bodyPar = await result.json();
        console.log(bodyPar, "bodyPar");
        if (bodyPar?.status === RESPONSE_STATUS.SUCCESS) {
          console.log("good user and pass");
        } else {
          setError(true);
        }
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signup">
      <h3 className="titleSignUp">Signup</h3>
      <input type="text" className="user" onChange={(e) => setName(e.target.value)} value={name} placeholder="name" name="name" />
      <input type="email" className="emails" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" name="email" />
      <input type="password" className="passwords" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" name="userPassword" />
      {error ?
        <label className="messages">Something went wrong!</label> : ""}
      <br></br>
      <br></br>
      <button type="button" className="submitSignUp" onClick={submit}>Signup</button>
      <br></br>
      <Link to="/"><button className="link-btns">
        Already have account?Click here.
      </button>
      </Link>
    </div>
  )
};

export default Signup;