import { Link } from 'react-router-dom';
export function SectionTitle({eyebrow=''} ) { return <div className="section-title"><span>{eyebrow}</span><div/></div> }
export function Paper({children,className=''}) { return <section className={`paper ${className}`}>{children}</section> }
export function ArrowLink({to,children}) {return <Link className="arrow-link" to={to}>{children} <b>→</b></Link>}
export function Stamp({children}) {return <span className="stamp">{children}</span>}
