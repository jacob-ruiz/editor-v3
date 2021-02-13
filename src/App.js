import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import './styles.css';

// http://reactcommunity.org/react-transition-group/transition-group

// https://reactjs.org/tutorial/tutorial.html

// https://kentcdodds.com/blog/dont-sync-state-derive-it

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
  const [activeItemID, setActiveItemID] = useState(
    itemsSortedByLastUpdated[0].id
  );
  const activeItem = getActiveItem(items, activeItemID);

  function addItem() {
    const newItem = {
      id: uuid(),
      title: 'New Document',
      body: 'Lorem ipsum',
      lastUpdated: new Date(Date.now()),
    };

    setItems((items) => [newItem, ...items]);
    setActiveItemID(newItem.id);
  }

  useEffect(() => {
    setActiveItemID(itemsSortedByLastUpdated[0].id);
  }, [items.length]);

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    setActiveItemID(itemsSortedByLastUpdated[0].id);
  }

  function handleDocumentEdit(e) {
    const newItems = items.map((item) => {
      if (item.id === activeItemID) {
        let updatedItem = { ...item };
        updatedItem[e.target.name] = e.target.value;
        updatedItem.lastUpdated = new Date(Date.now());
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
                    fontWeight: activeItemID === id ? 'bold' : 'normal',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  onClick={() => setActiveItemID(id)}
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
            {items.map(({ id }) => {
              if (id === activeItemID) {
                return (
                  <CSSTransition
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
                        setActiveItemID(itemsSortedByLastUpdated[0].id);
                      }
                    }}
                  >
                    <div className="doc-content">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={activeItem.title}
                        onChange={(e) => handleDocumentEdit(e)}
                      />
                      <p>{activeItem.lastUpdated.toGMTString()}</p>
                      <button onClick={() => removeItem(id)}>Delete</button>
                      <textarea
                        name="body"
                        id="body"
                        value={activeItem.body}
                        onChange={(e) => handleDocumentEdit(e)}
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
    </div>
  );
}

function getActiveItem(items, activeItemID) {
  const [activeItem] = items.filter((item) => {
    return item.id === activeItemID;
  });
  return activeItem;
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
