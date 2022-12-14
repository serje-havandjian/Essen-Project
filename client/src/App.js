import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Admin from './Admin'
import Login from './Login';

import React, {useState, useEffect} from "react"
import { Route, Switch } from "react-router-dom";
import { Card, Image, Form, Button } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";


function App() {

  const [user, setUser ] = useState()
  const [products, setProducts] = useState([])

  const [count, setCount] = useState(0);

  const history = useHistory()

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user, "USER HERE")

  useEffect(() => {
    fetch("/products")
    .then(result => result.json())
    .then(result => setProducts(result))
  }, [])

  console.log(products, "PRODUCTS")

  const displayProducts = products.map((product) => {
    return(
      <div className='eachCard' >
        <Card className='card'
        color='teal'
          href = {product.link}
          // image = {product.image}
          header = {product.name}
          meta = {product.manufacturer}
          description ={product.description}
          />
      </div>
    )
  })


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/login")
      }
    });
  }

  function createNewProduct(){

  }



  return (
    <>
    <main>
      {!user ? (
        <Switch>
          <Route exact path = "/">
            <div className="App">
              <header className="App-header">
                <img src={"https://media-exp1.licdn.com/dms/image/C4D03AQEkmbwWUISVKg/profile-displayphoto-shrink_800_800/0/1517610743998?e=1675296000&v=beta&t=UmEQ4wmf08cZ5F4JC04T7W01332bBO0CggQfwRosyKo"} className="App-logo" alt="logo" />
                <p>
                  Welcome To Essen!
                </p>
              </header>
            </div>
            <div className='cardDiv'>
            {displayProducts}
            </div>
          </Route>
          <Route exact path = "/admin">
            <Admin setUser = {setUser} />
          </Route>
          <Route exact path = "/login" >
            <Login setUser={setUser} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path = "/">
            <div className="App">
              <header className="App-header">
                <img src={"https://media-exp1.licdn.com/dms/image/C4D03AQEkmbwWUISVKg/profile-displayphoto-shrink_800_800/0/1517610743998?e=1675296000&v=beta&t=UmEQ4wmf08cZ5F4JC04T7W01332bBO0CggQfwRosyKo"} className="App-logo" alt="logo" />
                <p>
                  Welcome To Essen ADMIN PAGE!
                </p>
                <a className="menu-item" onClick={handleLogoutClick} href="/login">
                Logout
                </a>
              </header>
            </div>
            <div className='cardDiv'>
            {displayProducts}
            </div>
            <div>
              <Card fluid color="orange">
                <h1> Create A New Product</h1>
                    <Form succes onSubmit={createNewProduct}>
                        <Form.Input label="Name" placeholder="Enter Case Name Here"  />
                        <Form.Input label="Opposing Counsel" placeholder="Enter Opposing Counsel Here" />
                        
                        <Form.Input label="Date Case Filed (YYYY-MM-DD)" placeholder="Enter Date Case Filed Here"  />
                        <Form.Input label="Date Complaint Served (YYYY-MM-DD)" placeholder="Enter Date Complaint Served Here"  />
                        
                        <Button color="blue">Submit</Button>
                    </Form>
                </Card>
            </div>
          </Route>
        </Switch>
        
      )}
     
    </main>
    


    <h1>{count}</h1>
    </>
  );
}

export default App;
