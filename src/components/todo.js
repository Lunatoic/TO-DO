import React, { useEffect, useState } from 'react';
import "./style.css";

// Get localStorage data
const getLocalData = () => {
  const list = localStorage.getItem("myTodoList");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputData) {
      alert('Please Enter the data')
    } else if(inputData && toggleButton){
      setItems(
        items.map((currEle)=>{
          if(currEle.id === isEditItem){
            return {...currEle, name: inputData}
          }
          return currEle;
        })
      )
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    }else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      };
      setItems([...items, newInputData]);
      setInputData("")
    }
  }

  // delete item function
  const deleteItem = (index) => {
    const updatedItems = items.filter((currEle) => {
      return currEle.id !== index
    })
    setItems(updatedItems);
  }

  // remove all items
  const removeAll = () => {
    setItems([]);
  }

  const editItem = (index) => {
    const itemEditing = items.find((currEle) => {
      return currEle.id === index;
    })
    setInputData(itemEditing.name)
    setIsEditItem(index);
    setToggleButton(true);
  }

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items))
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='✍ add items' className='form-control'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton 
              ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) 
              : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }

          </div>

          {/* show item button */}
          <div className="showItems">
            {items.map((currEle) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => { editItem(currEle.id) }}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => { deleteItem(currEle.id) }}></i>
                  </div>
                </div>
              )
            })}

          </div>


          {/* REMOVE all button */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove ALL" onClick={removeAll}>
              <span>CHECK LIST</span>
              </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
