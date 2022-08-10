import './App.css';
import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState({
    list : true,
    name : false,
    create : false,
    update: false
  });
  const [data, setData] = useState([
    {
      id : 1, brand :"Audi", model:"RSX", year: "2020"
    },
    {
      id : 2 , brand :"BMW", model: "5Series", year: "2019"
    },
    {
      id : 3 , brand :"Volvo", model: "240", year: "2019"
    }
  ])
  const [car, setCar] = useState({});

  const [newCarId, SetNewCarId] = useState();
  const [newCarBrand, SetNewCarBrand] = useState();
  const [newCarModel, SetNewCarModel] = useState();
  const [newCarYear, SetNewCarYear] = useState();
  
  //let morning = false;
  let clickDetail = (e) => {
    console.log(e.target.id);
    for(let i = 0; i < data.length; i++){
      if(data[i].id == e.target.id)
        setCar(data[i]);
    }
    console.log(car.model);
    setDisplay({
      list : false,
      name : true,
      create : false,
      update: false,
      delete: false
    })
  }
  const clickUpdate = (e) =>{
    console.log("clicked");
    for(let i = 0; i < data.length; i++)
    {
      if(data[i].id == e.target.id)
        setCar(data[i]);
    }
    setDisplay({
      list : false,
      name : false,
      create : false,
      update: true,
      delete: false
    });
  }
  const clickDelete = (e) =>{
    console.log("clicked");
    for(let i = 0; i < data.length; i++)
        {
          if(data[i].id == e.target.id)
            setCar(data[i]);
        }
        setDisplay({
          list : false,
          name : false,
          create : false,
          update: false,
          delete: true
        });
      }
      
  
  const clickCreate = (e) =>{
    console.log("clicked");
    setDisplay({
      list : false,
      name : false,
      create : true,
      update: false,
      delete: false
    })
  }

  let backToList = () => {
    setDisplay({
      list : true,
      name : false,
      create : false,
      update: false,
      delete: false
    })
  }
 
 
  let handleChange = (e) => {
    if(e.target.name == "id"){
      SetNewCarId(e.target.value);
    }
    else if(e.target.name == "brand"){
      SetNewCarBrand(e.target.value);
    }
    else if(e.target.name == "model"){
      SetNewCarModel(e.target.value);
    }
    else if(e.target.name == "year"){
      SetNewCarYear(e.target.value);
    }
  }
  let saveNewCar = (e) => {
    e.preventDefault();
    let newCar = {
      id: newCarId,
      brand: newCarBrand,
      model: newCarModel,
      year: newCarYear

    };
    data.push(newCar);
    setData(data);

    SetNewCarId(null);
    SetNewCarBrand(null);
    SetNewCarModel(null);
    SetNewCarYear(null);

    setDisplay({
      list : true,
      name : false,
      create : false,
      update: false,
      delete: false
    });
  }
  let updateCar = (e) => {
    for(let i = 0; i < data.length; i++){
      if(data[i].id == e.target.id){
        
        if(newCarBrand!=null)
          data[i].brand = newCarBrand;
        if(newCarModel!=null)
          data[i].model= newCarModel;
        if(newCarYear!=null)
          data[i].year= newCarYear;
    
   setCar(data);

    }
  }
  setDisplay({
    list : true,
    name : false,
    create : false,
    update: false,
    delete: false
  });

}
let deleteCar = (e) => {
  for(let i=0; i < data.length; i++)
        {
            if(data[i].id == e.target.id)
            {
                const x= window.confirm('Are you sure you wish to delete this '+data[i].brand +' '+ data[i].model+' ?');
                if(x)
                   data.splice(i, 1);
                   setData(data);
           }
        }

  setDisplay({
    list : true,
    name : false,
    create : false,
    update: false,
    delete: false
  });
}

  
  return (
  
    <div className="App">
      
     <h3>How to use Tienary operatos</h3>

     <button onClick={clickCreate}>Create a Car</button>

     {/* <button onClick={handleClick}>Click me</button> */}
     {/* { morning ? <h2>Good Morning</h2> : <h2>Good afternoon</h2>} */}
    
    {display.list ? <><h3>This is the list</h3> <div>
     {data.map(car => (<div key = {car.id}>
      Id: {car.id}, Brand: {car.brand}, Model: {car.model}, Year:{car.year} 
      <button id={car.id} onClick={clickDetail}>Detail</button>
      <button id={car.id}  onClick={clickUpdate}>Update</button>
      <button id={car.id} onClick={clickDelete}>Delete</button>
      
     </div>))}
    </div>
    </>

    : display.name ? <> <h3>This is the name list</h3>
     <div>Id: {car.id}</div>
     <div>Brand: {car.brand}</div>
     <div>Model: {car.model}</div>
     <div>Year: {car.year}</div>
     <button onClick={backToList}>Back To List</button>
    
     </>
    
     
    : display.create ?<> <h3>Create a Car</h3>
     
      <form>
        Id: <input name ='id' type="text" onChange={handleChange} />{newCarId}<br />
        Brand: <input name='brand' onChange={handleChange} type="text" />{newCarBrand}<br />
        Model: <input name='model' onChange={handleChange} type="text" />{newCarModel}<br />
        Year: <input name='year' onChange={handleChange} type="text" />{newCarYear}<br />
        <button type='submit' onClick={saveNewCar}>Add a Car</button><br />
        <button onClick={backToList}>Back To List</button><br />
      </form>
    
     </>

     : display.update ? <><h3>Edit a Car</h3>
      <form>
        Id: <input name ='id' type="text" onChange={handleChange} defaultValue={car.id} />{newCarId}<br />
        Brand: <input name='brand' onChange={handleChange} type="text" defaultValue={car.brand} />{newCarBrand}<br />
        Model: <input name='model' onChange={handleChange} type="text" defaultValue={car.model} />{newCarModel}<br />
        Year: <input name='year' onChange={handleChange} type="text" defaultValue={car.year} />{newCarYear}<br />
        <button type='submit' id={car.id} onClick={updateCar}>Edit a Car</button><br />
        <button onClick={backToList}>Back To List</button><br />
      </form>
     </>
     : <><h4>Delete a Car</h4>
     <form>
        Id: <input name ='id' type="text" onChange={handleChange} defaultValue={car.id} />{newCarId}<br />
        Brand: <input name='brand' onChange={handleChange} type="text" defaultValue={car.brand} />{newCarBrand}<br />
        Model: <input name='model' onChange={handleChange} type="text" defaultValue={car.model} />{newCarModel}<br />
        Year: <input name='year' onChange={handleChange} type="text" defaultValue={car.year} />{newCarYear}<br />
        <button type='submit' id={car.id}  onClick={deleteCar}>Delete a Car</button><br />
        
        <button onClick={backToList}>Back To List</button><br />
      </form>
      </>
}
   </div>
    
    
  );
}

export default App;
