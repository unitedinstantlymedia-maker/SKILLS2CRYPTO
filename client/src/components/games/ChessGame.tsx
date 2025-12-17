import { useLanguage } from "@/context/LanguageContext";
import { Chess3DBoard } from "./Chess3DBoard";

export function ChessGame({ onFinish }: { onFinish: (result: 'win' | 'loss') => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-full h-full relative">
        <Chess3DBoard />
      </div>
    </div>
  );
}
