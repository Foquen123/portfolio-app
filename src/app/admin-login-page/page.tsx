
import { login } from '@/actions/auth';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 animate-[fadeIn_0.6s_ease-out]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 pt-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Lock size={24} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Админ-панель</h1>
            <p className="text-sm text-white/30">Введите пароль для входа</p>
          </div>

          <form className="space-y-5" action={login}>
            <div className="space-y-2">
              <label className="text-xs text-white/40 ml-1 uppercase tracking-wider">
                Пароль
              </label>
              <div className="relative">
                <input
                  required
                  autoFocus
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-red-500/50 focus:bg-white/[0.07] outline-none transition-all duration-300 text-white placeholder:text-white/15"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              <span>Войти</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>
        </div>
        <p className="text-center mt-6 text-xs text-white/15">
          Доступ только для администратора
        </p>
      </div>
    </div>
  );
}
