import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { invokeApig } from '@/libs/aws-lib';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await invokeApig({ path: '/notes' });
        setNotes(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Link href="/notes/-1">New note</Link>
      <br />
      <NotesList notes={notes} />
    </div>
  );
}

function NotesList({ notes }) {
  return (
    <>
      {notes.map((note, key) => {
        return (
          <p key={key}>
            {note.noteId}:{note.content}
          </p>
        );
      })}
    </>
  );
}
