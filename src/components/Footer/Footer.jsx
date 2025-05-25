import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: "#3a3a3a" }} className='d-flex flex-column flex-sm-row justify-content-between p-5'>
            <div className="footer-left pt-2">
                <span className='text-white'>Copyright © 2025 ONOISTORE</span>
            </div>
            <div className="footer-right pt-2">
                <span className='pe-1 text-white'>Made by</span>
                <span className='fw-bold' style={{ color: "#78909c", cursor: "pointer" }} onClick={() => { window.open("https://www.instagram.com/almazbekov.n7?igsh=ZGg5aGNjZDBod3p2&utm_source=qr") }}>Developer</span>
            </div>
        </footer>
    )
}

export default Footer;