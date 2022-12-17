import { useState } from 'react';
import { Menu } from '../Menu';
import './header.css';

interface IHeader {
  pageTitle: string
}

export const Header = ({ pageTitle }: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='header--container'>
      <div>
        {showMenu ?
          <i 
            className="fa-solid fa-xmark header--menu__icon close--icon"
            onClick={() => setShowMenu(false)}/> :
          <i
            className="fa-solid fa-bars header--menu__icon"
            onClick={() => setShowMenu(true)} />
        }
      </div>
      {
        showMenu &&
        <Menu/>
      }
      <h3 className='header--title'>{pageTitle}</h3>
      <div></div>
    </div>
  )
}