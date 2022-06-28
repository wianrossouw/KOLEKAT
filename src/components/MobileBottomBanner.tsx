import Image from 'next/image'
import mypic from '../images/kolekat_shirt_banner_bottom1.jpg'
const MobileBottomBanner = (props) => {
    return (<div style={{ display: 'flex', width: '100%', margin: "0 auto" }}>
        <Image
            src={mypic}
            alt="banner"
        /> </div>
    )
}

export default MobileBottomBanner