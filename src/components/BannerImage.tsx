import Image from 'next/image'
import mypic from '/BannerImage.jpg'
const BannerImage = (props) => {
    return (<div style={{ display: 'flex', width: '100%', margin: "0 auto" }}>
        <Image
            src={mypic}
            alt="banner"
        /> </div>
    )
}

export default BannerImage
