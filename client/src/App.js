import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Admin from './Admin'
import Login from './Login';

import React, {useState, useEffect} from "react"
import { Route, Switch } from "react-router-dom";
import { Card, Image } from 'semantic-ui-react'


function App() {

  const [user, setUser ] = useState()
  const [products, setProducts] = useState([])

  const [count, setCount] = useState(0);

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
    fetch("http://localhost:3001/products")
    .then(result => result.json())
    .then(result => setProducts(result))
  }, [])

  console.log(products)

  const displayProducts = products.map((product) => {
    return(
      <div className='eachCard' >
        <Card className='card'
        color='teal'
          href = {product.link}
          image = {product.image}
          header = {product.title}
          meta = {product.manufacturer}
          description ={product.description}
          />
      </div>
    )

  })




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
              </header>
            </div>
            <div className='cardDiv'>
            {displayProducts}
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
