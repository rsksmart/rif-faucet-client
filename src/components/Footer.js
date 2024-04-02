import React from "react";

export const Footer = () => (
  <footer>
    <div style={styles.divContainer}>
      <div style={styles.divInfo}>
        <a
          href='https://rootstocklabs.com'
          target='_blank'
          rel='noreferrer noopener'
          style={{ display: 'flex', flexDirection: 'column', color: 'black' }}
        >
          <span style={{ fontWeight: 400 }}>Built by <span style={{ fontWeight: 'bold', fontFamily: 'Sora', fontSize: 14 }}>RootstockLabs</span></span>
          <span style={{ fontSize: 7 }}>Copyright © {new Date().getFullYear()} RootstockLabs. All rights reserved.</span>
        </a>
        {/*  Powered by*/}
      </div>
      <div
        style={styles.secondDiv}
      >
        {/*  Documents */}
        <a
          href='https://rootstocklabs.com/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <p>About Rootstock Labs</p>
        </a>
        <a
          href='https://developers.rsk.co/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <p>Developer's Portal</p>
        </a>
        <a
          href='https://rootstock.io/terms-conditions/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <p>Terms & Conditions</p>
        </a>
        <a
          href='https://rootstock.io/privacy-policy/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <p>Privacy</p>
        </a>
      </div>
      <div className='social-media'>
        {/*  Social stuff */}
        {/*  Twitter */}
        <a
          href='https://twitter.com/rootstock_io'
          target='_blank'
          rel='noreferrer noopener'
        >
          <img src='assets/img/twitter.svg' alt='Twitter Icon' />
        </a>
        {/*  Github */}
        <a
          href='https://github.com/rsksmart'
          target='_blank'
          rel='noreferrer noopener'
        >
          <img src='assets/img/github.svg' alt='Github Icon' />
        </a>
        {/*  Maim URL */}
        <a
          href='https://discord.com/invite/rootstock'
          target='_blank'
          rel='noreferrer noopener'
        >
          <img src='assets/img/discord.svg' alt='Discord Icon' style={{ width: 23 }} />
        </a>
      </div>
    </div>
  </footer>
)

const styles = {
  divContainer: { display: 'grid', gridTemplateColumns: '1.05fr 0.85fr 1fr' },
  divInfo: {
    color: 'black',
    fontSize: 10,
  },
  secondDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    columnGap: '2em'
  },
}
