import React from "react";

export const Footer = () => (
  <footer>
    <div style={styles.divContainer}>
      <div style={styles.divInfo}>
        <a
          href='https://rootstocklabs.com'
          target='_blank'
          rel='noreferrer noopener'
        >
          {/*<img src='assets/img/powered_by.svg' alt='Powered by IOV Labs' />*/}
          Build by Rootstock Labs
        </a>
        {/*  Powered by*/}
      </div>
      <div
        style={styles.divInfo}
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
  divContainer: { display: 'flex', justifyContent: 'space-between' },
  divInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    color: 'black',
    fontSize: 10,
    columnGap: '2em'
  }
}