import React from "react";

//divided into small function to get rid of mess code
function Header() {
  //divided into small function to get rid of mess code
  const menuToggle = () => {
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");

    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
  };

  return (
    <header data-testid="header">
      <a href="/#" className="logo">
        HEROGİ
      </a>
      <div className="toggleMenu" onClick={() => menuToggle()}></div>
      <ul className="navigation">
        <li>
          <a href="/#">Home</a>
        </li>
        <li>
          <a href="/#">About me</a>
        </li>
        <li>
          <a href="/#">Work</a>
        </li>
        <li>
          <a href="/#">Contact</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
