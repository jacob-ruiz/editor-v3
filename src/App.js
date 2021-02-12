import React, { useEffect, useState } from 'react';
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
  const [showDoc, setShowDoc] = useState(true);

  const [activeItem, setActiveItem] = useState(items[0]);
  useEffect(() => {
    setActiveItem(items[0]);
    setShowDoc(true);
  }, [items]);

  function addItem() {
    // const text = prompt('Enter some text');
    const text = 'New Document';
    if (text) {
      setItems((items) => [{ id: uuid(), text }, ...items]);
    }
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateActiveItem(id) {
    const [newItem] = items.filter((item) => {
      return item.id === id;
    });
    setActiveItem(newItem);
  }

  return (
    <div className="App">
      <div className="leftPanel">
        <button onClick={addItem}>Add item</button>
        <div>
          <TransitionGroup className="todo-list">
            {items.map(({ id, text }) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <div onClick={() => updateActiveItem(id)}>
                  {text}
                  <button onClick={() => removeItem(id)}>&times;</button>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      {/* Middle */}

      <div className="center-panel">
        <div className="doc-container">
          <TransitionGroup className="doc-page">
            {items.map(({ id, text }) => {
              if (id === activeItem.id) {
                return (
                  <CSSTransition
                    // in={false}
                    key={id}
                    timeout={1000}
                    classNames="doc"
                    unmountOnExit
                    onEntered={() => console.log('entered')}
                    onEnter={() => console.log('enter')}
                    onExited={() => console.log('exited')}
                  >
                    <div className="doc-content">
                      <h2>{activeItem.text}</h2>
                      <button
                        onClick={() => {
                          removeItem(activeItem.id);
                          setShowDoc(false);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </CSSTransition>
                );
              }
            })}
          </TransitionGroup>
        </div>
      </div>
      {/* <div className="center-panel">
        <CSSTransition
          in={showDoc}
          timeout={500}
          classNames="doc"
          unmountOnExit
          onEntered={() => console.log('entered')}
          onEnter={() => console.log('enter')}
          onExited={() => console.log('exited')}
        >
          <div>
            <h2>{activeItem.text}</h2>
            <button
              onClick={() => {
                removeItem(activeItem.id);
                setShowDoc(false);
              }}
            >
              Delete
            </button>
          </div>
        </CSSTransition>
      </div> */}
    </div>
  );
}
