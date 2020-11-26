import React from 'react'

import { AutoTabProvider } from 'react-auto-tab'
import 'react-auto-tab/dist/index.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faHeart, faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons'

import beeConservancyLogo from './bee-conservancy-logo.png'
import secoreLogo from './secore-logo.png'

const App = () => {
  return (
    <div>
      <h1>react-auto-tab Example</h1>
      <p>
        So if you made it here, chances are- you know what you're looking at.
        But <i>in case you don't</i>, here ya go.
        <br />
        Basically this is a React based npm package that allows for super easy
        and lightweight input auto-tabbing (+some more stuff).
      </p>
      <span>
        <b>But Otho, how the heck does it work?</b>
      </span>
      <p>
        I'm not going to go too into detail here, but here is a whole{' '}
        <a href='#'>README.md</a> for your enjoyment. But it basically uses
        React Refs to focus on the next/prev element, you just get to easily to
        choose when and how. Just wrap your existing code in an the
        AutoTabProvider element, put in your settings (if any) and let it do the
        work
      </p>
      <form>
        <div className='block'>
          <p>Tab/Focus next element when maxLength is hit</p>
          <AutoTabProvider settings={{ className: 'question' }}>
            <label>Birthday: </label>
            <input className='xxs' type='text' maxLength='2' placeholder='10' />
            <span>/</span>
            <input className='xxs' type='text' maxLength='2' placeholder='19' />
            <span>/</span>
            <input className='s' type='text' maxLength='4' placeholder='1998' />
          </AutoTabProvider>
        </div>
        <div className='block'>
          <p>
            Tab/Focus next element on keypress, 'Enter' in this case. Except for
            the middle initial
          </p>
          <AutoTabProvider
            settings={{ className: 'question', nextonkey: 'enter' }}
          >
            <label>Name: </label>
            <input type='text' className='m' placeholder='First' />
            <input
              type='text'
              className='single'
              maxLength='1'
              placeholder='M'
            />
            <span>.{'  '}</span>
            <input type='text' className='m' placeholder='Last' />
          </AutoTabProvider>
          <p>This one will igore (jump) the middle initial!</p>
          <AutoTabProvider
            settings={{ className: 'question', nextonkey: 'enter' }}
          >
            <label>Name: </label>
            <input type='text' className='m' placeholder='First' />
            <input
              ignorefocus={1}
              type='text'
              className='single'
              maxLength='1'
              placeholder='M'
            />
            <span>.{'  '}</span>
            <input type='text' className='m' placeholder='Last' />
          </AutoTabProvider>
        </div>
        <div className='block'>
          <p>
            It works with select and textarea elements too! We also turned off
            back-tab/focus prev element on backspace here
          </p>
          <AutoTabProvider settings={{ className: 'question', prevonkey: 0 }}>
            <label>CC: </label>
            <input
              className='xs'
              type='text'
              maxLength='4'
              placeholder='4321'
            />
            <span>-</span>
            <input
              className='xs'
              type='text'
              maxLength='4'
              placeholder='4321'
            />
            <span>-</span>
            <input
              className='xs'
              type='text'
              maxLength='4'
              placeholder='4321'
            />
            <span>-</span>
            <input
              className='xs'
              type='text'
              maxLength='4'
              placeholder='4321'
            />
            <br></br>
            <label>Card type: </label>
            <select defaultValue='0'>
              <option disabled value='0'>
                Select one
              </option>
              <option value='1'>Visa</option>
              <option value='2'>Mastercard</option>
            </select>
            <label>Exp: </label>
            <input type='text' className='xxs' maxLength='2' placeholder='12' />
            <span>/</span>
            <input type='text' className='xxs' maxLength='2' placeholder='24' />
            <label>Memo:</label>
            <textarea placeholder='...'></textarea>
          </AutoTabProvider>
          <small>
            I shouldnt have to say this but don't use a real CC number, thanks
          </small>
        </div>
      </form>
      <p>
        I hope this little NPM package is helpful! If you like it, consider
        donating to one of the{' '}
        <i>
          <b>awesome</b>
        </i>{' '}
        charities below!
      </p>
      <div className='flex-row'>
        <a href='https://thebeeconservancy.org/donate/'>
          <img src={beeConservancyLogo}></img>
        </a>
        <a href='https://interland3.donorperfect.net/weblink/weblink.aspx?name=E343983&id=1'>
          <img src={secoreLogo}></img>
        </a>
      </div>
      <div className='flex-row'>
        <div>
          <p>
            Made with{' '}
            <FontAwesomeIcon style={{ color: 'red' }} icon={faHeart} /> &amp;{' '}
            <FontAwesomeIcon
              style={{ color: 'darkblue' }}
              icon={faHeadphonesAlt}
            />{' '}
            by Otho
          </p>
        </div>
        <div>
          <p>Follow Me!</p>
          <a href='https://www.instagram.com/okd_v/'>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href='https://github.com/okdv'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
      <p>
        The logo's used above are created by and property of{' '}
        <a href='https://thebeeconservancy.org'>The Bee Conservancy</a> and{' '}
        <a href='http://www.secore.org/site/home.html'>Secore International</a>{' '}
        respectively, I am not affiliated with either of the organizations
      </p>
    </div>
  )
}

export default App
