import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Chess3DBoard } from "./Chess3DBoard";

export function ChessGame({ onFinish }: { onFinish: (result: 'win' | 'loss') => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="w-full aspect-square max-w-md relative">
        <Chess3DBoard />
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Button onClick={() => onFinish('win')} className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-widest">
          {t('Claim Win (Dev)', 'Claim Win (Dev)')}
        </Button>
        <Button onClick={() => onFinish('loss')} variant="destructive" className="font-display uppercase tracking-widest">
          {t('Resign (Dev)', 'Resign (Dev)')}
        </Button>
      </div>
    </div>
  );
}
