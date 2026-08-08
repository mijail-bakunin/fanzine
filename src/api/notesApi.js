import { hasRemoteApi, request } from './http';
import { mockComments, mockEdition, mockNotes } from '../data/mockEdition';

const clone = value => JSON.parse(JSON.stringify(value));
let localComments = clone(mockComments);

export const notesApi = {
  async getEditionHome() {
    if (hasRemoteApi) return request('/editions/n-012-la-libertad/home');
    return { edition: clone(mockEdition), notes: clone(mockNotes) };
  },
  async getComments(noteId) {
    if (hasRemoteApi) return request(`/notes/${noteId}/comments`);
    return clone(localComments[noteId] ?? []);
  },
  async createComment(noteId, { body, author = 'Lectora anónima' }) {
    if (hasRemoteApi) return request(`/notes/${noteId}/comments`, { method: 'POST', body: JSON.stringify({ body, author }) });
    const comment = { id: `${noteId}-${Date.now()}`, author, body, votes: 0 };
    localComments[noteId] = [...(localComments[noteId] ?? []), comment];
    return clone(comment);
  },
  async upvoteComment(noteId, commentId) {
    if (hasRemoteApi) return request(`/notes/${noteId}/comments/${commentId}/upvote`, { method: 'POST' });
    localComments[noteId] = (localComments[noteId] ?? []).map(comment => comment.id === commentId ? { ...comment, votes: comment.votes + 1 } : comment);
    return clone(localComments[noteId].find(comment => comment.id === commentId));
  },
};
