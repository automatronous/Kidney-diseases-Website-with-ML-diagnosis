import Link from 'next/link';
import { ShieldCheck, Mail, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-24 pt-16 pb-8">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                KidneyHealth<span className="font-light text-white/60">.org</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Dedicated to providing clear, medically sound, and accessible information to help individuals understand and protect their kidney health.
            </p>
            <div className="flex items-center gap-2 text-sm text-accent">
              <Mail className="w-4 h-4" />
              <span>contact@kidneyhealth.org</span>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/#diseases" className="hover:text-accent transition-colors">Understanding Diseases</Link></li>
              <li><Link href="/#prevention" className="hover:text-accent transition-colors">Prevention Habits</Link></li>
              <li><Link href="/#symptoms" className="hover:text-accent transition-colors">Warning Signs</Link></li>
              <li><Link href="/assessment" className="hover:text-accent transition-colors">Risk Assessment</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h4 className="font-semibold text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-accent" />
                Medical Disclaimer
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                The information provided on this website is for educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider regarding medical conditions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} KidneyHealth Educational Resource. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
