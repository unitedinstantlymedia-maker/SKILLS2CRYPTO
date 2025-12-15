import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Swords, User, Coins } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Challenge() {
  const [match, params] = useRoute("/challenge/:challengeId");
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [challengerName, setChallengerName] = useState("Unknown Player");

  useEffect(() => {
    if (match && params.challengeId) {
      // Format: name-randomString
      // We want to extract the name part.
      // The name might contain hyphens, so we need to be careful.
      // The random string was generated with Math.random().toString(36).substring(7) which is alphanumeric.
      // Let's assume the last part after the last hyphen is the ID, and everything before is the name.
      
      const parts = params.challengeId.split('-');
      if (parts.length > 1) {
        // Remove the last part (random ID)
        parts.pop();
        // Join the rest back together
        const name = parts.join(' ');
        // Capitalize first letter of each word
        const formattedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setChallengerName(formattedName);
      } else {
        setChallengerName(params.challengeId);
      }
    }
  }, [match, params]);

  const handleAccept = () => {
    // In a real app, this would verify the challenge and join the session.
    // For mockup, we redirect to lobby or game.
    // Let's redirect to Lobby for now so they can "pay" or "connect".
    setLocation('/lobby');
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex items-center gap-4 w-full max-w-md">
        <Link href="/">
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold uppercase tracking-wider">{t('Challenge', 'Challenge')}</h1>
        </div>
      </div>

      <Card className="w-full max-w-md bg-card/50 border-white/10 p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
            <Swords className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">{t('Incoming Challenge', 'Incoming Challenge')}</p>
            <h2 className="text-3xl font-display font-bold text-white text-glow">{challengerName}</h2>
            <p className="text-lg text-muted-foreground">{t('wants to play', 'wants to play')}</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5">
           <div className="flex justify-between items-center bg-black/20 p-4 rounded-lg">
              <span className="text-muted-foreground flex items-center gap-2">
                <Coins className="h-4 w-4" /> {t('Wager', 'Wager')}
              </span>
              <span className="font-mono font-bold text-xl">???</span>
           </div>
           
           <div className="flex justify-between items-center bg-black/20 p-4 rounded-lg">
              <span className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" /> {t('Opponent', 'Opponent')}
              </span>
              <span className="font-mono font-bold text-lg truncate max-w-[150px]">{challengerName}</span>
           </div>
        </div>

        <Button 
          onClick={handleAccept}
          className="w-full h-16 text-xl font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 border-glow shadow-[0_0_30px_rgba(38,161,123,0.3)] hover:shadow-[0_0_50px_rgba(38,161,123,0.5)] transition-all"
        >
          {t('Accept Challenge', 'Accept Challenge')}
        </Button>
      </Card>
    </div>
  );
}
