import { Leaf } from '../components/Decor'

export default function Mission() {
  return (
    <section id="mission" className="mission">
      <div className="wrap split">
        <div>
          <h2>Making the world a little kinder, one act at a time.</h2>
          <p className="lead">KINDNEST is a quiet corner of the internet built for good news. Share what someone did for you, find a neighbour who needs a hand, and watch your community grow like a garden.</p>
        </div>
        <ul className="plant">
          <li>
            <div className="plant-icon"><Leaf s={26} c="#789779" /></div>
            <div>
              <h3>Plant</h3>
              <p>Share one small thing you did, or one that was done for you.</p>
            </div>
          </li>
          <li>
            <div className="plant-icon"><Leaf s={26} c="#F28B72" r={25} /></div>
            <div>
              <h3>Water</h3>
              <p>Appreciate others and join a chain. Kindness spreads when it is seen.</p>
            </div>
          </li>
          <li>
            <div className="plant-icon"><Leaf s={26} c="#263B32" r={-20} /></div>
            <div>
              <h3>Grow</h3>
              <p>Watch the Kindness Tree fill with leaves, one act from every visitor.</p>
            </div>
          </li>
        </ul>
      </div>
      <p className="wrap serif big-q mission-q">
        Every act of kindness plants a seed. Together, we grow a kinder world.
      </p>
    </section>
  )
}
