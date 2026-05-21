// app/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden flex items-center justify-center">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Спиннер */}
        <div className="relative w-20 h-20">
          {/* Внешнее кольцо */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
          {/* Анимированная дуга */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin"></div>
          {/* Внутренняя точка */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
        </div>

        {/* Текст */}
        <div className="text-center">
          <p className="text-white/60 text-sm animate-pulse-slow">
            Загрузка проектов
          </p>
          <div className="flex gap-1 mt-3 justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}