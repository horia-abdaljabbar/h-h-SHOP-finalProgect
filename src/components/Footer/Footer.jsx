import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faPhone, faMessage} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
<div className='footer p-2'>
<div className="container mt-2">
    <div >
    <div className='end  row gap-3'>
    <div className='col'>
       <img className='logo'src="/logo.svg" alt='the website logo' ></img>

       </div>
        <div className='col'>
        <div className='info  d-flex flex-column gap-3'>
            <div className='location d-flex gap-3 justify-content-start align-items-center'>
            <FontAwesomeIcon icon={faLocationDot} className='icon'/>
<span className='ms-1'>Palestine ...</span>
            </div>
            <div className='callUs d-flex gap-3 justify-content-start align-items-center'>
            <FontAwesomeIcon icon={faPhone} className='icon'/>
<span>+122334445</span>
            </div>
            <div className='support d-flex gap-3 justify-content-start align-items-center'>
            <FontAwesomeIcon icon={faMessage} className='icon'/>
<span>support@hhshop.com</span>
            </div>

        </div>
        </div>
       <div className='col'>
       <div className='about d-flex flex-column gap-4'>
            <h4 className='aboutTitle mt-5'>visit our accounts...</h4>
    <div className='accounts'>
<Link><img className="accountIcon p-2"src="/Instagram.svg"/></Link>
<Link><img className="accountIcon p-2" src="/facebook.svg"/></Link>
<Link><img className="accountIcon p-2" src="/whatsApp.svg"/></Link>

        </div>
        </div>

       </div>
       
    </div>
    <div className='col-12 d-flex justify-content-center'>
  </div>     <span className='copyRight '>all copy right reserved @ 2015</span>
    </div>
  </div>
</div>


</>
  )
}

export default Footer