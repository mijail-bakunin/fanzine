import { Link } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import source from '../assets/guillotina-reference.png';
import SocialLinks from '../components/SocialLinks';
import EditionFragment from '../features/edition/components/EditionFragment';
import NoteModal from '../features/edition/components/NoteModal';
import { useEditionHome } from '../features/edition/hooks/useEditionHome';
import '../features/edition/edition.css';

export default function Home() {
  const { home, error, commentsByNote, commentsStatus, loadComments, addComment, upvoteComment } = useEditionHome();
  const [activeNoteId, setActiveNoteId] = useState(null);
  const lastTrigger = useRef(null);
  const activeNote = useMemo(() => home?.notes.find(note => note.id === activeNoteId) ?? null, [home, activeNoteId]);

  const openNote = useCallback((noteId, event) => {
    lastTrigger.current = event?.currentTarget ?? lastTrigger.current;
    setActiveNoteId(noteId);
    loadComments(noteId);
  }, [loadComments]);

  const closeNote = () => setActiveNoteId(null);

  useEffect(() => {
    if (!activeNote || !home) return;
    const onKeyDown = event => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const index = home.notes.findIndex(note => note.id === activeNote.id);
      if (event.key === 'ArrowRight') { event.preventDefault(); openNote(home.notes[(index + 1) % home.notes.length].id); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); openNote(home.notes[(index - 1 + home.notes.length) % home.notes.length].id); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeNote, home, openNote]);

  if (error) return <p className="home-status" role="alert">{error}</p>;
  if (!home) return <p className="home-status" role="status">Cargando edición…</p>;

  return <article className="publication">
    <section className="fragment fragment--masthead" aria-label="Portada de La Guillotina"><img src={source} alt="Portada de La Guillotina" /></section>
    <nav className="publication-nav" aria-label="Navegación de la revista">{home.edition.navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav>
    <div className="edition-canvas" aria-label={`Edición ${home.edition.number}`}>
      {home.notes.map(note => <EditionFragment key={note.id} note={note} source={source} onOpen={openNote} />)}
    </div>
    {activeNote && <NoteModal note={activeNote} editionSlug={home.edition.slug} comments={commentsByNote[activeNote.id]} status={commentsStatus[activeNote.id]} onClose={closeNote} onComment={addComment} onUpvote={upvoteComment} returnFocusTo={lastTrigger} />}
    <footer className="publication-imprint"><div><b>{home.edition.publication}</b><span>REVISTA ANARQUISTA · EDICIÓN {home.edition.number}</span></div><p>HECHA SIN AMO · SIN COPYRIGHT · COPIÁ · DIFUNDÍ · ORGANIZATE</p><SocialLinks /></footer>
  </article>;
}
