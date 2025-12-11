import { useGame } from "@/context/GameContext";
import { GameType } from "@/lib/types";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import battleshipImage from '@assets/stock_images/battleship_navy_ship_31f24312.jpg';
import stockImage from '@assets/stock_images/classic_tetris_game__1bffc655.jpg'; // Keeping this as backup or unused if I replace it
import generatedTetrisImage from '@assets/generated_images/8-bit_pixel_art_tetris_game.png';
import generatedChessImage from '@assets/generated_images/8-bit_pixel_art_chess_game.png';
import generatedCheckersImage from '@assets/generated_images/8-bit_pixel_art_checkers_game.png';
import generatedBattleshipImage from '@assets/generated_images/8-bit_pixel_art_battleship_game.png';
import { useLanguage } from "@/context/LanguageContext";

const GAMES: { id: GameType; name: string; image: string; players: string }[] = [
  { 
    id: 'Chess', 
    name: 'Chess', 
    image: generatedChessImage,
    players: '1.2k'
  },
  { 
    id: 'Tetris', 
    name: 'TETRIS', 
    image: generatedTetrisImage,
    players: '850'
  },
  { 
    id: 'Checkers', 
    name: 'Checkers Pro', 
    image: generatedCheckersImage,
    players: '430'
  },
  { 
    id: 'Battleship', 
    name: 'Battleship', 
    image: generatedBattleshipImage,
    players: '342'
  }
];

export default function Games() {
  const { actions } = useGame();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const handleSelectGame = (gameId: GameType) => {
    actions.selectGame(gameId as any); // Cast for safety if types slightly mismatch
    setLocation('/lobby');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-glow">{t('Select Game', 'Select Game')}</h1>
      
      <div className="grid gap-4">
        {GAMES.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="group relative overflow-hidden cursor-pointer border-white/10 hover:border-primary/50 transition-colors"
              onClick={() => handleSelectGame(game.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${game.image})` }}
              />
              
              <CardContent className="relative z-20 p-6 h-32 flex flex-col justify-center">
                <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-white group-hover:text-primary transition-colors">
                  {t(game.name, game.name)}
                </h2>
                <p className="text-sm text-muted-foreground font-mono mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {game.players} {t('playing', 'playing')}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
