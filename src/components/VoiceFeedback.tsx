import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceFeedbackProps {
  text: string;
}

const VoiceFeedback = ({ text }: VoiceFeedbackProps) => {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  return (
    <Button
      onClick={handleSpeak}
      variant="ghost"
      size="sm"
      className={`text-xs ${speaking ? "text-primary" : "text-muted-foreground"} hover:text-primary`}
    >
      {speaking ? <VolumeX className="w-3 h-3 mr-1" /> : <Volume2 className="w-3 h-3 mr-1" />}
      {speaking ? "Stop" : "Read Aloud"}
    </Button>
  );
};

export default VoiceFeedback;
