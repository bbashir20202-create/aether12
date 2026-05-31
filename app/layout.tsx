import './globals.css';

export const metadata = {
  title: 'Aether - Your AI Agent',
  description: 'Personal Cloud Agent with Memory',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#0a0a0a', color: 'white' }}>
        {children}
      </body>
    </html>
  );
}
