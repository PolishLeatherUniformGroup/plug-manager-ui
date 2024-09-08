
import { useContext, useState } from "react";

interface LanguageChooserProps {
    selected: LanguageCode,
    available: LanguageOption[]
}

type LanguageCode = "pl" | "en"
type LanguageOption = {
    code: LanguageCode,
    name: string;
}

export default function LanguageChooser(props:LanguageChooserProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("pl");

    const handleLanguageChange = ()=>{}

    
 };