import fs from 'fs';
import path from 'path';
import Nav from '@/app/Nav';
import QuizClient from './QuizClient';
import './testyourself.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'How Good Are You at Spotting a Deepfake? | Working Voices',
  description: 'Test yourself against real and AI-generated video and audio, then see how many people in your organisation might be vulnerable to the same attack.',
};

const ASSET_DIR = path.join(process.cwd(), 'public', 'testyourself');

function assetExists(filename) {
  return fs.existsSync(path.join(ASSET_DIR, filename));
}

export default function TestYourselfPage() {
  const hasAudio = assetExists('real-audio.mp3') && assetExists('fake-audio.mp3');

  return (
    <>
      <Nav />
      <QuizClient hasAudio={hasAudio} />
    </>
  );
}
