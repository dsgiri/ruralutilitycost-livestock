import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../../data';

export function Footer() {
  return (
    <>
      <footer className="min-h-[80px] bg-slate-100 border-t border-slate-200 flex items-center mt-auto shrink-0 px-4 sm:px-6 py-6 font-sans">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center text-[12px] text-slate-500 gap-4">
          <div className="text-center sm:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} ruralutilitycost.com. Results are estimates for decision support only. Verify all outcomes independently.
          </div>
          
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-2">
            {FOOTER_LINKS.map(link => (
              <div key={link.name}>
                {link.href.startsWith('http') ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center hover:text-slate-900 transition-colors">
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.href} className="inline-flex min-h-[32px] items-center hover:text-slate-900 transition-colors">
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
