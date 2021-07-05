import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RenderRoutes from '../router/RenderRoutes'

import {makeStyles} from '@material-ui/core';


function Index(props) {
  console.log(props);

  return (
    <>
      <NavBar />
      {RenderRoutes(props.route.routes)}
      <Footer />
    </>
  );
}

// function AsideBar() {
//   return (
//     <aside className={indexless.aside}>
//       <Link to="/test2" className={indexless.asideItem}>home</Link>
//       <Link to={{ pathname: '/index/todolist', query: { content: 1234 } }} className={indexless.asideItem}>todoList</Link>
//       <Link to='/error' className={indexless.asideItem}>Error Page</Link>
//     </aside>
//   );
// }

function NavBar(props) {
  const indexless = useStyles();

  return (
    <header className={indexless.header}>
      <ul className={indexless.leftNav}>
        <li><Link to="/index/home" className={indexless.headerItem}>home</Link><i></i></li>
        <li><Link to="/index/todolist" className={indexless.headerItem}>todoList</Link><i></i></li>
      </ul>
    </header>
  );
}

function Footer(props) {
  const indexless = useStyles();

  return (
    <footer className={indexless.footer}>
      
    </footer>
  )
}

// function Drawer(props) {

//   return (
//     <div className={indexless.drawer} style={{visibility:(props.showDrawer ? 'visible' : 'hidden')}}>
//       <div className={indexless.shade} onClick={() => props.toggleDrawer(!props.showDrawer)} style={{animationName:(props.showDrawer ? 'showShade' : 'hideShade')}}></div>
//       <section className={indexless.content} style={{animationName:(props.showDrawer ? 'showContent' : 'hideContent')}}></section>
//     </div>
//   );
// }

const useStyles = makeStyles( theme => ({

  header: {
    position: 'fixed',
    zIndex: '99',
    top: '0',
    width: '100%',
    height: '70px',
    backgroundColor: '#000',
    opacity: '0.8',
    padding: '0 20px',
    textAlign: 'right', 
    boxSizing: 'border-box',
  },
  leftNav: {
    display: 'inline-block',
    '& li':{
      display: 'inline-block',
      color: '#fff',
      padding: '0 10px',
      margin: '0 10px',
      position: 'relative',
    },
    '& i':{
      display: 'inline-block',
      height: '2px',
      width: '100%',
      backgroundColor: '#fff',
      position: 'absolute',
      left: '0',
      bottom: '1em',
      transform: 'scale(0)',
    },
    '& li>a':{
      color: '#fff',
      outline: 'none',
      textDecoration: 'none',
      lineHeight: '70px',
    },
    '& li:hover i':{
      transform: 'scale(1)',
    },
  },
  footer: {
    width: '100%',
    height: '150px',
    backgroundColor: '#000',
    opacity: '0.8',
    position: 'absolute',
    bottom: '0'
  },

}))

export default Index;