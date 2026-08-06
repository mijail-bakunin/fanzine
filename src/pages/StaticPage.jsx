import {Paper,SectionTitle} from '../components/ui';
export default function StaticPage({eyebrow,title,children}){return <section className="page static-page"><header className="page-heading"><p>{eyebrow}</p><h1>{title}</h1></header><Paper><SectionTitle eyebrow="LA GUILLOTINA"/><div className="prose">{children}</div></Paper></section>}
