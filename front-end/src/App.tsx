import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

const socket: Socket = io('http://localhost:4000');

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [htmlPreview, setHtmlPreview] = useState<string>('');

  // Send markdown text to the server for conversion
  useEffect(() => {
    socket.emit('markdown', markdown);
  }, [markdown]);

  // Receive HTML content from the server
  useEffect(() => {
    socket.on('html', (htmlContent: string) => {
      setHtmlPreview(htmlContent);
    });

    return () => {
      socket.off('html');
    };
  }, []);

  return (
    <div className="app-container">
      <h1>Real-time Markdown Editor</h1>
      <h4>
        <a href='http://suresh-jangid.vercel.app' target='__blank'>
        Suresh jangid
        </a>
        </h4>
      <div className="editor-preview-container">
        <textarea
          className="markdown-editor"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type your markdown here..."
        />
        <div
          className="html-preview"
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        />
      </div>
    </div>
  );
};

export default App;
