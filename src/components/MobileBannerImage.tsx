import Image from 'next/image'
import mypic from '../images/mobile_bannerimage.jpg'
const MobileBannerImage = (props) => {
    return (<div style={{ display: 'flex', width: '100%', margin: "0 auto" }}>
        <Image
            src={mypic}
            alt="banner"
        /> </div>
    )
}

export default MobileBannerImage