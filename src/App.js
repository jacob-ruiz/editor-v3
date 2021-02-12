import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import './styles.css';

// http://reactcommunity.org/react-transition-group/transition-group

// https://reactjs.org/tutorial/tutorial.html

export default function App() {
  const [items, setItems] = useState([
    { id: uuid(), text: 'Buy eggs' },
    { id: uuid(), text: 'Pay bills' },
    { id: uuid(), text: 'Invite friends over' },
    { id: uuid(), text: 'Fix the TV' },
  ]);

  function addItem() {
    // const text = prompt('Enter some text');
    const text = 'New Document';
    if (text) {
      setItems((items) => [{ id: uuid(), text }, ...items]);
    }
  }
  return (
    <div className="App">
      <div className="leftPanel">
        <button onClick={addItem}>Add item</button>
        <div>
          <TransitionGroup className="todo-list">
            {items.map(({ id, text }) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <div>
                  {text}
                  <button
                    onClick={() => {
                      setItems((items) =>
                        items.filter((item) => item.id !== id)
                      );
                    }}
                  >
                    &times;
                  </button>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      {/* Middle */}
      <div className="center-panel">
        <h2></h2>
      </div>
    </div>
  );
}
