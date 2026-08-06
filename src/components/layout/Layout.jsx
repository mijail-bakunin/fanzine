import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
export default function Layout(){ const { pathname }=useLocation(); const isFrontPage=pathname==='/'; return <div className={`site-shell ${isFrontPage?'site-shell--facsimile':''}`}>{!isFrontPage&&<Header/>}<main><Outlet/></main>{!isFrontPage&&<Footer/>}</div> }
