export default function EditionFragment({ note, source, onOpen }) {
  const unit = value => `${(value / 1055 * 100).toFixed(5)}cqw`;
  const style = {
    '--left': unit(note.x), '--top': unit(note.y - 440),
    '--width': unit(note.w), '--height': unit(note.h),
    '--image-left': unit(-note.x), '--image-top': unit(-note.y),
  };

  return <section className={`fragment fragment--${note.fragment}`} style={style} aria-label={note.title}>
    <img src={source} alt="" />
    <button className={`story-note story-note--${note.tone}`} type="button" onClick={event => onOpen(note.id, event)}>
      <span>LEER +</span>
      <strong>{note.title}</strong>
      <small>{note.subtitle}</small>
    </button>
  </section>;
}
