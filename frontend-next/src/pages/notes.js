import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { invokeApig } from '@/libs/aws-lib';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const jsonData = await invokeApig({ path: '/notes' });
      setNotes(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  console.log('rendering...');

  return (
    <div>
      <Link href="/new-note">New note</Link>
      <br />
      {notes.map((note, key) => {
        return (
          <p key={key}>
            {note.noteId}:{note.content}
          </p>
        );
      })}
    </div>
  );
}
