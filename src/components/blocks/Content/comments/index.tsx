import { useEffect } from 'react';

interface P {}

const Comments = ({}: P) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'jiwony933/comments');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', 'github-light');
    script.crossOrigin = 'anonymous';
    script.async = true;

    document.getElementById('comments').appendChild(script);

    return () => {
      document.getElementById('comments').innerHTML = '';
    };
  }, []);

  return (
    <div
      id='comments'
      style={{ width: '100%', height: 'auto', marginTop: '100px' }}
    ></div>
  );
};

export default Comments;
