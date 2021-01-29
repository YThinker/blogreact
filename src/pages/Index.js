import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../router/Routes';
import routers from '../router/index';

import indexless from './Index.module.less';

function AsideBar() {
  return (
    <aside className={indexless.aside}>
      <Link to="/test2" className={indexless.asideItem}>home</Link>
      <Link to={{ pathname: '/todolist', query: { content: 1234 } }} className={indexless.asideItem}>todoList</Link>
      <Link to='/error' className={indexless.asideItem}>Error Page</Link>
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
      <header className={indexless.header}>
        <div className={indexless.headerContent}>
          <ul className={indexless.leftNav}>
            <li><Link to="/test2" className={indexless.headerItem}>home</Link></li>
            <li><Link to="/test1" className={indexless.headerItem}>todoList</Link></li>
          </ul>
          <ul className={indexless.rightNav}>
            <li onClick={() => toggleDrawer(!showDrawer)}><i className="iconfont icon icon-shezhi"></i></li>
          </ul>
        </div>
      </header>
    </>
  );
}

function Index() {

  return (
    <>
      <div className={indexless.div}>
        <NavBar/>
        <div className={indexless.content}>
          <AsideBar />
          <main className={indexless.routerView}>
            <Routes routers={routers}/>
          </main>
        </div>
      </div>
    </>
  );
}

function Drawer(props) {

  return (
    <div className={indexless.drawer} style={{visibility:(props.showDrawer ? 'visible' : 'hidden')}}>
      <div className={indexless.shade} onClick={() => props.toggleDrawer(!props.showDrawer)} style={{animationName:(props.showDrawer ? 'showShade' : 'hideShade')}}></div>
      <section className={indexless.content} style={{animationName:(props.showDrawer ? 'showContent' : 'hideContent')}}></section>
    </div>
  );
}

export default Index;