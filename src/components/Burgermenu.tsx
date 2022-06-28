import Image from 'next/image'
import menuicon from '../images/menu.png'
const Burgermenu = (props) => {
    return (<div style={{ display: 'block', width: '10%', margin: "0 auto" }}>
        <Image
            src={menuicon}
            alt="banner"

        /> </div>
    )
}

export default Burgermenu