import React from 'react'
import RandExp from 'randexp'

const AboutPage = () => (
  <div className='l-content-container'>
    <h3>About</h3>

    <p>This project was inspired by a challenge of <a target='_blank' href='https://github.com/contabilizei/front-end-teste'>Contabilizei</a>.</p>

    <p>
      Use Marvel's Comic API: <a target='_blank' href='https://developer.marvel.com/'><strong>developer.marvel.com/</strong></a>.
      In addition, it generates 10% of the Comics as 'rare' item, defined by the top thick border.
    </p>

    <p>
      In the 'My Cart' page you can apply discount coupons. There are two types, for regular comic and for rare item.
      <br />
      Try this:
      <strong> {new RandExp(/[0-9]\w{3,5}([A-Z]{2})/).gen()}</strong> or <strong>{new RandExp(/([A-Z]{2})[0-9]{4}[a-z]/).gen()}</strong>
    </p>

    <p>~> <a target='_blank' href='https://github.com/caionnx/comic-store'>Github page</a>.</p>
  </div>
)

export default AboutPage
