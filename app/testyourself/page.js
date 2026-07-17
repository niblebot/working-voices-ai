import Nav from '@/app/Nav';
import QuizClient from './QuizClient';
import './testyourself.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'How Good Are You at Spotting a Deepfake? | Working Voices',
  description: 'Test yourself against real and AI-generated video and audio, then see how many people in your organisation might be vulnerable to the same attack.',
};

export default function TestYourselfPage() {
  return (
    <>
      <Nav />
      <QuizClient />
    </>
  );
}
