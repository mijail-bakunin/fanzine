import { useCallback, useEffect, useState } from 'react';
import { notesApi } from '../../../api/notesApi';

export function useEditionHome() {
  const [home, setHome] = useState(null);
  const [error, setError] = useState('');
  const [commentsByNote, setCommentsByNote] = useState({});
  const [commentsStatus, setCommentsStatus] = useState({});

  useEffect(() => {
    let mounted = true;
    notesApi.getEditionHome()
      .then(data => mounted && setHome(data))
      .catch(() => mounted && setError('No pudimos cargar la edición. Intentá de nuevo.'));
    return () => { mounted = false; };
  }, []);

  const loadComments = useCallback(async noteId => {
    if (commentsStatus[noteId] === 'loading' || commentsStatus[noteId] === 'ready') return;
    setCommentsStatus(current => ({ ...current, [noteId]: 'loading' }));
    try {
      const comments = await notesApi.getComments(noteId);
      setCommentsByNote(current => ({ ...current, [noteId]: comments }));
      setCommentsStatus(current => ({ ...current, [noteId]: 'ready' }));
    } catch {
      setCommentsStatus(current => ({ ...current, [noteId]: 'error' }));
    }
  }, [commentsStatus]);

  const addComment = useCallback(async (noteId, body) => {
    const comment = await notesApi.createComment(noteId, { body });
    setCommentsByNote(current => ({ ...current, [noteId]: [...(current[noteId] ?? []), comment] }));
  }, []);

  const upvoteComment = useCallback(async (noteId, commentId) => {
    const updated = await notesApi.upvoteComment(noteId, commentId);
    setCommentsByNote(current => ({ ...current, [noteId]: (current[noteId] ?? []).map(comment => comment.id === commentId ? updated : comment) }));
  }, []);

  return { home, error, commentsByNote, commentsStatus, loadComments, addComment, upvoteComment };
}
