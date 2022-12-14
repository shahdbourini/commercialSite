import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Cart from "../cart/Carts";
import Banner from "../banner/Banner.js";
import "./NavStyle.css";


function Navbar(outSideClick) {
  const links = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "Features", href: "/features" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const [searchActive, setSearchActive] = useState(false);

  const [leftOpen, setLeftOpen] = useState(false); //for cart open and close

  const navbarRef = useRef(null);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const homeRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const toursRef = useRef(null);

  const blocks = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    tours: toursRef,
  };

  const onSeachActive = () => setSearchActive(false);
  const onSearchActiveHandler = () => setSearchActive(!searchActive);

  const closeCart = () => {
    setLeftOpen(false);
  }
  
  
  function scrollLinksClickHandlers(e, href) {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = href.slice(1);
    const element = blocks[id].current;
    
    const navHeight = navbarRef.current.getBoundingClientRect().height;
    // const containerHeight = linksContainerRef.current.getBoundingClientRect().height;
    const fixedNav = navbarRef.current.classList.contains("fixed-nav");
    let position = element.offsetTop + navHeight;
    
    if (!fixedNav) {
      position = position - navHeight;
    }
    // if (navHeight > 82) {
      //   position = position - containerHeight;
      // }
      
      window.scrollTo({
        left: 0,
        top: position,
      });
      // close
      linksContainerRef.current.style.height = 0;
    }
    
    useEffect(() => {

    // for fixed navbar after specific distance
      window.addEventListener("scroll", function (e) {
        const scrollHeight = window.pageYOffset;
        const navHeight = navbarRef.current.getBoundingClientRect().height;
        console.log(scrollHeight , navHeight);
        if (scrollHeight > navHeight) {
          navbarRef.current.classList.add("fixed-nav");
        } else {
          navbarRef.current.classList.remove("fixed-nav");
        }
  
  
        
        // setup back to top link
  
        // if (scrollHeight > 500) {
        //   topLinkRef.current.classList.add("show-link");
        // } else {
        //   topLinkRef.current.classList.remove("show-link");
        // }
      });

      
      const checkIfClickedOutside = (e) => {
        // If the menu is open and the clicked target is not within the menu,
        // then close the menu
        if (searchActive && homeRef.current && !homeRef.current.contains(e.target)) {
          setSearchActive(false);
        }
      };
  
      document.addEventListener("mousedown", checkIfClickedOutside);
  
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }, [searchActive]);


  return (
    <>

      <header id="home" ref={homeRef}>
        <nav id="nav" ref={navbarRef}>
          <div className="nav-center">
            <div className="nav-header">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.webp"}
                className="logo"
                alt="logo"
              />
              {/* <button className="nav-toggle" onClick={navBarToggleHandler}>
              <i className="fas fa-bars"></i>
            </button> */}
              <div className="links-container" ref={linksContainerRef}>
                <ul className="links" ref={linksRef}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        to={link.href}
                        className="scroll-link"
                      // onClick={(e) => scrollLinksClickHandlers(e, link.href)}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>




            <div className="links-container icons-direction">
              <ul className="links">
                <div className="icons">

                  <li>
                    {" "}
                    <span className="scroll-link">
                      <i class="fa fa-heart" aria-hidden="true"></i>
                    </span>
                  </li>
                </div>

                <div className="icons">

                  <li onClick={() => setLeftOpen(!leftOpen)}>
                    {" "}
                    <span className="scroll-link">
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                  </li>
                </div>

                <div className="search-bar">
                  <div className="icons" onClick={onSearchActiveHandler}>
                    <span className="scroll-link">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  {searchActive ?
                    <input
                      type="text"
                      placeholder="Search"
                      dir="ltr"
                      className="inputSearch inputTransition"
                    /> : <input
                      type="text"
                      placeholder="Search"
                      className="inputSearch"
                    />

                  }

                </div>

              </ul>
            </div>

            <div style={{ clear: 'both' }}></div>
          </div>
        </nav>

        <Cart leftOpen={leftOpen} closeCart={closeCart} />

        {/* <Banner /> */}
      </header>

      {/* <section id="about" className="section" ref={aboutRef}>
        <div className="title">
          <h2>
            about <span>us</span>
          </h2>
        </div>
      </section>
      <section id="services" className="section" ref={servicesRef}>
        <div className="title">
          <h2>
            our <span>services</span>
          </h2>
        </div>
      </section>
      <section id="tours" className="section" ref={toursRef}>
        <div className="title">
          <h2>
            featured <span>tours</span>
          </h2>
        </div>
      </section>
      <footer className="section">
        <p>
          copyright &copy; backroads travel tours company
          <span id="date">{copyrightYear}</span>. all rights reserved
        </p>
      </footer>
      <a
        className="scroll-link top-link"
        href="#home"
        ref={topLinkRef}
        onClick={(e) => scrollLinksClickHandlers(e, "#home")}
      >
        <i className="fas fa-arrow-up"></i>
      </a> */}

    </>
  );
}

export default Navbar;
