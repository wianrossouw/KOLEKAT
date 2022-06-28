import Image from 'next/image'
import mypic from '../images/kolekat_streetwear_subscribe_banner.jpg'
const BannerImage2 = (props) => {
    return (<div style={{ display: 'flex', width: '100%', margin: "0 auto" }}>
        <Image
            src={mypic}
            alt="banner"
        /> </div>
    )
}

export default BannerImage2