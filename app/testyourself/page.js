import Nav from '@/app/Nav';
import QuizClient from './QuizClient';
import './testyourself.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Could You Spot a Deepfake? | Working Voices',
  description: 'Test yourself against real and AI-generated video and voice, then find out why the instinct that just failed you is the same one scammers exploit.',
};

export default function TestYourselfPage() {
  return (
    <>
      <Nav />
      <QuizClient />
    </>
  );
}
