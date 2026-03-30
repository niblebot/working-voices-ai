import './globals.css';

export const metadata = {
  title: 'Managing AI-Generated Attacks | Working Voices',
  description: 'Psychological self-defence training to protect your organisation from deepfake fraud, AI impersonation, and social engineering attacks.',
  icons: {
    icon: 'https://www.workingvoices.com/app/uploads/2024/09/cropped-fav-32x32.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
