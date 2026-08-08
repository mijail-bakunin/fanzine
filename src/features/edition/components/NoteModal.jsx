import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';

export default function NoteModal({ note, editionSlug, comments, status, onClose, onComment, onUpvote, returnFocusTo }) {
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [copied, setCopied] = useState(false);
  const closeButton = useRef(null);
  const commentsSection = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    closeButton.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        returnFocusTo?.current?.focus();
      }
      if (event.key === 'Tab') {
        const focusable = [...(panel.current?.querySelectorAll('button:not([disabled]), a[href], textarea:not([disabled])') ?? [])];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, returnFocusTo]);

  const close = () => { onClose(); returnFocusTo?.current?.focus(); };
  const copyLink = async () => { try { await navigator.clipboard?.writeText(window.location.href); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  const submit = async event => {
    event.preventDefault();
    if (!draft.trim()) return;
    setSubmitting(true); setActionError('');
    try { await onComment(note.id, draft.trim()); setDraft(''); }
    catch { setActionError('No se pudo publicar el comentario. Intentá nuevamente.'); }
    finally { setSubmitting(false); }
  };
  const vote = async commentId => {
    setActionError('');
    try { await onUpvote(note.id, commentId); }
    catch { setActionError('No se pudo registrar el voto. Intentá nuevamente.'); }
  };

  return createPortal(<div className="note-modal" role="dialog" aria-modal="true" aria-labelledby={`note-title-${note.id}`}>
    <button className="note-modal__backdrop" onClick={close} aria-label="Cerrar nota" />
    <section className={`note-modal__panel note-modal__panel--${note.tone}`} ref={panel}>
      <header className="note-modal__header"><span>NOTA / {note.tone.toUpperCase()}</span><button ref={closeButton} type="button" onClick={close}>CERRAR ×</button></header>
      <div className="note-modal__content">
        <div className="note-modal__intro"><p>{note.subtitle}</p><h2 id={`note-title-${note.id}`}>{note.title}</h2><div className="note-modal__actions"><button type="button" onClick={copyLink}>{copied ? 'ENLACE COPIADO' : 'COMPARTIR ↗'}</button><button type="button" onClick={() => commentsSection.current?.scrollIntoView({ behavior: 'smooth' })}>COMENTAR ↓</button></div></div>
        <div className="note-modal__article">{note.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{note.editionLink && <Link to={`/edicion/${editionSlug}`}>Ver índice completo →</Link>}<p>Esta nota forma parte de una lectura abierta: podés volver a ella, compartirla y dejar una idea para que el texto siga circulando.</p></div>
        <section className="note-modal__comments" ref={commentsSection}><h3>Comentarios <span>{comments?.length ?? 0}</span></h3>{status === 'loading' && <p className="modal-status">Cargando comentarios…</p>}{status === 'error' && <p className="modal-status" role="alert">No se pudieron cargar los comentarios.</p>}<div className="comment-list">{comments?.map(comment => <article className="comment" key={comment.id}><b>{comment.author}</b><p>{comment.body}</p><button type="button" onClick={() => vote(comment.id)}>↑ útil {comment.votes}</button></article>)}</div>{actionError && <p className="modal-status" role="alert">{actionError}</p>}<form onSubmit={submit}><label htmlFor={`comment-${note.id}`}>Sumá tu voz</label><textarea id={`comment-${note.id}`} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Escribí tu comentario…" rows="4" disabled={submitting}/><button type="submit" disabled={submitting}>{submitting ? 'PUBLICANDO…' : 'PUBLICAR COMENTARIO →'}</button></form></section>
      </div>
    </section>
  </div>, document.body);
}
