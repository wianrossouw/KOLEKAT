import Image from 'next/image'
import mypic from '../images/logosmall.jpg'
const MyImage = (props) => {
    return (
        <Image
            src={mypic}
            alt="logo"
            width="100px"
            height="100px"
        />
    )
}

export default MyImage