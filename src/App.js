import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Routes from './router/Routes';
import routers from './router/index';

import appless from './App.module.less';

function AsideBar() {
  return (
    <aside className={appless.aside}>
      <Link to="/test2" className={appless.asideItem}>home</Link>
      <Link to={{ pathname: '/todolist', query: { content: 1234 } }} className={appless.asideItem}>todoList</Link>
      <Link to='/error' className={appless.asideItem}>Error Page</Link>
    </aside>
  );
}

function NavBar(props) {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = (state) => {
    setShowDrawer(state);
  }

  return (
    <>
      <Drawer showDrawer={showDrawer} toggleDrawer={toggleDrawer}/>
      <header className={appless.header}>
        <div className={appless.headerContent}>
          <ul className={appless.leftNav}>
            <li><Link to="/test2" className={appless.headerItem}>home</Link></li>
            <li><Link to="/test1" className={appless.headerItem}>todoList</Link></li>
          </ul>
          <ul className={appless.rightNav}>
            <li onClick={() => toggleDrawer(!showDrawer)}><i className="iconfont icon icon-shezhi"></i></li>
          </ul>
        </div>
      </header>
    </>
  );
}

function App() {

  return (
    <>
      <div className={appless.div}>
        <NavBar/>
        <div className={appless.content}>
          <AsideBar />
          <main className={appless.routerView}>
            <Routes routers={routers}/>
          </main>
        </div>
      </div>
    </>
  );
}

function Drawer(props) {

  return (
    <div className={appless.drawer} style={{visibility:(props.showDrawer ? 'visible' : 'hidden')}}>
      <div className={appless.shade} onClick={() => props.toggleDrawer(!props.showDrawer)} style={{animationName:(props.showDrawer ? 'showShade' : 'hideShade')}}></div>
      <section className={appless.content} style={{animationName:(props.showDrawer ? 'showContent' : 'hideContent')}}></section>
    </div>
  );
}

export default App;