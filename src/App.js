import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import './styles.css';

// http://reactcommunity.org/react-transition-group/transition-group

// https://reactjs.org/tutorial/tutorial.html

// https://kentcdodds.com/blog/dont-sync-state-derive-it

/*
- Active item = 0
- Delete item 1
-
*/

export default function App() {
  const [items, setItems] = useState([
    {
      id: uuid(),
      title: 'Buy eggs',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    },
    {
      id: uuid(),
      title: 'Pay bills',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    },
    {
      id: uuid(),
      title: 'Invite friends over',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    },
    {
      id: uuid(),
      title: 'Fix the TV',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    },
  ]);
  const itemsSortedByLastUpdated = sortByLastUpdated(items);
  const [showDoc, setShowDoc] = useState(true);

  const [activeItem, setActiveItem] = useState(items[0]);

  function addItem() {
    // const text = prompt('Enter some text');
    const newItem = {
      id: uuid(),
      title: 'New Document',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    };

    setItems((items) => [newItem, ...items]);

    setActiveItem(itemsSortedByLastUpdated[0]);
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    setActiveItem(itemsSortedByLastUpdated[0]);
  }

  function updateActiveItem(id) {
    const [newItem] = items.filter((item) => {
      return item.id === id;
    });
    setActiveItem(newItem);
  }

  function handleDocumentBodyEdit(e) {
    const newItems = items.map((item) => {
      if (item.id === activeItem.id) {
        let updatedItem = { ...item };
        updatedItem.body = e.target.value;
        updatedItem.lastUpdated = new Date(Date.now());
        console.log(e.target.value);
        setActiveItem(updatedItem);
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(newItems);
  }

  return (
    <div className="App">
      <div className="leftPanel">
        <button onClick={addItem}>Add item</button>
        <div>
          <TransitionGroup className="todo-list">
            {itemsSortedByLastUpdated.map(({ id, title }) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <button
                  style={{
                    fontWeight: activeItem.id === id ? 'bold' : 'normal',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  onClick={() => updateActiveItem(id)}
                >
                  {title}
                </button>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      {/* Middle */}

      <div className="center-panel">
        <div className="doc-container">
          <TransitionGroup className="doc-page">
            {items.map(({ id, title }) => {
              if (id === activeItem.id) {
                return (
                  <CSSTransition
                    in={showDoc}
                    key={id}
                    timeout={1000}
                    classNames="doc"
                    unmountOnExit
                    onEntered={() => {
                      console.log('entered');
                    }}
                    onEnter={() => console.log('enter')}
                    onExit={() => console.log('exit')}
                    onExited={() => {
                      console.log('exited');
                      if (activeItem.id !== id) {
                        setActiveItem(items[0]);
                      }
                    }}
                  >
                    <div className="doc-content">
                      <h2>{activeItem.title}</h2>
                      <p>{activeItem.lastUpdated.toGMTString()}</p>
                      <button
                        onClick={() => {
                          removeItem(activeItem.id);
                          setShowDoc(false);
                        }}
                      >
                        Delete
                      </button>
                      <textarea
                        name="body"
                        id="body"
                        value={activeItem.body}
                        onChange={(e) => handleDocumentBodyEdit(e)}
                      >
                        {activeItem.body}
                      </textarea>
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

function compareDates(a, b) {
  if (a.lastUpdated < b.lastUpdated) {
    return 1;
  }
  if (a.lastUpdated > b.lastUpdated) {
    return -1;
  }
  return 0;
}

function sortByLastUpdated(items) {
  let itemsCopy = [...items];
  let sortedItems = itemsCopy.sort(compareDates);
  return sortedItems;
}
