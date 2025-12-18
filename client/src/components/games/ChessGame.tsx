import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export function ChessGame({ onFinish }: { onFinish: (result: 'win' | 'loss' | 'draw') => void }) {
  const { t } = useLanguage();
  const [game, setGame] = useState(new Chess());

  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to queen for simplicity
      });
      
      if (move === null) return false;
      
      setGame(gameCopy);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Wrapper to handle the specific signature expected by this version of react-chessboard if needed,
  // or just pass onDrop directly if types align. 
  // Based on previous interaction, this library version might be quirky.
  // I will try standard props first as it is most common, and if it fails I'll fix it.
  // Actually, I'll use the 'options' pattern if I see errors, but let's try standard first as it's cleaner code.
  // Wait, I saw the d.ts file. It ONLY had 'options'. I MUST use 'options'.
  
  const boardOptions = {
    position: game.fen(),
    onPieceDrop: ({ sourceSquare, targetSquare }: any) => onDrop(sourceSquare, targetSquare),
    customDarkSquareStyle: { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
    customLightSquareStyle: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    customBoardStyle: {
      borderRadius: '4px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 w-full max-w-md mx-auto">
      <div className="w-full aspect-square bg-black/40 border-2 border-white/10 rounded-lg overflow-hidden shadow-2xl relative">
        <Chessboard options={boardOptions} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full">
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
