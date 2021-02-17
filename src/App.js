import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import ReactTooltip from 'react-tooltip';
import Search from './components/Search/Search';
import Icons from './icons';
import './styles.css';
import Navbar from './components/Navbar/Navbar';
import SuggestionsPanel from './components/SuggestionsPanel/SuggestionsPanel';

// http://reactcommunity.org/react-transition-group/transition-group

// https://reactjs.org/tutorial/tutorial.html

// https://kentcdodds.com/blog/dont-sync-state-derive-it

// https://github.com/davidde/sidebars
/*
  TODO:
  - Try positioning items manually using transformY so we can animate to top of list on edit. (Maybe this is smarter to do at the end? This is a fairly radical approach and not very maintainable)
*/

export default function App() {
  // UI state
  const [leftPanel, setLeftPanel] = useState(true);
  let leftPanelOpen = leftPanel ? 'open' : 'closed';

  function toggleLeftPanel() {
    setLeftPanel(!leftPanel);
  }

  // Data
  const [items, setItems] = useState([
    {
      id: uuid(),
      title: content[0].title,
      body: content[0].body,
      lastUpdated: new Date(Date.now()),
      lastUpdatedBy: 'Jacob Ruiz',
      favorite: false,
    },
    {
      id: uuid(),
      title: content[1].title,
      body: content[1].body,
      lastUpdated: new Date(Date.now()),
      lastUpdatedBy: 'Jacob Ruiz',
      favorite: true,
    },
    {
      id: uuid(),
      title: content[2].title,
      body: content[2].body,
      lastUpdated: new Date(Date.now()),
      lastUpdatedBy: 'Jacob Ruiz',
      favorite: false,
    },
    {
      id: uuid(),
      title: content[3].title,
      body: content[3].body,
      lastUpdated: new Date(Date.now()),
      lastUpdatedBy: 'Jacob Ruiz',
      favorite: false,
    },
  ]);
  const itemsSortedByLastUpdated = sortByLastUpdated(items);
  const [activeItemID, setActiveItemID] = useState(
    itemsSortedByLastUpdated[0].id
  );
  const activeItem = getActiveItem(items, activeItemID);
  const [itemIsExiting, setItemIsExiting] = useState(false);

  useEffect(() => {
    // This is to handle when we delete an item, so we can highlight the top-most item in the list
    console.log('useEffect: setActiveItemID to latest item');
    setActiveItemID(itemsSortedByLastUpdated[0].id);
  }, [items.length]);

  function addItem() {
    console.log('Add item clicked');
    const newItem = {
      id: uuid(),
      title: '',
      body: '',
      lastUpdated: new Date(Date.now()),
      lastUpdatedBy: 'Jacob Ruiz',
      favorite: false,
    };
    console.log('setItems with new item');
    setItems((items) => [newItem, ...items]);
    console.log('setItemID with new item id');
    setActiveItemID(newItem.id);
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
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
    <>
      <Navbar />
      <div id="layout">
        <div id="left" className={leftPanelOpen}>
          <ToggleButton onClick={toggleLeftPanel} leftPanel={leftPanel} />
          <NewDocButton onClick={addItem} leftPanel={leftPanel} />
          <div className={`left-panel ${leftPanelOpen}`}>
            <div className="left-panel__header">
              <h3 className="left-panel__title">Docs</h3>
              <button className="button-icon-with-label" onClick={addItem}>
                <NewDoc />
                New
              </button>
            </div>
            <div className="left-panel__search-container">
              <Search />
            </div>
            <div className="left-panel__filter-container">
              <div className="left-panel__filter">
                My Docs
                <ArrowDown />
              </div>
              <div className="left-panel__sort">
                <span>Last Edited</span>
                <Sort />
              </div>
            </div>
            <div>
              <TransitionGroup className="list">
                {itemsSortedByLastUpdated.map(
                  ({ id, title, lastUpdated, lastUpdatedBy, favorite }) => (
                    <CSSTransition
                      key={id}
                      timeout={200}
                      classNames="item"
                      onExit={() => setItemIsExiting(true)}
                      onExited={() => setItemIsExiting(false)}
                    >
                      <button
                        className={`item ${
                          activeItemID === id && !itemIsExiting
                            ? 'active'
                            : null
                        }`}
                        onClick={() => setActiveItemID(id)}
                      >
                        <div className="item__grid">
                          <div className="item__star">
                            <Star filled={favorite ? true : false} />
                          </div>
                          <div className="item__text-stack">
                            <h4 className="item__title">
                              {title ? title : 'Untitled Doc'}
                            </h4>
                            <div className="item__subtitle">
                              <span>{lastUpdatedBy}</span>
                              <span> • </span>
                              <span>
                                {timeDifference(
                                  new Date(Date.now()),
                                  lastUpdated
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </CSSTransition>
                  )
                )}
              </TransitionGroup>
            </div>
          </div>
        </div>
        {/* Middle */}

        <div id="main">
          <div className="center-panel">
            <div className="doc-page">
              <TransitionGroup>
                {itemsSortedByLastUpdated.map(({ id }) => {
                  if (id === activeItemID) {
                    return (
                      <CSSTransition
                        key={id}
                        timeout={400}
                        classNames="doc"
                        // unmountOnExit
                        onEntered={() => {
                          console.log('entered', id);
                        }}
                        onEnter={() => console.log('enter', id)}
                        onExit={() => console.log('exit', id)}
                        onExited={() => {
                          console.log('exited', id);
                          // if (activeItem.id !== id) {
                          //   setActiveItemID(itemsSortedByLastUpdated[0].id);
                          // }
                        }}
                      >
                        <div className="doc-content">
                          <div className="doc__header">
                            <input
                              type="text"
                              name="title"
                              className="doc__title"
                              id="title"
                              value={activeItem.title}
                              onChange={(e) => handleDocumentEdit(e)}
                              placeholder="Doc title"
                              autocomplete="off"
                            />
                            <div className="doc__details">
                              <span>
                                Last edited by {activeItem.lastUpdatedBy}
                                {`  •  `}
                                {timeDifference(
                                  new Date(Date.now()),
                                  activeItem.lastUpdated
                                )}
                              </span>
                              <Star
                                filled={activeItem.favorite ? true : false}
                              />
                              <button
                                className="icon-button"
                                onClick={() => removeItem(id)}
                                style={{ display: 'inline' }}
                              >
                                <More />
                              </button>
                            </div>
                          </div>
                          <textarea
                            name="body"
                            id="body"
                            className="doc-body"
                            value={activeItem.body}
                            onChange={(e) => handleDocumentEdit(e)}
                            spellCheck="false"
                            placeholder="Type something..."
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

        <div id="right">
          <div className="right-panel">
            <SuggestionsPanel />
          </div>
        </div>
      </div>
    </>
  );
}

function ToggleButton({ leftPanel, onClick }) {
  return (
    <button
      data-tip={leftPanel ? 'Hide Docs' : 'Show Docs'}
      id="toggle-button"
      className="roundButton greyButton"
      onClick={onClick}
      style={{
        padding: 0,
        display: 'grid',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <ReactTooltip
        className="tooltip"
        place="right"
        type="dark"
        effect="solid"
        backgroundColor="black"
        multiline={false}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gap: 2,
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'grid',
            alignItems: 'center',
            opacity: leftPanel ? 1 : 0,
            transition: `opacity 80ms`,
          }}
        >
          <Icons.TriangleLeft />
        </span>
        <Icons.Doc />
        <span
          style={{
            display: 'grid',
            alignItems: 'center',
            opacity: leftPanel ? 0 : 1,
            transition: `opacity 80ms`,
          }}
        >
          <Icons.TriangleRight />
        </span>
      </div>
    </button>
  );
}

function NewDocButton({ leftPanel, onClick }) {
  return (
    <button
      data-tip={'New Doc'}
      id="new-doc-button"
      className="roundButton blueButton"
      onClick={onClick}
      style={{
        display: leftPanel && 'none',
        opacity: leftPanel ? 0 : 1,
        transition: `opacity 80ms`,
      }}
    >
      <Icons.NewDoc />
    </button>
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

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const titles = [
  `How To Scale Content Strategy`,
  `How To Use Styleguides To Hit Revenue Metrics`,
  `What Is Grammar`,
  `Kind Words At Work`,
  `A Comprehensive Guide To The AP Style of Writing`,
  `20 Writing Statistics for 2020`,
  `How To Scale Content Strategy`,
  `The People's History of American English`,
  `The Best Writer Tools of 2020`,
];

const bodies = [
  `Tristique risus nec feugiat in. Mattis enim ut tellus elementum sagittis vitae et leo. Turpis egestas maecenas pharetra convallis posuere morbi. Neque egestas congue quisque egestas diam in arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Lacus viverra vitae congue eu. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Sed risus pretium quam vulputate dignissim. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Vulputate eu scelerisque felis imperdiet proin. Morbi tempus iaculis urna id volutpat lacus laoreet. Eget arcu dictum varius duis. Iaculis eu non diam phasellus vestibulum lorem sed. Nunc non blandit massa enim nec dui nunc. Cursus mattis molestie a iaculis at erat pellentesque. Ullamcorper malesuada proin libero nunc consequat interdum. Pharetra massa massa ultricies mi quis hendrerit. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Mi eget mauris pharetra et ultrices neque.`,
  `Quam pellentesque nec nam aliquam sem et tortor consequat. Pretium fusce id velit ut. At urna condimentum mattis pellentesque id nibh. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Justo eget magna fermentum iaculis. Tortor condimentum lacinia quis vel eros donec ac. Aliquet nec ullamcorper sit amet risus nullam eget felis. Interdum velit euismod in pellentesque massa placerat duis ultricies. Egestas diam in arcu cursus euismod quis viverra nibh cras. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor.`,
  `Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Nisl vel pretium lectus quam id leo in vitae turpis. Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Nulla at volutpat diam ut. Nulla pharetra diam sit amet nisl suscipit. Aliquet nec ullamcorper sit amet risus nullam. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Consectetur adipiscing elit ut aliquam purus sit amet. Urna porttitor rhoncus dolor purus. Felis bibendum ut tristique et egestas quis. Pharetra massa massa ultricies mi quis hendrerit dolor. Sed elementum tempus egestas sed sed risus. Pulvinar mattis nunc sed blandit libero volutpat sed. Gravida cum sociis natoque penatibus et magnis dis parturient. Viverra justo nec ultrices dui sapien. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Cras sed felis eget velit aliquet sagittis id. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.`,
  `Egestas dui id ornare arcu odio ut sem nulla. Feugiat in ante metus dictum at tempor. Id venenatis a condimentum vitae sapien. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Placerat duis ultricies lacus sed turpis tincidunt. Nulla at volutpat diam ut venenatis tellus. Quisque non tellus orci ac auctor augue mauris. Aliquam nulla facilisi cras fermentum odio. Venenatis cras sed felis eget velit aliquet sagittis. Tincidunt dui ut ornare lectus sit amet est placerat. Tristique senectus et netus et. A lacus vestibulum sed arcu non odio euismod lacinia. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Suspendisse interdum consectetur libero id faucibus. Placerat duis ultricies lacus sed turpis tincidunt id aliquet. Auctor urna nunc id cursus metus aliquam.`,
  `Faucibus turpis in eu mi. Odio euismod lacinia at quis risus sed. Malesuada fames ac turpis egestas integer eget aliquet nibh. Purus sit amet volutpat consequat mauris nunc congue nisi. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Venenatis cras sed felis eget. Ornare massa eget egestas purus. Turpis massa tincidunt dui ut ornare lectus sit amet est. Fames ac turpis egestas integer eget. Odio tempor orci dapibus ultrices in. Pharetra pharetra massa massa ultricies mi. Felis bibendum ut tristique et egestas quis. Id venenatis a condimentum vitae sapien.`,
  `Lacus suspendisse faucibus interdum posuere. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Varius vel pharetra vel turpis nunc eget lorem dolor. Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Morbi non arcu risus quis varius quam. In eu mi bibendum neque egestas congue. Ac turpis egestas sed tempus. Mollis aliquam ut porttitor leo a diam sollicitudin. Nunc non blandit massa enim. Dolor morbi non arcu risus quis. Varius sit amet mattis vulputate enim. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Vel facilisis volutpat est velit egestas dui id ornare arcu. Rhoncus aenean vel elit scelerisque. Mattis nunc sed blandit libero. Ipsum dolor sit amet consectetur. Urna nunc id cursus metus aliquam eleifend mi in. Id diam maecenas ultricies mi. Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra. Vitae sapien pellentesque habitant morbi tristique.`,
  `Et magnis dis parturient montes nascetur. Arcu dictum varius duis at consectetur lorem donec. Sit amet aliquam id diam maecenas ultricies mi. Mi sit amet mauris commodo quis. Venenatis urna cursus eget nunc scelerisque viverra. Aliquet enim tortor at auctor urna. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Sit amet venenatis urna cursus. Porta nibh venenatis cras sed felis. Varius quam quisque id diam. Massa vitae tortor condimentum lacinia. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Quam nulla porttitor massa id neque aliquam vestibulum morbi blandit. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eu turpis egestas pretium aenean pharetra magna.`,
  `Viverra aliquet eget sit amet tellus cras adipiscing. Aenean vel elit scelerisque mauris pellentesque. Netus et malesuada fames ac turpis. Ac tincidunt vitae semper quis lectus nulla at volutpat diam. Lacus luctus accumsan tortor posuere ac ut consequat. Pretium viverra suspendisse potenti nullam ac. At volutpat diam ut venenatis tellus in metus vulputate eu. Amet purus gravida quis blandit turpis cursus. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Auctor urna nunc id cursus metus aliquam eleifend. Viverra tellus in hac habitasse platea dictumst vestibulum.`,
];

const Star = ({ filled = true }) => (
  <svg
    width="12"
    height="11"
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.23776 1.92275L6 1.19098L5.76224 1.92275L4.92031 4.51393H2.19577H1.42635L2.04883 4.96619L4.25302 6.56763L3.41109 9.15881L3.17333 9.89058L3.79581 9.43832L6 7.83688L8.20419 9.43832L8.82667 9.89058L8.58891 9.15881L7.74698 6.56763L9.95117 4.96619L10.5736 4.51393H9.80423H7.07969L6.23776 1.92275Z"
      fill={filled ? 'black' : 'none'}
      stroke="black"
      stroke-width="0.5"
    />
  </svg>
);

const More = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00033 6.6665C3.26699 6.6665 2.66699 7.2665 2.66699 7.99984C2.66699 8.73317 3.26699 9.33317 4.00033 9.33317C4.73366 9.33317 5.33366 8.73317 5.33366 7.99984C5.33366 7.2665 4.73366 6.6665 4.00033 6.6665ZM12.0001 6.6666C11.2668 6.6666 10.6668 7.2666 10.6668 7.99993C10.6668 8.73327 11.2668 9.33327 12.0001 9.33327C12.7335 9.33327 13.3335 8.73327 13.3335 7.99993C13.3335 7.2666 12.7335 6.6666 12.0001 6.6666ZM8.00013 6.6666C7.2668 6.6666 6.6668 7.2666 6.6668 7.99993C6.6668 8.73327 7.2668 9.33327 8.00013 9.33327C8.73346 9.33327 9.33346 8.73327 9.33346 7.99993C9.33346 7.2666 8.73346 6.6666 8.00013 6.6666Z"
      fill="black"
    />
  </svg>
);

const NewDoc = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.02577 2.5H4C2.89543 2.5 2 3.39543 2 4.5V13.6148C2 14.7193 2.89543 15.6148 4 15.6148H13.1148C14.2193 15.6148 15.1148 14.7193 15.1148 13.6148V9.05738"
      stroke="#3C64FA"
    />
    <path
      d="M13.9361 1.50701L8.56884 6.87428C8.45927 6.98385 8.37666 7.11739 8.32753 7.26436L7.07186 11.0208L10.8283 9.76517C10.9753 9.71604 11.1088 9.63343 11.2184 9.52386L16.5857 4.15659C16.9762 3.76606 16.9762 3.1329 16.5857 2.74237L15.3503 1.50701C14.9598 1.11648 14.3266 1.11648 13.9361 1.50701Z"
      stroke="#3C64FA"
    />
    <path d="M9.02588 6.71558L11.3678 9.0575" stroke="#3C64FA" />
  </svg>
);

const ArrowDown = () => (
  <svg
    width="8"
    height="4"
    viewBox="0 0 8 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0L4 4L8 0H0Z"
      fill="black"
    />
  </svg>
);

const Sort = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.51348 5.74683V12.701M6.90259 10.2516L9.51348 13.067L12.1244 10.2516"
      stroke="#373738"
      strokeWidth="0.777778"
    />
    <path
      d="M4.94404 7.94214L4.94404 4.70436C4.94404 4.70436 4.94404 1.88638 4.94404 0.621947M4.94404 0.621947L7.55493 3.43741M4.94404 0.621947L2.33316 3.4374"
      stroke="#373738"
      strokeWidth="0.777778"
    />
  </svg>
);

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    // return Math.round(elapsed / 1000) + ' seconds ago';
    return 'Just now';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
  }
}

const content = [
  {
    title: 'Kind words at work',
    body: `The pandemic turned work-life on its head. We’re caught in the tumble load of a never-ending workday, pinballing between Zoom and Slack, duking it out with the family for WiFi, dishes piling up around us in our office…er…kitchen, and just trying to hold it together while we just. take. a. minute. to. remember. what. day. it. is. It’s a high-stress moment. That stress shows up at work, especially in how we talk to each other. Indeed, more than one-third of us has been on the receiving end of toxic workplace communication since the lockdown started, with almost 20 percent experiencing hostility related to how we’re balancing work and life at the moment. If there were ever a time for us to pull together and be more empathetic, it’s now. Here’s your checklist for how you can get started in your next email, chat message, or video conversation. The most empathetic thing you can do for your colleagues is communicate clearly. Be short, sweet, and very clear. Really knock it out of the park with a “TL;DR” (a quick summary) at the beginning of every message. Your co-workers will want to hug you (in a socially-distanced way, of course).
    `,
  },
  {
    title: 'A comprehensive guide to the AP style of writing',
    body: `Associated Press (AP) style is the go-to English style and usage guide for journalism and news writing, such as magazines and newspapers. AP style dictates basic rules for grammar and punctuation, as well as specific styles for numbers, spelling, capitalization, abbreviations, acronyms, and much more. The ins and outs of AP style can be found within the “Associated Press Stylebook and Briefing on Media Law.”. While the AP Styleguide was originally sold as a handbook for reporters, it’s rapidly become the leading reference for the majority of public-facing communication, including websites, white papers, and press releases to reflect new additions to the English language or address common verbiage seen in the media. For instance, the latest edition included new or revised entries for digital wallets, smart devices, and the novel coronavirus. If you’re ever in doubt about acceptable word use or modern jargon, the styleguide is continuously refreshed to keep up with trends.`,
  },
  {
    title: 'What is grammar?',
    body: `As long as there have been rules of grammar, there have been theories about what makes it work and how to classify it. For example, American linguist Noam Chomsky posited the theory of universal grammar. It says that common rules dictate all language. In his view, humans have an innate knowledge of language that informs those rules. That, he reasoned, is why children can pick up on complex grammar without explicit knowledge of the rules. But grammarians still debate about whether this theory holds true.`,
  },
  {
    title:
      'AI for beginners: What are artificial intelligence, machine learning, deep learning, and natural language processing?',
    body: `Here’s a challenge: define artificial intelligence and list some examples of AI technology. Then ask your coworker, a friend, or a stranger to do the same. I’ll bet your definitions and examples of AI don’t match. They may be closely related, but it’s pretty typical for people to have different takes on what does and doesn’t count as AI.`,
  },
];
