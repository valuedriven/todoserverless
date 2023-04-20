import React, { useState } from 'react';
import { useRouter } from 'next/router';
import config from '@/config';
import { invokeApig, s3Upload } from '@/libs/aws-lib';

export default function NewNote() {
  const [note, setNote] = useState({ content: '', file: '' });
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newNote = {
      content: event.target.content.value,
      attachment: event.target.attachment,
    };
    setNote({
      content: newNote.content,
      attachment: newNote.content.attachment,
    });

    if (
      newNote.attachment &&
      newNote.attachment.size > config.MAX_ATTACHMENT_SIZE
    ) {
      alert('Please pick a file smaller than 5MB');
      return;
    }

    try {
      const uploadedFilename = newNote.attachment.value
        ? (await s3Upload(newNote.attachment.files[0])).Location
        : null;

      await createNote({
        content: newNote.content,
        attachment: uploadedFilename,
      });
      router.push('/notes');
    } catch (e) {
      console.log(`error: ${e}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Note content</label>
        <input type="textarea" id="content" name="content" required />
        <br />
        <label htmlFor="attachment">File</label>
        <input type="file" id="attachment" name="attachment" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function createNote(note) {
  return invokeApig({
    path: '/notes',
    method: 'POST',
    body: note,
  });
}
