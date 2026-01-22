import { TerminalProvider } from '../context/TerminalContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TerminalProvider>
          {children}
        </TerminalProvider>
      </body>
    </html>
  );
}
